import { Routes, Route } from "react-router-dom";
import {ROUTERS} from "./utils/router";
import Homepage from "./pages/users/homepage";
import MasterLayout from "./pages/users/theme/mastertLayout";
import ProfilePage from "./pages/users/profilePage";


const renderUserRouter =() =>{
    const userRouters =[
        {
            path: ROUTERS.USER.HOME,
            component: <Homepage/>,
        },
        {
            path: ROUTERS.USER.PROFILE,
            component: <ProfilePage/>
        },
    ];
    return(
        <MasterLayout>
            <Routes>
                {
                    userRouters.map((item, key) =>(
                        <Route key={key} path={item.path} element ={item.component}/>
                    ))}
            </Routes>
        </MasterLayout>
    );
};
const RouterCustom = () =>{
    return renderUserRouter();
};
export default RouterCustom;