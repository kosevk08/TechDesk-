package com.tech.demo.controllers;

import org.springframework.web.bind.annotation.*;
import java.io.FileOutputStream;
import java.util.Base64;

@RestController
@RequestMapping("/api/canvas")
public class CanvasController {

    @PostMapping("/upload")
    public String uploadCanvas(@RequestBody CanvasPayload payload) {
        try {
            String base64Image = payload.getImage().split(",")[1];
            byte[] bytes = Base64.getDecoder().decode(base64Image);

            try (FileOutputStream fos = new FileOutputStream("saved_drawing.png")) {
                fos.write(bytes);
            }

            return "OK";
        } catch (Exception e) {
            return "Error " + e.getMessage();
        }
    }
}

class CanvasPayload {
    private String image;
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
}