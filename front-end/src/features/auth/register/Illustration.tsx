import React from "react";
import  logologin from "../../../assets/logologin.jpg";


const Illustration: React.FC = () => {
    return (
        <div className="w-full max-w-[800px] flex items-center justify-center">
            <img
                src={logologin}
                alt="Pet illustration"
                className="w-full h-auto  object-contain"
            />
        </div>
    );
};

export default Illustration;
