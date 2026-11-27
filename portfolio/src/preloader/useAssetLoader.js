import { useEffect, useRef, useState } from 'react';
import { preloadSounds } from '../utils/sounds';

// Loads what the launch screen needs (fonts, images, sounds) and reports progress.
//  fraction  – ref, 0..1 share of assets loaded (read it in an animation frame)
//  startedAt – ref, when the Welcome animation started (fonts ready)
//  fontsReady – true once the fonts are in, so text never flashes a fallback font
//  done      – everything loaded AND at least minDuration passed since fontsReady
const TIMEOUT = 8000; // a slow or broken asset never blocks the site

const withTimeout = (p) => Promise.race([p, new Promise((r) => setTimeout(r, TIMEOUT))]).catch(() => {});
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const loadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = img.onerror = resolve;
    img.src = src;
  });

const loadFonts = () =>
  document.fonts
    ? Promise.all([
        document.fonts.load('400 100px "Pacifico"'),
        document.fonts.load('400 50px "Bricolage Grotesque"'),
        document.fonts.load('700 50px "Bricolage Grotesque"'),
      ]).then(() => document.fonts.ready)
    : Promise.resolve();

export function useAssetLoader({ images = [], minDuration = 3300 } = {}) {
  const fraction = useRef(0);
  const startedAt = useRef(null);
  const [fontsReady, setFontsReady] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fonts = withTimeout(loadFonts());
    const tasks = [fonts, withTimeout(preloadSounds()), ...images.map((src) => withTimeout(loadImage(src)))];

    let finished = 0;
    tasks.forEach((t) =>
      t.then(() => {
        finished += 1;
        fraction.current = finished / tasks.length;
      })
    );

    // fonts are needed for the Welcome text; don't wait more than 1.5s for them
    Promise.race([fonts, wait(1500)]).then(() => {
      if (cancelled) return;
      startedAt.current = performance.now();
      setFontsReady(true);
      Promise.all([Promise.all(tasks), wait(minDuration)]).then(() => !cancelled && setDone(true));
    });

    return () => {
      cancelled = true;
    };
    // load once per visit
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { fraction, startedAt, fontsReady, done, minDuration };
}
