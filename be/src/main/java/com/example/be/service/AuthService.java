package com.example.be.service;

import com.example.be.dto.AuthResponse;
import com.example.be.dto.LoginRequest;
import com.example.be.dto.RegisterRequest;
import com.example.be.entity.User;
import com.example.be.enums.Status;
import com.example.be.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }
    //    Xử lý logic đăng kí
    public AuthResponse register(RegisterRequest request){
        if (userRepository.existsByUsername(request.getUsername()) ||userRepository.existsByEmail(request.getEmail())){
            return new AuthResponse("Username or email error", null);
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setAvatar(request.getAvatar());
        user.setStatus(Status.ACTIVE);
//        user.setRole(RoleName.USER); // mac dinh role la USER
        userRepository.save(user);
        String token = jwtService.generateToken(user);
        return new AuthResponse("Đăng ký thành công", token);
    }
    // login
    public AuthResponse login(LoginRequest request){
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());

        if (userOpt.isEmpty() || passwordEncoder.matches(request.getPassword(), userOpt.get().getPassword())){
            return new AuthResponse("Sai tên đăng nhập hoặc mật khẩu", null);
        }
        String token = jwtService.generateToken(userOpt.get());
        return new AuthResponse("Đăng nhập thành công", token);
    }

}