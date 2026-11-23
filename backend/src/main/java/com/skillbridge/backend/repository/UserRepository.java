package com.skillbridge.backend.repository;

import com.skillbridge.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

    boolean existsByEmail(String email);

}