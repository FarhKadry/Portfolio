import { useEffect, useRef, useState } from 'react';
import './sidebar.css';

// Socials side menu. The links will come from Supabase later, as an array of
// { id, label, url, icon }. Until then it shows empty placeholder slots.
//
// - Scrolling down tucks it away so only a sliver + the tab show; scrolling up brings it back.
// - The tab toggles it by hand at any time.
// - Phones start tucked so it never covers content.
const PLACEHOLDER = [
  { id: 'slot-1', label: 'Social link 1' },
  { id: 'slot-2', label: 'Social link 2' },
  { id: 'slot-3', label: 'Social link 3' },
  { id: 'slot-4', label: 'Social link 4' },
];
const PHONE = '(max-width: 600px)';

export default function Sidebar({ items = PLACEHOLDER, delay = 0 }) {
  const [open, setOpen] = useState(() => !window.matchMedia(PHONE).matches);
  const lastY = useRef(window.scrollY);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      if (Math.abs(dy) < 8) return; // ignore tiny jitters
      if (dy > 0 && y > 120) setOpen(false); // scrolling down
      else if (dy < 0 && !window.matchMedia(PHONE).matches) setOpen(true); // scrolling up
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <aside className="sidebar" data-open={open} style={{ '--delay': `${delay}ms` }} aria-label="Social links">
      <div className="sidebar__panel">
        <ul className="sidebar__list">
          {items.map((item) => {
            const content = item.icon ? (
              <img className="sidebar__icon" src={item.icon} alt="" />
            ) : (
              <span className="sidebar__slot" aria-hidden="true" />
            );
            return (
              <li key={item.id}>
                {item.url ? (
                  <a
                    className="sidebar__link"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    tabIndex={open ? 0 : -1}
                  >
                    {content}
                  </a>
                ) : (
                  <span className="sidebar__link">{content}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <button
        type="button"
        className="sidebar__toggle"
        aria-expanded={open}
        aria-label={open ? 'Hide social links' : 'Show social links'}
        onClick={() => setOpen((o) => !o)}
      >
        <svg viewBox="0 0 12 20" aria-hidden="true">
          <path d="M9 3 3 10l6 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </aside>
  );
}
