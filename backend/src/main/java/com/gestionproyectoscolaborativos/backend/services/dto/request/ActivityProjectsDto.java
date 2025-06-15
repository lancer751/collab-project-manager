package com.gestionproyectoscolaborativos.backend.services.dto.request;


import com.gestionproyectoscolaborativos.backend.entitys.enums.Priority;
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
public class ActivityProjectsDto {

    private String name;
    private String description;
    private LocalDateTime dateStart;
    private LocalDateTime dateDeliver; // fecha entrega
    private Priority priority;
    private StateDto state;
    private Integer activityFatherId;
    private Integer idProject;
    private List<Integer> usersList;

}
