package com.tech.demo.controllers;

import com.techdesk.other.User;
import com.techdesk.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/all-users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/delete-user/{egn}")
    public ResponseEntity<String> deleteUser(@PathVariable String egn) {
        adminService.deleteUser(egn);
        return ResponseEntity.ok("User deleted successfully");
    }
}

