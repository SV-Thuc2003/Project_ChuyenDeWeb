import React from 'react';
import './Stepper.scss';

const Stepper = ({ steps, currentStep }) => {
    return (
        <div className="stepper">
            {steps.map((label, index) => (
                <div
                    key={index}
                    className={`step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                >
                    <div className="circle">{index + 1}</div>
                    <div className="label">{label}</div>
                </div>
            ))}
        </div>
    );
};

export default Stepper;
