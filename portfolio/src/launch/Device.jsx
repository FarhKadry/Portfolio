import { u } from './scale';

// The monitor shell (desktop) or the top half of the flip phone (phone, tablet).
// Whatever you pass as children sits on top of it, positioned in the device's
// own coordinates (0,0 = device's top-left corner).
export default function Device({ layout = 'desktop', children }) {
  if (layout === 'tablet') {
    return (
      <div className="device device--phone" style={{ left: u(30), top: u(30), width: u(540), height: u(790) }}>
        <span className="device__dot" style={{ left: u(36), top: u(722), width: u(32), height: u(32) }} />
        <span className="device__dot" style={{ left: u(472), top: u(722), width: u(32), height: u(32) }} />
        {children}
      </div>
    );
  }

  if (layout === 'phone') {
    return (
      <div className="device device--phone" style={{ left: u(18), top: u(25), width: u(356), height: u(622) }}>
        <span className="device__dot" style={{ left: u(24), top: u(568), width: u(26), height: u(26) }} />
        <span className="device__dot" style={{ left: u(311), top: u(568), width: u(26), height: u(26) }} />
        {children}
      </div>
    );
  }

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