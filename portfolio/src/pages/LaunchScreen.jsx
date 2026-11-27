import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../styles/general.css';
import './../styles/root.css';
import './../styles/animations.css';
import Device from './../launch/Device';
import ScreenPopup from './../launch/ScreenPopup';
import Keyboard, { keyCount } from './../launch/Keyboard';
import Sticker from './../launch/Sticker';
import Preloader from './../preloader/Preloader';
import { useAssetLoader } from './../preloader/useAssetLoader';
import Sidebar from './../components/layout/Sidebar';
import { playSound } from './../utils/sounds';
import { TIMING, useLayout } from './../launch/scale';
import smiley from './../assets/sticker-smiley.svg';
import headphones from './../assets/sticker-headphones.svg';
import star from './../assets/sticker-star.svg';
import arrow from './../assets/arrow.svg';
import envelope from './../assets/envelope.svg';
import './launch.css';

// Starting spots, in Figma px (same as the design), per layout.
const STICKERS = {
  desktop: [
    { id: 'smiley', label: 'Smiley', src: smiley, x: 1003, y: 51, width: 92, height: 97, peel: 150, peeled: true },
    { id: 'headphones', label: 'Headphones', src: headphones, x: 151, y: 441, width: 121, height: 121, peel: 170 },
    { id: 'star', label: 'Star', src: star, x: 1020, y: 455, width: 110, height: 119, peel: 182 },
  ],
  phone: [
    { id: 'smiley', label: 'Smiley', src: smiley, x: 304.7, y: 94.1, width: 60.3, height: 63.5, peel: 99, peeled: true },
    { id: 'headphones', label: 'Headphones', src: headphones, x: 12, y: 300, width: 69, height: 69, peel: 97 },
  ],
};
// tablet = flip phone without the keypad, stickers a bit bigger
STICKERS.tablet = [
  { id: 'smiley', label: 'Smiley', src: smiley, x: 476, y: 100, width: 78, height: 82, peel: 129, peeled: true },
  { id: 'headphones', label: 'Headphones', src: headphones, x: 22, y: 370, width: 90, height: 90, peel: 126 },
];

// Everything the launch screen shows, so the preloader can load it first.
const IMAGES = [smiley, headphones, star, arrow, envelope];

// Phases: 'loading' (preloader) → 'morph' (its window shrinks into the screen)
// → 'launch' (device, popup, keyboard and stickers animate in around it).
export default function LaunchScreen() {
  const layout = useLayout();
  const navigate = useNavigate();
  const loader = useAssetLoader({ images: IMAGES });
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    if (loader.done) setPhase((p) => (p === 'loading' ? 'morph' : p));
  }, [loader.done]);

  useEffect(() => {
    if (phase !== 'morph') return;
    playSound('swoosh');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setPhase('launch'), reduced ? 0 : TIMING.morph);
    return () => clearTimeout(t);
  }, [phase]);

  const goHome = () => navigate('/home');

  // Stickers pop in once the last key has risen (tablet has no keys:
  // they come in right after the screen).
  const hasKeys = layout !== 'tablet';
  const stickersAt = hasKeys ? TIMING.keys + keyCount(layout) * TIMING.keyStagger + 200 : TIMING.keyboard;

  return (
    <div className="launch">
      <div
        className="launch__stage"
        style={{
          '--t-device': `${TIMING.device}ms`,
          '--t-keyboard': `${TIMING.keyboard}ms`,
          '--t-keys': `${TIMING.keys}ms`,
          '--t-key-stagger': `${TIMING.keyStagger}ms`,
        }}
      >
        <div className="launch__scene" data-scene key={layout}>
          {phase !== 'launch' && <Preloader layout={layout} loader={loader} morphing={phase === 'morph'} />}

          {phase === 'launch' && (
            <>
              <Device layout={layout}>
                <ScreenPopup layout={layout} />
              </Device>
              {hasKeys && <Keyboard layout={layout} onLogin={goHome} />}
              {STICKERS[layout].map((s, i) => (
                <Sticker key={s.id} {...s} layout={layout} delay={stickersAt + i * TIMING.stickerStagger} />
              ))}
            </>
          )}
        </div>
      </div>

      {phase === 'launch' && <Sidebar delay={TIMING.sidebar} />}
    </div>
  );
}
