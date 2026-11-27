import { useRef } from 'react';
import CharacterHover from './CharacterHover';
import './avatar.css';

// Profile picture: the character inside the pink circle, like Figma's
// "character expression 12". Hovering anywhere on the circle plays the motion.
// size: any CSS width (number = px), e.g. 140 or "calc(114 * var(--u))".
export default function Avatar({ size = 140, className = '', label = "Farh Kadry's avatar" }) {
  const circle = useRef(null);
  return (
    <div
      ref={circle}
      className={`avatar ${className}`}
      style={{ '--avatar-size': typeof size === 'number' ? `${size}px` : size }}
    >
      <CharacterHover size="81.84%" className="avatar__character" triggerRef={circle} label={label} />
    </div>
  );
}
