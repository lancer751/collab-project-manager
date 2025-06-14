package com.gestionproyectoscolaborativos.backend.services;

import com.gestionproyectoscolaborativos.backend.entitys.Activity;
import com.gestionproyectoscolaborativos.backend.entitys.Project;
import com.gestionproyectoscolaborativos.backend.entitys.State;
import com.gestionproyectoscolaborativos.backend.entitys.Users;
import com.gestionproyectoscolaborativos.backend.entitys.tablesintermedate.UserProject;
import com.gestionproyectoscolaborativos.backend.repository.ActivityRepository;
import com.gestionproyectoscolaborativos.backend.repository.ProjectRepository;
import com.gestionproyectoscolaborativos.backend.repository.StateRepository;
import com.gestionproyectoscolaborativos.backend.repository.UserRepository;
import com.gestionproyectoscolaborativos.backend.services.dto.request.*;
import com.gestionproyectoscolaborativos.backend.services.dto.response.ActivtysProjects;
import com.gestionproyectoscolaborativos.backend.services.dto.response.UserDtoResponse;
import com.gestionproyectoscolaborativos.backend.services.dto.response.projects.UserRolProjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    public ResponseEntity<?> searchActivitybyId (Long id) {
        Activity a = activityRepository.findById(id).orElseThrow();
        ActivtysProjects activityDto = toDto(a);

        ProjectbyActivities p = new ProjectbyActivities();
        p.setId(a.getProject().getId());
        p.setName(a.getProject().getName());

        Map<String, Object> json = new HashMap<>();
        json.put("project", p);
        json.put("activity", activityDto);
        return ResponseEntity.ok(json);
    }

    private ActivtysProjects toDto(Activity a) {
        ActivtysProjects dto = new ActivtysProjects();
        dto.setId(a.getId());
        dto.setName(a.getName());
        dto.setDescription(a.getDescription());
        dto.setDateStart(a.getDateStart());
        dto.setDateDeliver(a.getDateDeliver());
        dto.setPrioridad(a.getPrioridad());
        dto.setState(new StateDto(a.getState().getName()));
        dto.setActivityFatherId(a.getActivityFather() != null ? a.getActivityFather().getId() : null);

        if (a.getActivityFather() != null) {
            dto.setActivityFather(toSimpleDto(a.getActivityFather())); // solo datos básicos del padre
        }

        dto.setUsers(a.getUsers().stream().map(u -> {
            UserRolProjectRequest ur = new UserRolProjectRequest();
            ur.setId(u.getId());
            ur.setName(u.getName());
            ur.setLastname(u.getLastname());
            ur.setEmail(u.getEmail());
            ur.setNumberPhone(u.getNumberPhone());
            ur.setRolProject(u.getUserProjects()
                    .stream()
                    .map(UserProject::getRolproject)
                    .collect(Collectors.joining(", ")));
            return ur;
        }).toList());

        // Subtareas (si las tiene)
        if (a.getSubtasks() != null && !a.getSubtasks().isEmpty()) {
            dto.setSubtasks(a.getSubtasks().stream()
                    .map(this::toSimpleDto) // evitar recursión infinita
                    .collect(Collectors.toList()));
        }

        return dto;
    }
    private ActivtysProjects toSimpleDto(Activity a) {
        ActivtysProjects dto = new ActivtysProjects();
        dto.setId(a.getId());
        dto.setName(a.getName());
        dto.setDescription(a.getDescription());
        dto.setDateStart(a.getDateStart());
        dto.setDateDeliver(a.getDateDeliver());
        dto.setPrioridad(a.getPrioridad());
        dto.setState(new StateDto(a.getState().getName()));
        dto.setActivityFatherId(a.getActivityFather().getId());
        dto.setUsers(a.getUsers().stream().map(ac -> {
            UserRolProjectRequest userDto = new UserRolProjectRequest();
            userDto.setId(ac.getId());
            userDto.setName(ac.getName());
            userDto.setEmail(ac.getEmail());
            userDto.setDescription(ac.getDescription());
            userDto.setRolProject(ac.getUserProjects()
                    .stream()
                    .map(UserProject::getRolproject)
                    .collect(Collectors.joining(", ")));
            userDto.setLastname(ac.getLastname());
            return userDto;
        }).toList());
        return dto;
    }
    public ResponseEntity<?> projectList () {
        List<ProjectbyActivities> projectbyActivities = projectRepository.findAll().stream().map(
                p -> {
                    ProjectbyActivities projectbyActivities1 = new ProjectbyActivities();
                    projectbyActivities1.setId(p.getId());
                    projectbyActivities1.setName(p.getName());
                    return projectbyActivities1;
                }
        ).toList();
        return ResponseEntity.ok().body(projectbyActivities);
    }

    public  ResponseEntity<?> activityFatherByProjectId (Integer id) {
        try {
            List<Activity> mainActivities = activityRepository.findByProjectIdAndActivityFatherIsNull(id);

            List<ActivtysProjects> responseList = mainActivities.stream().map(a -> {
                ActivtysProjects dto = new ActivtysProjects();
                dto.setId(a.getId());
                dto.setName(a.getName());
                dto.setDescription(a.getDescription());
                dto.setDateStart(a.getDateStart());
                dto.setDateDeliver(a.getDateDeliver());
                dto.setPrioridad(a.getPrioridad());
                dto.setState(new StateDto(a.getState().getName()));
                dto.setUsers(a.getUsers().stream().map(u -> {
                    UserRolProjectRequest user = new UserRolProjectRequest();
                    user.setId(u.getId());
                    user.setName(u.getName());
                    user.setLastname(u.getLastname());
                    user.setEmail(u.getEmail());
                    user.setNumberPhone(u.getNumberPhone());
                    user.setRolProject(
                            u.getUserProjects().stream()
                                    .map(UserProject::getRolproject)
                                    .collect(Collectors.joining(", "))
                    );
                    return user;
                }).toList());
                return dto;
            }).toList();

            return ResponseEntity.ok(responseList);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }


}
