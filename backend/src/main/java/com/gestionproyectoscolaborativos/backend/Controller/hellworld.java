package com.gestionproyectoscolaborativos.backend.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class hellworld {
    @GetMapping("/")
    public String hello () {
        return "hello, staring the project";
    }
}
