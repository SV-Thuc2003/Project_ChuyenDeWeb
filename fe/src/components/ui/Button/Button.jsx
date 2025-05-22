// components/ui/Button.jsx
import React from 'react';
import './Button.scss';

const Button = ({ type = "button", children, onClick, variant = "primary" }) => {
    return (
        <button
            type={type}
            className={`btn-custom ${variant}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
