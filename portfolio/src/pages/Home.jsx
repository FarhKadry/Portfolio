import './../styles/general.css';
import './../styles/root.css';
import './../styles/animations.css';
import '../components/common/headings.css';
import Sidebar from './../components/layout/Sidebar';
import './home.css';

// Placeholder until we build the real Home page. It's tall on purpose so you
// can try the sidebar tucking away on scroll.
export default function Home() {
  return (
    <main className="home">
      <Sidebar />
      <h1 className="home__title mainFont text_shadowEm text_tilt">
        <span className="font_pacifico font_pink2">H</span>ome<span className="font_pacifico font_pink2">!</span>
      </h1>
      <p className="home__note font_bricolage font_lightBlack text_medium">Coming soon. Scroll to see the side menu tuck away.</p>
    </main>
  );
}
