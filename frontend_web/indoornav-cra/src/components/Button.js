import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];
const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
                           children,
                           type,
                           onClick,
                           buttonStyle,
                           buttonSize,
                           to, // Add a 'to' prop for Link navigation (if needed elsewhere)
                       }) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    if (to) {
        return (
            <Link to={to} className='btn-mobile'>
                <button
                    className={`btn ${checkButtonStyle} ${checkButtonSize}`}
                    onClick={onClick}
                    type={type}
                >
                    {children}
                </button>
            </Link>
        );
    } else {
        return (
            <button
                className={`btn ${checkButtonStyle} ${checkButtonSize}`}
                onClick={onClick}
                type={type}
            >
                {children}
            </button>
        );
    }
};