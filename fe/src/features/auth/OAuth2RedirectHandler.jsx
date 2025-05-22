import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const username = urlParams.get('username'); // Nếu backend trả về
        const role = urlParams.get('role');

        if (token) {
            localStorage.setItem('token', token);
            if (username) localStorage.setItem('username', username);
            if (role) localStorage.setItem('role', role);

            navigate(role === 'admin' ? '/admin/dashboard' : '/users/home');
        } else {
            alert('Đăng nhập thất bại. Không tìm thấy token.');
            navigate('/login');
        }
    }, [navigate]);

    return <p>Đang xử lý đăng nhập...</p>;
};

export default OAuth2RedirectHandler;
