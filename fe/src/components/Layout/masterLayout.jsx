
import { memo } from "react"

import Header from "./header/Header";
import Footer from "./footer/footer";
// import {ROUTERS} from "../../../utils/router";
// import useRouteCheck from "../../../hooks/useRouteCheck";
const MasterLayout = ({children, ...props}) => {

    // const hideHeaderOnRoutes = [ROUTERS.USER.LOGIN, ROUTERS.USER.REGISTER];
    // const shouldShowHeader = useRouteCheck(hideHeaderOnRoutes);

    return(
        <div {...props}>
            <Header/>
            {children}
            <Footer/>
        </div>
    );

};
export default memo(MasterLayout);