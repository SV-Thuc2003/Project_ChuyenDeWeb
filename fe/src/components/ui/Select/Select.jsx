// src/components/Select.jsx
import React from "react";
import "./Select.scss";

const Select = React.memo(({ label, options, value, onChange, placeholder }) => {
    return (
        <div className="custom-select">
            {label && <label className="select-label">{label}</label>}
            <select
                className="select-dropdown"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {placeholder && (
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                )}
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default Select;
