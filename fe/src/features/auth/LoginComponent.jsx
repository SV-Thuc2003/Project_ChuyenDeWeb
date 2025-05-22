// Login.jsx

import React, { memo, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { ROUTERS } from "../../utils/router";
import { login } from '../../services/authService';
import InputField from '../../components/ui/InputField/InputField';
import Button from '../../components/ui/Button/Button';

const LoginComponent = ({ role }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = formData;

        if (username.length >= 3 && password.length >= 8 && password.length <= 30) {
            try {
                const data = await login({ username, password });
                const { token, username: loggedInUsername, role } = data;
                localStorage.setItem('token', token);
                localStorage.setItem('username', loggedInUsername);
                localStorage.setItem('role', role);
                navigate(role === 'admin' ? '/admin/dashboard' : '/users/home');
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("Tên đăng nhập hoặc mật khẩu không hợp lệ");
        }
    };

    return (
        <div className="login">
            <form className="login__form" onSubmit={handleSubmit}>
                <h2>Đăng nhập</h2>

                <InputField
                    label="Tên đăng nhập"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder=" "
                    required
                />

                <InputField
                    label="Mật khẩu"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder=" "
                    required
                />

                <div className="login__options">
                    <label className="login__remember">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                        />
                        <span>Nhớ tôi</span>
                    </label>
                    <Link to="/forgot-password" className="login__forgot">Quên mật khẩu?</Link>
                </div>

                <div className="login__actions">
                    <Button type="submit">Đăng nhập</Button>
                </div>

                <p className="login__social-text">Hoặc đăng nhập với</p>
                <div className="login__social">
                    <a
                        href="http://localhost:8080/oauth2/authorization/google"
                        className="login__social-btn google"
                    >
                        G
                    </a>
                    <a
                        href="http://localhost:8080/oauth2/authorization/facebook"
                        className="login__social-btn facebook"
                    >
                        f
                    </a>
                </div>

                {role !== 'admin' && (
                    <p className="login__register-text">
                        Bạn chưa có tài khoản?{" "}
                        <Link to={ROUTERS.USER.REGISTER} className="login__register-link">
                            Đăng ký mới
                        </Link>
                    </p>
                )}
            </form>
        </div>
    );
};

export default memo(LoginComponent);
