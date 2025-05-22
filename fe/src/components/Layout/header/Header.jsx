import { memo, useState } from "react";
import HeaderMenu from "./HeaderMain";
import HeaderSearch from "./HeaderSearch";
import HeaderCart from "./HeaderCart";
import HeaderBanner from "./HeaderBanner";
import HeaderTop from "./HeaderTop";
import {ROUTERS} from "../../../utils/router";
import useRouteCheck from "../../../hooks/useRouteCheck";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    // , ROUTERS.USER.VERITY
    const hideHeaderOnRoutes = [ROUTERS.USER.LOGIN, ROUTERS.USER.REGISTER, ROUTERS.USER.VERITY];
    const shouldShowHeader = useRouteCheck(hideHeaderOnRoutes);

    return (
        <header className="w-full">
            <div className="flex justify-between items-center px-4 md:px-10 py-4 border-b shadow-sm">
                <HeaderTop/>
                {/*<div className="text-xl md:text-2xl font-bold text-[#1a1a1a]">*/}
                {/*    <span className="text-[#0093E9]">LỌC</span> XANH<span className="text-red-500">+</span>*/}
                {/*</div>*/}

                {/* Desktop Menu */}
                <div className="hidden lg:flex">
                    <HeaderMenu />
                </div>

                {/* Mobile Menu Button */}
                {/*<button*/}
                {/*    className="lg:hidden text-2xl"*/}
                {/*    onClick={() => setMenuOpen(!menuOpen)}*/}
                {/*>*/}
                {/*    ☰*/}
                {/*</button>*/}

                <div className="hidden md:flex">
                    {!shouldShowHeader && <HeaderSearch />}
                </div>

                <div>
                    {!shouldShowHeader && <HeaderBanner/>}
                </div>
            </div>

            {/*/!* Mobile menu dropdown *!/*/}
            {/*{menuOpen && (*/}
            {/*    <div className="lg:hidden px-4 pb-4">*/}
            {/*        <HeaderMenu />*/}
            {/*        <div className="mt-2">*/}
            {/*            <HeaderSearch />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}

            {/*<HeaderBanner />*/}
        </header>
    );
};

export default memo(Header);
