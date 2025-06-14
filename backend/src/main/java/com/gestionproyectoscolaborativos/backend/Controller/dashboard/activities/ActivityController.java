package com.gestionproyectoscolaborativos.backend.Controller.dashboard.activities;

import com.gestionproyectoscolaborativos.backend.repository.ActivityRepository;
import com.gestionproyectoscolaborativos.backend.services.ActivityServices;
import com.gestionproyectoscolaborativos.backend.services.dto.request.ActivityProjectsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/dashboardadmin")
@RestController
public class ActivityController {
    @Autowired
    private ActivityServices activityServices;

    @PostMapping("/addactivities")
    private ResponseEntity<?> addActivity (@RequestBody  ActivityProjectsDto activityProjectsDto) {
        return activityServices.addActivitys(activityProjectsDto);
    }
    @GetMapping("/activtiesbyid/{id}")
    private ResponseEntity<?> activitybyid(@PathVariable Long id) {
        return activityServices.searchActivitybyId(id);
    }
    @GetMapping("/activitiesproject")
    private ResponseEntity<?> pro(){
        return activityServices.projectList();
    }
    @GetMapping("/activities/main/{projectId}")
    private  ResponseEntity<?> activitiesbyidproject (@PathVariable Integer projectId){
        return activityServices.activityFatherByProjectId(projectId);
    }
}
