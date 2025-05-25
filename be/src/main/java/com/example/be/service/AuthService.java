package com.example.be.service;

import com.example.be.dto.request.*;
import com.example.be.dto.response.LoginResponse;
import com.example.be.entity.User;
import com.example.be.entity.UserRoles;
import com.example.be.enums.RoleName;
import com.example.be.enums.Status;
import com.example.be.repository.UserRepository;
import com.example.be.repository.UserRoleRepository;
import com.example.be.security.oauth2.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;
    private final CustomOAuth2UserService oauthService;

    /**
     * Đăng kí tài khoản và gửi OTP xác minh qua email
     * @param request thông tin đăng ký
     * @return thông báo yêu cầu xác thực
     */

    @Transactional
    public String register(RegisterRequest request){
        if (userRepository.existsByUsername(request.getUsername()))
            throw new RuntimeException("Username đã tồn tại");
        if(userRepository.existsByEmail(request.getEmail()))
            throw new RuntimeException("Email đã tồn tại");

        // tạo mã otp ngẫu nhiên
        String otp =generateOTP();

        // tạo và thiết lập đối tượng người dùng mới
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
//        user.setAddress(request.getAddress());
        user.setStatus(Status.INACTIVE); // chưa hoạt động cho đến khi xác minh OTP
        user.setOtpCode(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));

        UserRoles defaultRole = userRoleRepository.findByRoleName(RoleName.USER).orElseThrow(() -> new RuntimeException("Role_User not found"));
        user.setRoles(Collections.singleton(defaultRole));
        userRepository.save(user);

        emailService.sendOtpEmail(request.getEmail(), otp);
        return "Đăng ký thành công. Vui lòng kiểm tra email để xác thực OTP";
    }

    /**
     * Xác minh mã OTP được gửi đến email người dùng
     * @param request bao gồm email và mã OTP
     * @return kết quả xác minh
     */
    public String verifyOtp(OtpVerificationRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(()->new RuntimeException("Email không tồn tại"));

        if (user.getIsVerified()) return "Tài khoản đã được xác thực.";
        if (user.getOtpCode() == null || user.getOtpExpiry() == null || LocalDateTime.now().isAfter(user.getOtpExpiry())){
            return "Mã OTP đax hết hạn.";
        }

        if (!user.getOtpCode().equals(request.getOtpCode())){
            return "Mã OTP không chính xác";
        }

        user.setIsVerified(true);
        user.setStatus(Status.ACTIVE);
        user.setOtpCode(null);
        user.setOtpExpiry(null);
        userRepository.save(user);
        return "Xác thực thành công";
    }

    /**
     * Gửi lại mã OTP mới nếu người dùng chưa xác thực
     * @param email địa chỉ email cần gửi lại
     * @return thông báo gửi OTP
     */
    public String resendOtp(String email){
        User user = userRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("Email không tồn tại"));

        if (user.getIsVerified()) return "Tài khoản đã xác thực.";

        String newOtp =generateOTP();
        user.setOtpCode(newOtp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));
        userRepository.save(user);

        emailService.sendOtpEmail(email, newOtp);
        return "OTP mới được gửi.";
    }

    /**
     * Tạo mã OTP gồm 6 chữ số ngẫu nhiên
     * @return chuỗi 6 số
     */
    private String generateOTP() {
        int otp = (int) (Math.random() * 900000) + 100000;
        return String.valueOf(otp);
    }

    /**
     * Đăng nhập tài khoản bằng username và passwword.
     * Kiểm tra OTP và trạng thái tài khoản.
     * Trả về JWT token nếu thành công.
     *
     * @param request thông tin đăng nhập
     * @return LoginResponse bao gồm token, username, role
     */
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Sai mật khẩu");
        }

        if (!user.getIsVerified()) {
            throw  new RuntimeException("Tài khoản chưa xác minh OTP");
        }

        if(user.getStatus() == Status.BANNED) {
            throw  new RuntimeException("Tài khoản đã bị khóa");
        }

        // Lấy role (giả sử chỉ có 2 role
        String role = user.getRoles().stream().findFirst()
                .map(r -> r.getRoleName().name())
                .orElse("USER");
        // Tạo JWT token
        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(token, user.getUsername(), role);
    }

    /**
     * Cập nhật thông tin cá nhân của người dùng
     *
     * @param userId người dùng
     * @param request thông tin cập nhật
     * @return thông báo kết quả
     */
    public String updateProfile(Integer userId, UpdateProfileRequest request){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));
        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setUpdateAt(LocalDateTime.now());

        userRepository.save(user);
        return "Cập nhật thông tin thành công";
    }

    /**
     * Đổi mật khẩu của người dùng sau khi xác minh mật khẩu cũ.
     *
     * @param userId người dùng
     * @param request bao gồm mật khẩu cũ và mới.
     * @return thông báo đổi mật khẩu
     */
    public String changePassword(Integer userId, ChangePasswordRequest request){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        if(!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())){
            throw new RuntimeException("Mật khẩu cũ không chính xác");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        return "Đổi mật khẩu thành công";
    }

    /**
     * Gửi mã OTP để đặt lại mật khẩu
     *
     * @param email địa chỉ email của người dùng
     * @return thông báo kêt quả gửi OTP
     */
    public String forgotPassword(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Email không tồn tại"));
        String otp = generateOTP();
        user.setOtpCode(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));
        userRepository.save(user);
        emailService.sendOtpEmail(email,otp);
        return "Mã OTP đã được gửi tới email";
    }

    /**
     * Xác minh mã OTp và đổi mật khẩu mới.
     *
     * @param request chứa email, mã OTP và mật khẩu mới
     * @return thông báo thành công hoặc lỗi
     */
    public String resetPasswordWithOtp(ResetPasswordRequest request){
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("Email không tồn tại"));
        if (user.getOtpCode() == null || user.getOtpExpiry() == null || LocalDateTime.now().isAfter(user.getOtpExpiry())){
            return "Mã OTP đã hết hạn";
        }
        if (!user.getOtpCode().equals(request.getOtpCode())) {
            return "Mã OTP không chính xác";
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setOtpCode(null);
        user.setOtpExpiry(null);
        userRepository.save(user);
        return "Đổi mật khẩu thành công";
    }

//    public String logout(String token){
//        LocalDateTime expery =jwtService.extractExpiration(token);
//        Black
//    }
}

