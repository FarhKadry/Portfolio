// Everything is laid out in the Figma frame's own coordinates (1280 × 936)
// and scaled to the screen with one CSS variable: --u = 1 design pixel.
// So `u(71)` means "71px in Figma", at whatever size the screen is.
export const SCENE_W = 1280;
export const SCENE_H = 936;

export const u = (n) => `calc(${n} * var(--u))`;

// Animation timeline (ms)
export const TIMING = {
  device: 0,        // device + keyboard body slide in (600ms)
  popup: 550,       // screen popup pops in (450ms)
  keys: 1000,       // first key starts rising
  keyStagger: 40,   // gap between keys
  stickers: 2700,   // first sticker pops in
  stickerStagger: 120,
};
