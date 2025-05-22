// import { useLocation, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import { verifyOtp, resendOtp } from '../../services/authService';
// import './otpVerification.scss';
// import {ROUTERS} from "../../utils/router";
//
// const OtpVerification = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const email = location.state?.email;
//
//     const [otpCode, setOtpCode] = useState('');
//     const [resendMessage, setResendMessage] = useState('');
//
//     const handleVerify = async (e) => {
//         e.preventDefault();
//         try {
//             const message = await verifyOtp({ email, otpCode });
//             alert(message);
//             navigate('/users/dang-nhap');
//         } catch (err) {
//             alert(err.response?.data?.message || "Xác thực thất bại");
//         }
//     };
//
//     const handleResend = async () => {
//         try {
//             const message = await resendOtp(email);
//             setResendMessage(message);
//         } catch (err) {
//             setResendMessage(err.response?.data?.message || "Không thể gửi lại mã");
//         }
//     };
//
//     return (
//         <div className="otp-verification">
//             <form onSubmit={handleVerify}>
//                 <h2>Xác thực OTP</h2>
//                 <p>Vui lòng nhập mã OTP đã gửi tới email <strong>{email}</strong></p>
//
//                 <input
//                     type="text"
//                     value={otpCode}
//                     onChange={(e) => setOtpCode(e.target.value)}
//                     placeholder="Nhập mã OTP"
//                     required
//                 />
//
//                 <button type="submit" className="btn-custom">Xác thực</button>
//
//                 <div className="resend-otp">
//                     <p>Không nhận được mã?</p>
//                     <button type="button" className="btn-link" onClick={handleResend}>
//                         Gửi lại mã OTP
//                     </button>
//                     {resendMessage && <p className="resend-message">{resendMessage}</p>}
//                 </div>
//             </form>
//         </div>
//     );
// };
//
// export default OtpVerification;
