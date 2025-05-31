package com.gestionproyectoscolaborativos.backend.Controller.dashboard.projects;

import com.gestionproyectoscolaborativos.backend.services.FilterProjectServices;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboardadmin")
public class FilterProjectController {
    @Autowired
    private FilterProjectServices filterProjectServices;

    @GetMapping("/filterstate")
    public ResponseEntity<?> readAllState () {
        return filterProjectServices.readAllState();
    }

    @GetMapping("/directedby")
    public  ResponseEntity<?> searchLiderProject() {
        return filterProjectServices.searchLiderProject();
    }
}
