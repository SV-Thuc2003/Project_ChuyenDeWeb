package com.example.be.entity;

import com.example.be.enums.Provider;
import com.example.be.enums.Status;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name ="users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true)
    private String phone;

    private String address;
//    private String avatar;
@Enumerated(EnumType.STRING)
private Provider provider = Provider.LOCAL; // NEW: local, google, facebook

    private String providerId; // NEW: ID từ Google hoặc Facebook

    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;

    private Boolean isVerified = false;

    private String otpCode;

    private LocalDateTime otpExpiry;

    private LocalDateTime createAt = LocalDateTime.now();
    private LocalDateTime updateAt = LocalDateTime.now();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_role_mapping",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<UserRoles> roles = new HashSet<>();
}
