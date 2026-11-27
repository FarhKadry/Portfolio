import RetroWindow from '../components/common/RetroWindow';
import envelope from '../assets/envelope.svg';

// The small "Messages (1)" window on the monitor screen (desktop only).
// Decorative: it pops in, then its message rises in word by word.
// Each word is [text, classes]; "&" and "move" are in Pacifico.
const MESSAGE = [
  ['I', ''],
  ['design', ''],
  ['&', 'font_pacifico'],
  ['build', ''],
  ['digital', ''],
  ['products', ''],
  ['that', ''],
  ['move', 'font_pacifico'],
];

export default function MessageWindow({ delay = 0, wordsDelay = 0 }) {
  return (
    <RetroWindow className="message springIn" style={{ '--delay': `${delay}ms` }}>
      <div className="message__content">
        <div className="message__icon">
          <img src={envelope} alt="" />
          <span className="message__badge springIn" style={{ '--delay': `${wordsDelay + 250}ms` }} />
        </div>
        <p className="message__title font_bricolage font_lightBlack">
          <span className="text_extraBold">Messages</span> <span className="text_regular">(1)</span>
        </p>
        <p
          className="message__text font_bricolage font_lightBlack text_regular"
          style={{ '--delay': `${wordsDelay}ms`, '--stagger': '55ms' }}
          aria-label="I design & build digital products that move"
        >
          {MESSAGE.map(([word, cls], i) => (
            <span key={i} aria-hidden="true">
              <span className={`riseWord ${cls}`} style={{ '--i': i }}>
                {word}
              </span>{' '}
            </span>
          ))}
        </p>
      </div>
    </RetroWindow>
  );
}
