// All launch-screen sounds. To swap in your own, replace the mp3 files in
// ./sounds/ with the same names (or change the imports below).
//
// Browsers keep audio muted until the visitor clicks, taps or presses a key
// somewhere on the page. Until then playSound() does nothing (no errors).
import clickUrl from './../assets/sounds/key-click.mp3';
import keyRowUrl from './../assets/sounds/key-row.mp3';
import swooshUrl from './../assets/sounds/swoosh.mp3';

const FILES = {
  click: clickUrl,   // key hover / press
  keyRow: keyRowUrl, // each row of keys appearing
  swoosh: swooshUrl, // screen appearing
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
  if (!c || loading) return loading;
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
}

// vary: small random pitch change so repeated clicks don't sound robotic
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
