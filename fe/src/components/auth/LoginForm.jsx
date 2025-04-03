import { useState } from "react"; 
const LoginForm = ({onSubmit}) => {
    const [email, setEmail] =useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault();
        onSubmit({email, password});
    };
    return(
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow-lg rounded-lg bg-white">
            <h2 className=" text-2xl font-bold text-center mb-4">Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-w border rounded mb-2"
                required
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
        </form>
    );

};
export default LoginForm;