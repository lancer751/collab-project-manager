package com.gestionproyectoscolaborativos.backend.auth;

import com.gestionproyectoscolaborativos.backend.services.UserServices;
import com.gestionproyectoscolaborativos.backend.services.dto.request.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
public class Login {

    @GetMapping("/validation")
    private ResponseEntity<?> validation () {
        return ResponseEntity.ok().body("correct access");
    }
}
