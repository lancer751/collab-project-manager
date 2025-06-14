package com.gestionproyectoscolaborativos.backend.services.dto.response;

import com.gestionproyectoscolaborativos.backend.entitys.enums.Priority;
import com.gestionproyectoscolaborativos.backend.services.dto.request.StateDto;
import com.gestionproyectoscolaborativos.backend.services.dto.response.projects.UserRolProjectRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ActivtysProjects {
    private Integer id;
    private String name;
    private String description;
    private LocalDateTime dateStart;
    private LocalDateTime dateDeliver;
    private Priority prioridad;
    private StateDto state;
    private Integer activityFatherId;
    private ActivtysProjects activityFather; // objeto padre
    private List<ActivtysProjects> subtasks; // lista de subtareas
    private List<UserRolProjectRequest> users;
}
