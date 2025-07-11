package com.example.be.controller;

import com.example.be.dto.response.CustomerResponse;
import com.example.be.dto.response.CustomerUpdateRequest;
import com.example.be.entity.User;
import com.example.be.enums.Status;
import com.example.be.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
//@PreAuthorize("hasAuthority('ADMIN')")
@RestController
@RequestMapping("/api/admin/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    // Lấy tất cả khách hàng
    @GetMapping
    public ResponseEntity<List<CustomerResponse>> getAllCustomers() {
        List<User> customers = customerService.getAllCustomers();

        List<CustomerResponse> responses = customers.stream()
                .map(user -> new CustomerResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getPhone(),
                        user.getAddress(),
                        user.getStatus()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

    // Lấy khách hàng theo id
    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponse> getCustomerById(@PathVariable Integer id) {
        User user = customerService.getCustomerById(id);

        CustomerResponse response = new CustomerResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getAddress(),
                user.getStatus()
        );

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateCustomerInfo(@PathVariable Integer id, @RequestBody CustomerUpdateRequest request) {
        customerService.updateCustomerInfo(id, request.getName(), request.getEmail(), request.getPhone(), request.getAddress());
        return ResponseEntity.noContent().build();
    }


    // Cập nhật trạng thái khách hàng
    @PutMapping("/{id}/status")
    public ResponseEntity<Void> updateCustomerStatus(@PathVariable Integer id, @RequestParam Status status) {
        customerService.updateCustomerStatus(id, status);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Integer id) {
        customerService.deleteCustomer(id); // hoặc softDeleteCustomer(id)
        return ResponseEntity.noContent().build();
    }
}
