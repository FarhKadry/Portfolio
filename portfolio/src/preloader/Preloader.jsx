import { useEffect, useRef } from 'react';
import RetroWindow from '../components/common/RetroWindow';
import Avatar from '../components/common/Avatar';
import WelcomeText from './WelcomeText';
import './preloader.css';

// The loading window. It sits in the launch scene (same design units, see
// launch/scale.js), so when loading is done it can shrink straight into the
// monitor's screen: `morphing` switches it to the screen's size and position.
export default function Preloader({ layout = 'desktop', loader, morphing = false }) {
  const bar = useRef(null);

  // Progress bar: real loading progress, but never ahead of the Welcome animation,
  // so it always reaches 100% right as the animation finishes.
  useEffect(() => {
    let raf;
    const tick = (now) => {
      const el = bar.current;
      const start = loader.startedAt.current;
      if (el) {
        const timeShare = start ? (now - start) / loader.minDuration : 0;
        const p = morphing ? 1 : Math.min(loader.fraction.current, timeShare, 1);
        el.style.setProperty('--p', p.toFixed(4));
        el.setAttribute('aria-valuenow', Math.round(p * 100));
      }
      if (!morphing) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loader, morphing]);

  return (
    <RetroWindow className="preloader" data-layout={layout} data-morph={morphing}>
      <div className="preloader__content">
        <div className="preloader__hero">
          <WelcomeText className="preloader__welcome" playing={loader.fontsReady} />
          <Avatar className="preloader__avatar" size="calc(var(--cs) * 140.73 * var(--u))" />
        </div>
        <div
          ref={bar}
          className="preloader__bar"
          role="progressbar"
          aria-label="Loading"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
        >
          <span className="preloader__fill" />
        </div>
      </div>
    </RetroWindow>
  );
}
