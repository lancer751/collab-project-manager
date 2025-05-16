package com.gestionproyectoscolaborativos.backend.services.dashboard;

import com.gestionproyectoscolaborativos.backend.entitys.Project;
import com.gestionproyectoscolaborativos.backend.entitys.Rol;
import com.gestionproyectoscolaborativos.backend.entitys.Users;
import com.gestionproyectoscolaborativos.backend.entitys.histories.UserProjectRoleHistory;
import com.gestionproyectoscolaborativos.backend.entitys.tablesintermedate.UserProjectRol;
import com.gestionproyectoscolaborativos.backend.repository.*;
import com.gestionproyectoscolaborativos.backend.services.dto.request.ProjectHistoryDto;
import com.gestionproyectoscolaborativos.backend.services.dto.request.RolDto;
import com.gestionproyectoscolaborativos.backend.services.dto.request.UserPatchDto;
import com.gestionproyectoscolaborativos.backend.services.dto.response.UserDtoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdminFunctionsServices {

    @Autowired
    private UserProjectRoleHistoryRepository userProjectRoleHistoryRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserProjectRolRepository userProjectRolRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private RolRepository rolRepository;

    @Transactional
    public ResponseEntity<?> asingProjectHistory (ProjectHistoryDto projectHistoryDto) {
        try {
            Users userNewLider = userRepository.findById(projectHistoryDto.getIdNuevoLider()).orElseThrow();
            // 1. Obtener historial de roles eliminados con ese rol específico
            List<UserProjectRoleHistory> historiales = userProjectRoleHistoryRepository.findByRolName(projectHistoryDto.getNombreRol());

            Rol rol = rolRepository.findByName(projectHistoryDto.getNombreRol())
                    .orElseThrow(() -> new RuntimeException("Rol no encontrado: " + projectHistoryDto.getNombreRol()));

            for (UserProjectRoleHistory hisotryProject : historiales ) {
                Integer projectId = hisotryProject.getIdProject();

                if (projectId != null) {
                    Project proyecto = projectRepository.findById(projectId)
                            .orElse(null);

                    // Verificar si ya tiene ese rol en ese proyecto
                    boolean yaAsignado = userProjectRolRepository.existsByUsersAndRolAndProject(userNewLider, rol, proyecto);

                    if (!yaAsignado && proyecto != null) {
                        UserProjectRol nuevaAsignacion = new UserProjectRol();
                        nuevaAsignacion.setUsers(userNewLider);
                        nuevaAsignacion.setRol(rol);
                        nuevaAsignacion.setProject(proyecto);
                        userProjectRolRepository.save(nuevaAsignacion);
                    }
                }
            }
            return ResponseEntity.ok().body("Restaurado con exito");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error" + e.getMessage());
        }

    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> userByID (Integer id){
        try {
            Users users = userRepository.findById(id).orElseThrow();
            UserDtoResponse userDtoResponse = new UserDtoResponse();
            userDtoResponse.setId(users.getId());
            userDtoResponse.setName(users.getName());
            userDtoResponse.setLastname(users.getLastname());
            userDtoResponse.setEmail(users.getEmail());
            userDtoResponse.setDescription(users.getDescription());
            userDtoResponse.setEntryDate(users.getEntryDate());
            Set<String> roleUnique = new HashSet<>();

            List<RolDto> rolDtoList = users.getUserProjectRols().stream()
                    .map(rol -> rol.getRol().getName().replaceFirst("ROLE_",  ""))
                    .filter(roleUnique::add) // solo agrega si es nuevo
                    .map(nombre -> {
                        RolDto rolDto = new RolDto();
                        rolDto.setName(nombre);
                        return rolDto;
                    }).collect(Collectors.toList());
            userDtoResponse.setRolDtoList(rolDtoList);
            userDtoResponse.setActive(users.isEnable());
            return ResponseEntity.ok().body(userDtoResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Transactional
    public ResponseEntity<?> editbylist(List<UserPatchDto> userPatchDtos) {
        Map<String, String> josn = new HashMap<>();
        try {
            if (!userPatchDtos.isEmpty()) {
                for (UserPatchDto userPatchDto : userPatchDtos) {
                    Users users = userRepository.findById(userPatchDto.getId()).orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + userPatchDto.getId()));
                    if (userPatchDto.getEntryDate() != null) users.setEntryDate(userPatchDto.getEntryDate());
                    users.setEnable(userPatchDto.isEnable());

                    // 1. Obtener roles actuales del usuario
                    List<UserProjectRol> rolesActuales = userProjectRolRepository.findByUsers(users);

                    // 2. Preparar el nuevo rol (formato: "ADMIN", "LIDER", etc.)
                    String nuevoRolNombre = userPatchDto.getRol();

                    if (nuevoRolNombre != null && !nuevoRolNombre.isBlank()) {
                        // Asegurar prefijo "ROLE_"
                        if (!nuevoRolNombre.startsWith("ROLE_")) {
                            nuevoRolNombre = "ROLE_" + nuevoRolNombre.toUpperCase();
                        }

                        // 3. Eliminar TODOS los roles actuales (guardando historial si aplica)
                        for (UserProjectRol upr : rolesActuales) {
                            String nombreRolActual = upr.getRol().getName();

                            if (upr.getProject() != null && (nombreRolActual.startsWith("ROLE_LIDER") || nombreRolActual.startsWith("ROLE_ADMIN"))) {
                                UserProjectRoleHistory historial = getUserProjectRoleHistory(upr);
                                userProjectRoleHistoryRepository.save(historial);
                            }

                            userProjectRolRepository.delete(upr);
                        }

                        // 4. Buscar y asignar el nuevo rol
                        Rol nuevoRol = rolRepository.findByName(nuevoRolNombre)
                                .orElseThrow(() -> new RuntimeException("Rol no encontrado: " ));

                        UserProjectRol nuevo = new UserProjectRol();
                        nuevo.setUsers(users);
                        nuevo.setRol(nuevoRol);
                        userProjectRolRepository.save(nuevo);
                    }

                }
            }
            josn.put("message", "Usuarios editados");
            return ResponseEntity.ok().body(josn);
        } catch (Exception e) {
            josn.put("message", "Hubo un error " + e.getMessage());
            return ResponseEntity.ok().body(josn);
        }



    }
    private static UserProjectRoleHistory getUserProjectRoleHistory(UserProjectRol upr) {
        UserProjectRoleHistory userProjectRoleHistory = new UserProjectRoleHistory();
        userProjectRoleHistory.setIdProject(upr.getProject().getId());
        userProjectRoleHistory.setNameProject(upr.getProject().getName());
        userProjectRoleHistory.setIdUser(upr.getUsers().getId());
        userProjectRoleHistory.setUserName(upr.getUsers().getName() + " " + upr.getUsers().getLastname());
        userProjectRoleHistory.setIdRol(upr.getRol().getId());
        userProjectRoleHistory.setRolName(upr.getRol().getName());
        return userProjectRoleHistory;
    }
}
