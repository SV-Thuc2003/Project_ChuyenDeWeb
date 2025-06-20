package com.example.be.service;
import com.example.be.entity.User;
import com.example.be.enums.RoleName;
import com.example.be.enums.Status;
import com.example.be.enums.exception.ErrorCode;
import com.example.be.exception.AppException;
import com.example.be.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;

    public List<User> getAllAdmins() {
        return userRepository.findByRoleName(RoleName.ADMIN);
    }

    public User getAdminById(Integer id) {
        return userRepository.findById(id)
                .filter(user -> user.getRoles().stream()
                        .anyMatch(r -> r.getRoleName() == RoleName.ADMIN))
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }

    public void updateAdminStatus(Integer id, Status status) {
        User user = getAdminById(id);
        user.setStatus(status);
        userRepository.save(user);
    }

    public void updateAdminInfo(Integer id, String name, String email, String phone, String address) {
        User user = getAdminById(id);
        user.setName(name);
        user.setEmail(email);
        user.setPhone(phone);
        user.setAddress(address);
        userRepository.save(user);
    }

    public void deleteAdmin(Integer id) {
        User user = getAdminById(id);
        if (user.getRoles().stream().noneMatch(r -> r.getRoleName() == RoleName.ADMIN)) {
            throw new AppException(ErrorCode.UNAUTHORIZED_ACTION);
        }
        userRepository.delete(user);
    }

    public void softDeleteAdmin(Integer id) {
        User user = getAdminById(id);
        user.setStatus(Status.INACTIVE);
        userRepository.save(user);
    }
}

