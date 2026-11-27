import React from 'react';
import { Link } from 'react-router-dom';
import { playSound } from '../../utils/sounds';
import './button.css';

// The whole button is the link, so any click on it navigates and screen
// readers see one control. Everything is sized in em, so the button scales
// with whatever font-size its size class gives it (see button.css).
const Button = ({ container, style1 = 'btn1 btn_size1', cta, link, icon, onClick }) => {
    return (
        <div className={container}>
            <Link
                to={link}
                className={style1}
                onClick={(e) => {
                    playSound('button');
                    onClick?.(e);
                }}
            >
                <span className="btn1__label">{cta}</span>
                {icon && <img className="btn1__icon" src={icon} alt="" />}
            </Link>
        </div>
    );
};

export default Button;
