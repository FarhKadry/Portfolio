import { u } from './scale';

// Placeholder for the popup with the profile picture and button: a plain div.
// Put its contents in as children when that component exists.
const BOX = {
  desktop: { left: 86, top: 47, width: 880, height: 451 },
  tablet: { left: 40, top: 80, width: 460, height: 610 },
  phone: { left: 28, top: 77, width: 300, height: 467 },
};

export default function ScreenPopup({ layout = 'desktop', children }) {
  const b = BOX[layout];
  return (
    <div
      className="screen-popup"
      style={{ left: u(b.left), top: u(b.top), width: u(b.width), height: u(b.height) }}
    >
      {children}
    </div>
  );
}