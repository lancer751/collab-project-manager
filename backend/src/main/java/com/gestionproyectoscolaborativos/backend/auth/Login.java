package com.gestionproyectoscolaborativos.backend.auth;

import com.gestionproyectoscolaborativos.backend.services.UserServices;
import com.gestionproyectoscolaborativos.backend.services.dto.request.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/dashboard")
public class Login {

    @GetMapping("/validation")
    private ResponseEntity<?> validation () {
        try {
            HashMap<String, String> json = new HashMap<>();
            json.put("message", "correct access");
            return ResponseEntity.ok().body(json);
        }catch (Exception e) {
            HashMap<String, String> json = new HashMap<>();
            json.put("message", "no estas autenticado");
            return ResponseEntity.badRequest().body(json);
        }
    }
}
