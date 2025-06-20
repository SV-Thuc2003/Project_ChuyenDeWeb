package com.example.be.dto.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class ContactRequest {
    private String name;
    private String email;
    private String title;
    private String message;
}
