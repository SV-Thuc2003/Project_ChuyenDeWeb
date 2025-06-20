import React from "react";
import { useTranslation } from 'react-i18next';

type HeaderProps = {
    title?: string;
    showBackButton?: boolean;
    onBackClick?: () => void;
    className?: string;
};

const Header: React.FC<HeaderProps> = ({
                                           title,
                                           showBackButton = false,
                                           onBackClick,
                                           className = "",
                                       }) => {
    const { t } = useTranslation();

    return (
        <header className={`flex items-center py-4 ${className}`}>
            {showBackButton && (
                <button
                    onClick={onBackClick}
                    className="mr-4 text-black hover:text-gray-700"
                >
                    {t("common.back")}
                </button>
            )}
            {title && <h1 className="text-xl font-medium text-black">{title}</h1>}
        </header>
    );
};


export default Header;