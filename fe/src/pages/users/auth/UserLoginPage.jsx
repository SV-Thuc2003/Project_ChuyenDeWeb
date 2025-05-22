import {memo} from "react";
import LoginComponent from "../../../features/auth/LoginComponent";
const UserLoginPage = () => {
    return <LoginComponent role="user" />;
};
export default memo(UserLoginPage);