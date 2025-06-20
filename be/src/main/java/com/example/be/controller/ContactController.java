package com.example.be.controller;

import com.example.be.dto.request.ContactRequest;
import com.example.be.entity.Contact;
import com.example.be.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    // POST - gửi liên hệ
    @PostMapping
    public ResponseEntity<Void> saveContact(@RequestBody ContactRequest request) {
        contactService.saveContact(request);
        return ResponseEntity.ok().build();
    }

    // GET - lấy toàn bộ liên hệ
    @GetMapping
    public ResponseEntity<List<Contact>> getAllContacts() {
        return ResponseEntity.ok(contactService.getAllContacts());
    }

    // DELETE - xoá liên hệ theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Integer id) {
        contactService.deleteContactById(id);
        return ResponseEntity.noContent().build();
    }
}
