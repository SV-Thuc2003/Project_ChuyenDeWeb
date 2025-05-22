import {memo} from "react";
import RegisterComponent from "../../../features/auth/RegisterComponent";
const UserRegisterPage = () => {
    return <RegisterComponent role="user" />;
};
export default memo(UserRegisterPage);