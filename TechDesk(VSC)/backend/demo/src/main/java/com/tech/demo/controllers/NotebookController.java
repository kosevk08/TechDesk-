package com.tech.demo.controllers;

import com.techdesk.other.Notebook;
import com.techdesk.services.NotebookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notebook")
@CrossOrigin("http://localhost:3000")
public class NotebookController {

    @Autowired
    private NotebookService notebookService;

    @GetMapping("/all")
    public ResponseEntity<List<Notebook>> getAllNotebooks() {
        List<Notebook> notebooks = notebookService.getAllNotebooks();
        return ResponseEntity.ok(notebooks);
    }

    @GetMapping("/{egn}")
    public ResponseEntity<Notebook> getNotebook(@PathVariable String egn) {
        Notebook notebook = notebookService.getNotebookByStudentEgn(egn);
        return ResponseEntity.ok(notebook);
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveNotebook(@RequestBody Notebook notebook) {
        notebookService.saveOrUpdateNotebook(notebook);
        return ResponseEntity.ok("Notebook saved successfully");
    }

    @DeleteMapping("/delete/{egn}")
    public ResponseEntity<String> deleteNotebook(@PathVariable String egn) {
        notebookService.deleteNotebookByEgn(egn);
        return ResponseEntity.ok("Notebook deleted successfully");
    }
}