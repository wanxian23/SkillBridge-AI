package com.skillbridge.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "USER")
public class User {

    @Id
    @Column(name = "UserID", length = 10, nullable = false)
    private String userId;

    @Column(name = "FullName", length = 100, nullable = false)
    private String fullName;

    @Column(name = "Email", length = 100, nullable = false, unique = true)
    private String email;

    @Column(name = "Phone", length = 11, nullable = false)
    private String phone;

    @Column(name = "Role", columnDefinition = "char(1)", nullable = false)
    private String role;

    @Column(name = "Account_Status", length = 30, nullable = false)
    private String accountStatus;

    @Column(name = "Password", length = 255, nullable = false)
    private String password;

    @Column(name = "Created_At", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "LoginToken", length = 255)
    private String loginToken;

    public User() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getAccountStatus() {
        return accountStatus;
    }

    public void setAccountStatus(String accountStatus) {
        this.accountStatus = accountStatus;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getLoginToken() {
        return loginToken;
    }

    public void setLoginToken(String loginToken) {
        this.loginToken = loginToken;
    }

}
