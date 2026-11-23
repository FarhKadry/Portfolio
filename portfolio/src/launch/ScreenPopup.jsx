import { u } from './scale';

// Placeholder for the popup with the profile picture and button.
// Put its contents in as children when that component exists.
export default function ScreenPopup({ children }) {
  return (
    <div
      className="screen-popup"
      style={{ left: u(86), top: u(47), width: u(880), height: u(451) }}
    >
      <div className="screen-popup__bar" style={{ height: u(43), paddingLeft: u(18) }}>
        <svg viewBox="0 0 74 18" style={{ width: u(74), height: u(18) }} aria-hidden="true">
          <circle cx="9" cy="9" r="9" fill="#F4538A" />
          <circle cx="37" cy="9" r="9" fill="#78EB7B" />
          <circle cx="65" cy="9" r="9" fill="#F5DD61" />
        </svg>
      </div>
      <div className="screen-popup__content">{children}</div>
    </div>
  );
}
