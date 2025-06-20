package com.example.be.controller;

import com.example.be.dto.response.CustomerResponse;
import com.example.be.dto.response.CustomerUpdateRequest;
import com.example.be.entity.User;
import com.example.be.enums.Status;
import com.example.be.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

//@PreAuthorize("hasAuthority('ADMIN')")
@RestController
@RequestMapping("/api/admin/employees")
@RequiredArgsConstructor
//@CrossOrigin("http://localhost:3000")
public class AdminController {

    private final AdminService adminService;

    @GetMapping
    public ResponseEntity<List<CustomerResponse>> getAllAdmins() {
        List<User> admins = adminService.getAllAdmins();

        List<CustomerResponse> responses = admins.stream()
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

    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponse> getAdminById(@PathVariable Integer id) {
        User user = adminService.getAdminById(id);

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
    public ResponseEntity<Void> updateAdminInfo(@PathVariable Integer id, @RequestBody CustomerUpdateRequest request) {
        adminService.updateAdminInfo(id, request.getName(), request.getEmail(), request.getPhone(), request.getAddress());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Void> updateAdminStatus(@PathVariable Integer id, @RequestParam Status status) {
        adminService.updateAdminStatus(id, status);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Integer id) {
        adminService.deleteAdmin(id); // hoặc soft delete nếu bạn muốn
        return ResponseEntity.noContent().build();
    }
}
