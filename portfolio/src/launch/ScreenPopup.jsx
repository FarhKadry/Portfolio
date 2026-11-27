import RetroWindow from '../components/common/RetroWindow';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/button';
import MessageWindow from './MessageWindow';
import arrow from './../assets/arrow.svg';
import { u, TIMING } from './scale';

// Screen box inside the device, in Figma px (device coordinates).
const BOX = {
  desktop: { left: 86, top: 47, width: 880, height: 451 },
  tablet: { left: 40, top: 80, width: 460, height: 610 },
  phone: { left: 28, top: 77, width: 300, height: 467 },
};

// "Farh Kadry!" — one span per letter so they can pop in one by one.
// Classes build each letter's look; sizes per layout are in launch.css.
const LOGO = [
  { ch: 'F', cls: 'font_pacifico font_pink2 logo__F' },
  { ch: 'a', cls: 'font_bricolage font_teal1 text_bold logo__arh' },
  { ch: 'r', cls: 'font_bricolage font_teal1 text_bold logo__arh' },
  { ch: 'h', cls: 'font_bricolage font_teal1 text_bold logo__arh' },
  { ch: ' ', cls: 'font_bricolage text_medium logo__space' },
  { ch: 'K', cls: 'font_pacifico font_pink2 logo__K' },
  { ch: 'a', cls: 'font_bricolage font_teal1 text_semiBold logo__adry' },
  { ch: 'd', cls: 'font_bricolage font_teal1 text_semiBold logo__adry' },
  { ch: 'r', cls: 'font_bricolage font_teal1 text_semiBold logo__adry' },
  { ch: 'y', cls: 'font_bricolage font_teal1 text_semiBold logo__adry' },
  { ch: '!', cls: 'font_pacifico font_pink2 logo__bang' },
];

export default function ScreenPopup({ layout = 'desktop' }) {
  const b = BOX[layout];
  const desktop = layout === 'desktop';

  return (
    <RetroWindow
      head={desktop}
      className="screen-popup"
      data-layout={layout}
      style={{
        left: u(b.left),
        top: u(b.top),
        width: u(b.width),
        height: u(b.height),
        '--t-avatar': `${TIMING.avatar}ms`,
        '--t-button': `${TIMING.button}ms`,
      }}
    >
      {desktop && <MessageWindow delay={TIMING.message} wordsDelay={TIMING.messageWords} />}

      <h1
        className="popup__logo text_strokeEm text_shadowEm"
        style={{ '--delay': `${TIMING.logo}ms` }}
        aria-label="Farh Kadry!"
      >
        {LOGO.map((l, i) => (
          <span key={i} className={`popLetter ${l.cls}`} style={{ '--i': i }} aria-hidden="true">
            {l.ch}
          </span>
        ))}
      </h1>

      <div className="popup__avatar">
        <Avatar className="springIn" size="calc(var(--avatar) * var(--u))" />
      </div>

      <Button
        container="popup__button"
        style1={`btn1 popup__btn ${desktop ? '' : 'btn_wide'}`}
        cta="Log in"
        link="/home"
        icon={arrow}
      />
    </RetroWindow>
  );
}
