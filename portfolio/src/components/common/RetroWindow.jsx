import './retroWindow.css';

// The retro browser window used across the site (preloader, launch screen,
// message popup). Sizes come from CSS variables on the window, so every use
// can set its own scale (see retroWindow.css). head={false} hides the title bar.
export default function RetroWindow({ className = '', head = true, children, ...rest }) {
  return (
    <div className={`window ${className}`} {...rest}>
      {head && (
        <div className="window__head" aria-hidden="true">
          <span className="window__dot window__dot--pink" />
          <span className="window__dot window__dot--green" />
          <span className="window__dot window__dot--yellow" />
        </div>
      )}
      <div className="window__body">{children}</div>
    </div>
  );
}
