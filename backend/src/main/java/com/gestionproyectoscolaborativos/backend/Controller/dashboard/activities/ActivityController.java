package com.gestionproyectoscolaborativos.backend.Controller.dashboard.activities;

import com.gestionproyectoscolaborativos.backend.repository.ActivityRepository;
import com.gestionproyectoscolaborativos.backend.services.ActivityServices;
import com.gestionproyectoscolaborativos.backend.services.dto.request.ActivityProjectsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/dashboardadmin")
@RestController
public class ActivityController {
    @Autowired
    private ActivityServices activityServices;

    @PostMapping("/addactivities")
    private ResponseEntity<?> addActivity (@RequestBody  ActivityProjectsDto activityProjectsDto) {
        return activityServices.addActivitys(activityProjectsDto);
    }
}
