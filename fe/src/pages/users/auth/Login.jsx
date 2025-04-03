import LoginForm from "../../../components/auth/LoginForm";

const Login = () => {
    const handleLogin = (data) =>{
        console.log("User Login Data:", data);
        // goi API dang nhap
    };
    return(
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <LoginForm onSubmit={handleLogin()}/>
        </div>
    );
};
export default Login;