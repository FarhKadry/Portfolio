import { u } from './scale';

// The monitor shell. Whatever you pass as children sits on top of it,
// positioned in the device's own coordinates (0,0 = device's top-left corner).
export default function Device({ children }) {
  return (
    <div
      className="device"
      style={{ left: u(114), top: u(25), width: u(1060), height: u(604) }}
    >
      <span className="device__chin-line" style={{ top: u(525) }} />
      <span
        className="device__power"
        style={{ left: u(1003), top: u(544), width: u(36), height: u(36) }}
      />
      {children}
    </div>
  );
}
