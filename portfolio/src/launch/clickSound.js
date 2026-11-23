let ctx = null;
let noise = null;

function getContext() {
  if (ctx) return ctx;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  ctx = new AudioCtx();
  return ctx;
}

export function unlockAudio() {
  const c = getContext();
  if (c && c.state === 'suspended') c.resume();
}

function getNoise(c) {
  if (noise) return noise;
  const length = Math.floor(c.sampleRate * 0.035);
  noise = c.createBuffer(1, length, c.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 4);
  }
  return noise;
}

// strength: 0.6 for hover, 1 for a press
export function playClick(strength = 1) {
  if (!ctx || ctx.state !== 'running') return;
  const source = ctx.createBufferSource();
  source.buffer = getNoise(ctx);
  source.playbackRate.value = 0.9 + Math.random() * 0.2; // tiny variation per key

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 2200 + Math.random() * 600;
  filter.Q.value = 1.4;

  const gain = ctx.createGain();
  gain.gain.value = 0.5 * strength;

  source.connect(filter).connect(gain).connect(ctx.destination);
  source.start();
}
