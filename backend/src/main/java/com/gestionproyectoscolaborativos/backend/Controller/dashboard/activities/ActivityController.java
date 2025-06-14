package com.gestionproyectoscolaborativos.backend.Controller.dashboard.activities;

import com.gestionproyectoscolaborativos.backend.repository.ActivityRepository;
import com.gestionproyectoscolaborativos.backend.services.ActivityServices;
import com.gestionproyectoscolaborativos.backend.services.dto.ActivityPacthDTO;
import com.gestionproyectoscolaborativos.backend.services.dto.request.ActivityProjectsDto;
import com.gestionproyectoscolaborativos.backend.services.dto.request.UserPatchDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    @GetMapping("/activitiesall")
    private ResponseEntity<?> activitiesAll (@RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "15") int size,
                                             @RequestParam(defaultValue = "name") String sortBy,
                                             @RequestParam(defaultValue = "asc") String sortDir) {
        Pageable pageable;
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        pageable = PageRequest.of(page, size, sort);
        return  activityServices.allActivities(pageable);
    }

    @PatchMapping("/activitieditlist")
    private ResponseEntity<?> activitieseditlist (@RequestBody ActivityPacthDTO activityPacthDTO) {
        return activityServices.editactivitylist(activityPacthDTO);
    }
    @PutMapping("/editactivityid/{id}")
    private ResponseEntity<?> editactivitybyid (@PathVariable long id, @RequestBody ActivityProjectsDto activityProjectsDto) {
        return  activityServices.editactivitybyid(id, activityProjectsDto);
    }
}
