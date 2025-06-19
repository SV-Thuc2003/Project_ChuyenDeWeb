package com.example.be.controller;

import com.example.be.dto.request.ContactRequest;
import com.example.be.entity.Contact;
import com.example.be.entity.User;
import com.example.be.repository.ContactRepository;
import com.example.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @PostMapping
    public ResponseEntity<?> saveContact(@RequestBody ContactRequest request) {
        Contact contact = Contact.builder()
                .name(request.getName())
                .email(request.getEmail())
                .title(request.getTitle())
                .message(request.getMessage())
                .build();

        contactRepository.save(contact);
        return ResponseEntity.ok().build();
    }
}
