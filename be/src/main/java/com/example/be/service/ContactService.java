package com.example.be.service;

import com.example.be.dto.request.ContactRequest;
import com.example.be.entity.Contact;
import com.example.be.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;

    public void saveContact(ContactRequest request) {
        Contact contact = Contact.builder()
                .name(request.getName())
                .email(request.getEmail())
                .title(request.getTitle())
                .message(request.getMessage())
                .build();
        contactRepository.save(contact);
    }

    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    public void deleteContactById(Integer id) {
        contactRepository.deleteById(id);
    }
}
