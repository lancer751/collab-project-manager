package com.gestionproyectoscolaborativos.backend.Controller.dashboardauth;

import com.gestionproyectoscolaborativos.backend.services.UserServices;
import com.gestionproyectoscolaborativos.backend.services.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
public class Login {
    @Autowired
    private UserServices userServices;
    @PostMapping("/registeruser")
    public ResponseEntity<?> register(@RequestBody UserDto userDto){

        return userServices.save(userDto);
    }
}
