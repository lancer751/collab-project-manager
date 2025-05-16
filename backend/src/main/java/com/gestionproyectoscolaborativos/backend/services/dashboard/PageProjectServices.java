package com.gestionproyectoscolaborativos.backend.services.dashboard;

import com.gestionproyectoscolaborativos.backend.entitys.Coment;
import com.gestionproyectoscolaborativos.backend.entitys.Project;
import com.gestionproyectoscolaborativos.backend.repository.ComentRepository;
import com.gestionproyectoscolaborativos.backend.repository.ProjectRepository;
import com.gestionproyectoscolaborativos.backend.services.dto.response.projects.ComentsRecentResponseDto;
import com.gestionproyectoscolaborativos.backend.services.dto.response.projects.ProjectRecentResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PageProjectServices {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ComentRepository comentRepository;

    // recently published projects
    public ResponseEntity<?> readprojectrecient () {
        try {
            List<ProjectRecentResponseDto> responseDtoList = projectRepository.findAll().stream()
                    .sorted(Comparator.comparing(
                            (Project p) -> p.getAuditFields().getCreatedAt()
                    ).reversed())
                    .limit(10)
                    .map(project -> {
                        ProjectRecentResponseDto dto = new ProjectRecentResponseDto();
                        dto.setTitle(project.getName());
                        return dto;
                    })
                    .toList();
            return ResponseEntity.ok().body(responseDtoList);
        } catch (Exception e) {
            Map<String, String> json = new HashMap<>();
            json.put("message", "El error fue " + e.getMessage());
            return ResponseEntity.badRequest().body(json);
        }
    }
    // validar a la fecha de hoy
    // y si el proyecto sigue activo
    public ResponseEntity<?> readnextdelivery () {
        try {
            LocalDateTime today = LocalDateTime.now();
            List<ProjectRecentResponseDto> responseDtoList = projectRepository.findAll().stream()
                    .filter(project -> project.getDateDeliver() != null && !project.getDateDeliver().isBefore(LocalDateTime.now()))
                    .sorted(Comparator.comparing(Project::getDateDeliver))
                    .limit(5)
                    .map(project -> {
                        ProjectRecentResponseDto dto = new ProjectRecentResponseDto();
                        dto.setTitle(project.getName());
                        long days = ChronoUnit.DAYS.between(today.toLocalDate(), project.getDateDeliver().toLocalDate());
                        if ( days == 0) {
                            dto.setTimeFinish("Finaliza hoy");
                        } else if (days == 1) {
                            dto.setTimeFinish("Finaliza en 1 dia");
                        }else if (days < 7) {
                            dto.setTimeFinish("Finaliza en " + days + " días");
                        }else {
                            long weeks = (long) Math.ceil(days / 7.0);
                            dto.setTimeFinish("Finaliza en " + weeks + (weeks == 1 ? " semana" : " semanas"));
                        }
                        return dto;
                    })
                    .toList();
            return ResponseEntity.ok().body(responseDtoList);
        } catch (Exception e) {
            Map<String, String> json = new HashMap<>();
            json.put("message", "El error fue " + e.getMessage());
            return ResponseEntity.badRequest().body(json);
        }
    }

    // recently published coments
    public ResponseEntity<?> readcomentrecient () {
        Map<String, String> json = new HashMap<>();
        try {
            List<ComentsRecentResponseDto> recentResponseDtos = comentRepository.findAll()
                    .stream()
                    .sorted(Comparator.comparing((Coment c) -> c.getAuditFields().getCreatedAt()).reversed())
                    .limit(5)
                    .map(c -> {
                        ComentsRecentResponseDto coment = new ComentsRecentResponseDto();
                        coment.setAuthor(c.getUsers().getName() + " " + c.getUsers().getLastname());
                        coment.setTitleProject(c.getProject().getName());
                        coment.setLastTime(tiempoTranscurrido(c.getAuditFields().getCreatedAt()));
                        return coment;
                    })
                    .toList();
            return ResponseEntity.ok().body(recentResponseDtos);
        } catch (Exception e) {
            json.put("message", "error " + e.getMessage());
            return ResponseEntity.badRequest().body(json);
        }
    }

    public static String tiempoTranscurrido(LocalDateTime fechaEvento) {
        LocalDateTime ahora = LocalDateTime.now();
        Duration duracion = Duration.between(fechaEvento, ahora);

        long segundos = duracion.getSeconds();

        if (segundos < 60) return "Hace un momento";
        if (segundos < 3600) return "Hace " + (segundos / 60) + " minutos";
        if (segundos < 86400) return "Hace " + (segundos / 3600) + " horas";
        if (segundos < 172800) return "Hace 1 día";
        return "Hace " + (segundos / 86400) + " días";
    }
}
