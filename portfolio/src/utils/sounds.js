// Every sound on the site. To swap one, replace the mp3 in assets/sounds/
// with the same name (or change the imports below).
//
// Browsers keep audio muted until the visitor clicks, taps or presses a key
// somewhere on the page. Until then playSound() quietly does nothing.
import clickUrl from './../assets/sounds/key-click.mp3';
import keyRowUrl from './../assets/sounds/key-row.mp3';
import swooshUrl from './../assets/sounds/swoosh.mp3';
import buttonUrl from './../assets/sounds/click.mp3';
import characterUrl from './../assets/sounds/character-hover.mp3';

const FILES = {
  click: clickUrl,         // key hover / press
  keyRow: keyRowUrl,       // each row of keys appearing
  swoosh: swooshUrl,       // screen appearing
  button: buttonUrl,       // buttons
  character: characterUrl, // hovering the character
};

let ctx = null;
let loading = null;
const buffers = {};

function getContext() {
  if (ctx) return ctx;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  ctx = new AudioCtx();
  return ctx;
}

// Fetch + decode every file once, so playback has no delay.
export function preloadSounds() {
  const c = getContext();
  if (!c) return Promise.resolve();
  if (loading) return loading;
  loading = Promise.all(
    Object.entries(FILES).map(async ([name, url]) => {
      try {
        const res = await fetch(url);
        if (res.ok) buffers[name] = await c.decodeAudioData(await res.arrayBuffer());
      } catch {
        // missing or broken file: that sound just stays silent
      }
    })
  );
  return loading;
}

export function unlockAudio() {
  const c = getContext();
  if (c && c.state === 'suspended') c.resume();
  preloadSounds(); // pages other than the launch screen load their sounds here
}

// Unlock on the first interaction anywhere on the site, on every page.
if (typeof window !== 'undefined') {
  ['pointerdown', 'keydown', 'touchstart'].forEach((ev) =>
    window.addEventListener(ev, unlockAudio, { once: true, passive: true })
  );
}

// vary: small random pitch change so repeated sounds don't feel robotic
export function playSound(name, { volume = 1, vary = false } = {}) {
  if (!ctx || ctx.state !== 'running' || !buffers[name]) return;
  const source = ctx.createBufferSource();
  source.buffer = buffers[name];
  if (vary) source.playbackRate.value = 0.94 + Math.random() * 0.12;
  const gain = ctx.createGain();
  gain.gain.value = volume;
  source.connect(gain).connect(ctx.destination);
  source.start();
}
