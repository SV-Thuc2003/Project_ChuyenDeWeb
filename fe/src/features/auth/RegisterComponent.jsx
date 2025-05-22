// import { memo, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { register } from '../../services/authService';
// import InputField from '../../components/ui/InputField/InputField';
// import Button from '../../components/ui/Button/Button';
// import './register.scss';
// import { ROUTERS } from "../../utils/router";
//
// const RegisterComponent = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         name: '',
//         username: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     });
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         if (formData.password !== formData.confirmPassword) {
//             alert("Mật khẩu không khớp!");
//             return;
//         }
//
//         try {
//             const message = await register(formData);
//             alert(message);
//             navigate('/verify-otp', { state: { email: formData.email } });
//         } catch (error) {
//             alert(error.response?.data?.message || 'Đăng ký thất bại!');
//         }
//     };
//
//     return (
//
//         <div className="register">
//             <form className="register__form" onSubmit={handleSubmit}>
//                 <h2>Đăng ký tài khoản</h2>
//
//                 <InputField label="Họ tên" name="name" value={formData.name} onChange={handleChange} required />
//                 <InputField label="Tên người dùng" name="username" value={formData.username} onChange={handleChange} required />
//                 <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
//                 <InputField label="Mật khẩu" type="password" name="password" value={formData.password} onChange={handleChange} required />
//                 <InputField label="Nhập lại mật khẩu" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
//
//                 <div className="register__actions">
//                     <Button type="submit">Đăng ký</Button>
//                     <Link to={ROUTERS.USER.LOGIN}>
//                         <Button variant="secondary">Đăng nhập</Button>
//                     </Link>
//                 </div>
//             </form>
//         </div>
//     );
// };
//
// export default memo(RegisterComponent);
//
import { memo, useState } from 'react';
import InputField from '../../components/ui/InputField/InputField';
import Button from '../../components/ui/Button/Button';
import Stepper from '../../components/ui/Stepper/Stepper';
import { register, verifyOtp, resendOtp } from '../../services/authService';
import './register.scss';
import {Link} from "react-router-dom";
import {ROUTERS} from "../../utils/router";

const steps = ['Thông tin đăng ký', 'Xác thực OTP'];

const RegisterComponent = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [otpCode, setOtpCode] = useState('');
    const [resendMessage, setResendMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Mật khẩu không khớp!");
            return;
        }

        try {
            const message = await register(formData);
            alert(message);
            setStep(1);
        } catch (error) {
            alert(error.response?.data?.message || 'Đăng ký thất bại!');
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            const message = await verifyOtp({ email: formData.email, otpCode });
            alert(message);
            // Chuyển sang trang đăng nhập sau xác thực thành công
            window.location.href = '/users/dang-nhap';
        } catch (err) {
            alert(err.response?.data?.message || "Xác thực thất bại");
        }
    };

    const handleResend = async () => {
        try {
            const message = await resendOtp(formData.email);
            setResendMessage(message);
        } catch (err) {
            setResendMessage(err.response?.data?.message || "Không thể gửi lại mã");
        }
    };

    return (
        <div className="register">
            <Stepper steps={steps} currentStep={step} />

            {step === 0 && (
                <form className="register__form" onSubmit={handleRegister}>
                    <h2>Đăng ký tài khoản</h2>
                    <InputField label="Họ tên" name="name" value={formData.name} onChange={handleChange} required />
                    <InputField label="Tên người dùng" name="username" value={formData.username} onChange={handleChange} required />
                    <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                    <InputField label="Mật khẩu" type="password" name="password" value={formData.password} onChange={handleChange} required />
                    <InputField label="Nhập lại mật khẩu" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                    <div className="register__actions">
                        <Button type="submit">Đăng ký</Button>
                        <Link to={ROUTERS.USER.LOGIN}>
                            <Button variant="secondary">Đăng nhập</Button>
                        </Link>
                    </div>

                </form>
            )}

            {step === 1 && (
                <form className="register__form" onSubmit={handleVerify}>
                    <h2>Xác thực OTP</h2>
                    <p>
                        Vui lòng nhập mã OTP đã gửi tới email <strong>{formData.email}</strong>
                    </p>

                    <InputField
                        type="text"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="Nhập mã OTP"
                        required
                    />

                    <Button type="submit">Xác thực</Button>

                    <div className="resend-otp">
                        <p>Không nhận được mã?</p>
                        <Button type="button" variant="secondary" onClick={handleResend}>
                            Gửi lại mã OTP
                        </Button>
                        {resendMessage && <p className="resend-message">{resendMessage}</p>}
                    </div>
                </form>
            )}
        </div>
    );
};

export default memo(RegisterComponent);

