package com.example.be.repository;

import com.example.be.entity.UserRoles;
import com.example.be.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRoleRepository extends JpaRepository<UserRoles, Integer> {
    Optional<UserRoles> findByRoleName(RoleName roleName);
}

