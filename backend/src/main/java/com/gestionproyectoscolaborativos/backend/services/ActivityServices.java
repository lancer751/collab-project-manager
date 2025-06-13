package com.gestionproyectoscolaborativos.backend.services;

import com.gestionproyectoscolaborativos.backend.entitys.Activity;
import com.gestionproyectoscolaborativos.backend.entitys.Project;
import com.gestionproyectoscolaborativos.backend.entitys.State;
import com.gestionproyectoscolaborativos.backend.entitys.Users;
import com.gestionproyectoscolaborativos.backend.repository.ActivityRepository;
import com.gestionproyectoscolaborativos.backend.repository.ProjectRepository;
import com.gestionproyectoscolaborativos.backend.repository.StateRepository;
import com.gestionproyectoscolaborativos.backend.repository.UserRepository;
import com.gestionproyectoscolaborativos.backend.services.dto.request.ActivityProjectsDto;
import com.gestionproyectoscolaborativos.backend.services.dto.response.ActivtysProjects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ActivityServices {
    @Autowired
    private ActivityRepository activityRepository;
    @Autowired
    private StateRepository stateRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private UserRepository userRepository;
    public ResponseEntity<?> addActivitys (ActivityProjectsDto dto) {
        try {
            System.out.println("Estado enviado: " + dto.getState().getName());
            // Buscar proyecto
            Project project = projectRepository.findById(dto.getIdProject())
                    .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));

            // Buscar estado
            State state = stateRepository.findByName(dto.getState().getName())
                    .orElseThrow(() -> new RuntimeException("Estado no encontrado"));

            // Crear nueva actividad
            Activity activity = new Activity();
            activity.setName(dto.getName());
            activity.setDescription(dto.getDescription());
            activity.setDateStart(dto.getDateStart());
            activity.setDateDeliver(dto.getDateDeliver());
            activity.setPrioridad(dto.getPriority());
            activity.setProject(project);
            activity.setState(state);


            // Relacionar con actividad padre si se envía
            if (dto.getActivityFatherId() != null) {
                Activity parent = activityRepository.findById( (long) dto.getActivityFatherId())
                        .orElseThrow(() -> new RuntimeException("Actividad padre no encontrada"));
                activity.setActivityFather(parent);
            }

            // Relacionar con usuarios
            if (dto.getUsersList() != null && !dto.getUsersList().isEmpty()) {
                List<Users> users = userRepository.findAllById(dto.getUsersList());
                activity.setUsers(users);
            }

            activityRepository.save(activity);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Actividad creada correctamente");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
