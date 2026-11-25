// import Cursive from '../comonents/layout/cursive';
import  '../comonents/common/cursive.css';
import  '../comonents/common/headings.css';
import './../styles/general.css';
import './../pages/launch.css';
import back from './../assets/arrow.svg';
import { u } from './scale';
import Button from '../comonents/common/button';
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
        <h1 className="mainFont text_shadow2 text_extrabold text_tilt" >
          <span className="cursive font_pink2">F</span>arh <span style={{ zIndex: -1, letterSpacing: '-8%' }} className="cursive font_pink2">K</span>adry<span className="cursive font_pink2">!</span>
        </h1> 
        <Button container="btn_size1Cont" cta="Login" link="/login" style1="btn1 btn_size1" icon={back}/>
         </div>
    </div>
  );
}