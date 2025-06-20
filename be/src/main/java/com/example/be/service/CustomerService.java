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

    public void updateCustomerInfo(Integer id, String name,String email, String phone, String address) {
        User user = getCustomerById(id);
        user.setName(name);
        user.setEmail(email);
        user.setPhone(phone);
        user.setAddress(address);
        userRepository.save(user);
    }


    // xóa thẳng trong DB
    public void deleteCustomer(Integer id) {
        User user = getCustomerById(id);
        // Check nếu không phải USER thì không cho xóa
        if (user.getRoles().stream().noneMatch(r -> r.getRoleName() == RoleName.USER)) {
            throw new AppException(ErrorCode.UNAUTHORIZED_ACTION); // Tự định nghĩa error này
        }
        userRepository.delete(user);
    }


    // xóa mềm
    public void softDeleteCustomer(Integer id) {
        User user = getCustomerById(id); // Đảm bảo tồn tại và là USER
        user.setStatus(Status.INACTIVE); // hoặc Status.BANNED
        userRepository.save(user);
    }

}
