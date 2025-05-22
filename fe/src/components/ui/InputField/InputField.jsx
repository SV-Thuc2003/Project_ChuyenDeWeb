// InputField.jsx
import React from 'react';
import './InputField.scss'; // nếu có style riêng

const InputField = ({ label, type = 'text', name, value, onChange, required = true }) => {
    return (
        <div className="p-floatlabel">
            <input
                type={type}
                name={name}
                className="input-large"
                value={value}
                onChange={onChange}
                placeholder=" "
                required={required}
            />
            <label>{label}</label>
        </div>
    );
};

export default InputField;
