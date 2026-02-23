package com.techdesk.controllers;

import com.techdesk.other.Notebook;
import com.techdesk.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
@CrossOrigin("http://localhost:3000")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/notebook/{egn}")
    public ResponseEntity<Notebook> getMyNotebook(@PathVariable String egn) {
        Notebook notebook = studentService.getNotebook(egn);

        if (notebook != null) {
            return ResponseEntity.ok(notebook);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/notebook/save")
    public ResponseEntity<String> saveMyNotebook(@RequestBody Notebook notebook) {
        studentService.saveNotebook(notebook);
        return ResponseEntity.ok("Notebook saved successfully");
    }
}