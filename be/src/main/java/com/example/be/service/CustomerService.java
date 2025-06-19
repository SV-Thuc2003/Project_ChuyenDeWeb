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
public class CustomerService {
    private final UserRepository userRepository;

    public List<User> getAllCustomers() {
        return userRepository.findByRoleName(RoleName.USER);
    }

    public User getCustomerById(Integer id) {
        return userRepository.findById(id)
                .filter(user -> user.getRoles().stream()
                        .anyMatch(r -> r.getRoleName().name().equals("USER")))
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }

    public void updateCustomerStatus(Integer id, Status status) {
        User user = getCustomerById(id);
        user.setStatus(status);
        userRepository.save(user);
    }
}
