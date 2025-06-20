package com.example.be.repository;

import com.example.be.entity.User;
import com.example.be.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);

//    admin
    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.roleName = :roleName")
    List<User> findByRoleName(@Param("roleName") RoleName roleName);

    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.roleName = 'ADMIN'")
    List<User> findAllAdmins();


    @Query("SELECT COUNT(u) FROM User u WHERE u.createAt BETWEEN :start AND :end")
    int countUsersRegisteredBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);


}

