import { useSyncExternalStore } from 'react';

// Everything is laid out in the Figma frame's own coordinates and scaled to the
// screen with one CSS variable: --u = 1 design pixel. So `u(71)` means "71px in
// Figma", at whatever size the screen is.
// Three frames: desktop (1280 × 936), phone (393 × 852, the flip phone) and
// tablet (600 × 860: the flip phone's top half, widened to tablet proportions).
export const SCENES = {
  desktop: { w: 1280, h: 936 },
  tablet: { w: 600, h: 860 },
  phone: { w: 393, h: 852 },
};

export const u = (n) => `calc(${n} * var(--u))`;

// Keep these in sync with the @media queries in launch.css.
const QUERIES = {
  phone: '(max-width: 600px)',
  tablet: '(min-width: 601px) and (max-width: 1024px)',
};
const subscribe = (cb) => {
  const lists = Object.values(QUERIES).map((q) => window.matchMedia(q));
  lists.forEach((mq) => mq.addEventListener('change', cb));
  return () => lists.forEach((mq) => mq.removeEventListener('change', cb));
};
const getLayout = () =>
  window.matchMedia(QUERIES.phone).matches
    ? 'phone'
    : window.matchMedia(QUERIES.tablet).matches
      ? 'tablet'
      : 'desktop';
export const useLayout = () => useSyncExternalStore(subscribe, getLayout);

// Animation timeline (ms).
// Preloader: plays first; when loading is done its window shrinks into the
// screen (morph). Everything below counts from the end of that morph.
export const TIMING = {
  morph: 700,          // preloader window → monitor screen
  device: 0,           // monitor / phone frame grows in around the screen (600ms)
  message: 150,        // message window springs in (desktop)
  messageWords: 450,   // its text, word by word
  logo: 250,           // "Farh Kadry!" letters, one by one
  avatar: 650,         // profile picture
  button: 850,         // Log in button
  sidebar: 300,        // socials side menu slides in
  keyboard: 900,       // keyboard slides in (500ms)
  keys: 1400,          // first key starts rising
  keyStagger: 40,      // gap between keys
  stickerStagger: 120, // stickers start right after the last key
};
