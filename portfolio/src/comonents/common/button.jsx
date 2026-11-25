import React from 'react';
import './button.css';
import { Link } from 'react-router-dom';

const Button = (props) => {
    return ( <>
    <div className={props.container}>
        <button className={props.style1}>
        <Link id='link1' to={props.link} />
        <h6>{props.cta}</h6>
        <img className='starhover' src={props.icon} alt="" />
    </button>
    </div>
    </> );
}

export default Button;