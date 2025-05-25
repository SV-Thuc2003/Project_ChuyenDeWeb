import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2RedirectHandler: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token: string | null = urlParams.get('token');
        const username: string | null = urlParams.get('username'); // Nếu backend trả về
        const role: string | null = urlParams.get('role');

         console.log("URL hiện tại:", window.location.href);
        console.log("Token:", token);
        console.log("Username:", username);
        console.log("Role:", role);

        if (token) {
            localStorage.setItem('token', token);
            if (username) localStorage.setItem('username', username);
            if (role) localStorage.setItem('role', role);

            if (role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/users/home');
            }
        } else {
            alert('Đăng nhập thất bại. Không tìm thấy token.');
            navigate('/login');
        }
    }, [navigate]);

    return <p>Đang xử lý đăng nhập...</p>;
};

export default OAuth2RedirectHandler;


/**
 * import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2RedirectHandler: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token: string | null = urlParams.get('token');
    const username: string | null = urlParams.get('username');
    const role: string | null = urlParams.get('role');

    console.log("URL hiện tại:", window.location.href);
    console.log("Token:", token);
    console.log("Username:", username);
    console.log("Role:", role);

    if (token) {
        localStorage.setItem('token', token);
        if (username) localStorage.setItem('username', username);
        if (role) localStorage.setItem('role', role);

        // 🐢 Đợi một chút trước khi điều hướng
        setTimeout(() => {
            if (role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/users/home');
            }
        }, 100); // 100ms là đủ
    } else {
        alert('Đăng nhập thất bại. Không tìm thấy token.');
        navigate('/login');
    }
}, [navigate]);


    return <p>Đang xử lý đăng nhập...</p>;
};

export default OAuth2RedirectHandler;

 */
