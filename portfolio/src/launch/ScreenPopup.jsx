// import Cursive from '../comonents/layout/cursive';
import  '../comonents/common/cursive.css';
import  '../comonents/common/headings.css';
import './../styles/general.css';
import './../pages/launch.css';
import { u } from './scale';
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
      <div className="popup__head"></div>
      {children}
      <div>
        <h1 className="mainFont" >
        <span className="cursive">F</span>arh
        </h1>  
         </div>
    </div>
  );
}