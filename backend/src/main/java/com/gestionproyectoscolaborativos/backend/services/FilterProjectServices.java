package com.gestionproyectoscolaborativos.backend.services;

import com.gestionproyectoscolaborativos.backend.repository.ProjectRepository;
import com.gestionproyectoscolaborativos.backend.repository.StateRepository;
import com.gestionproyectoscolaborativos.backend.repository.UserProjectRepository;
import com.gestionproyectoscolaborativos.backend.services.dto.response.StateDto;
import com.gestionproyectoscolaborativos.backend.services.dto.response.UserDtoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FilterProjectServices {
    @Autowired
    private StateRepository stateRepository;


    @Autowired
    private UserProjectRepository userProjectRepository;

    public ResponseEntity<?> readAllState () {
        try {
            List<StateDto> stateDtos = stateRepository.findAll().stream().map(s -> {
                StateDto stateDto = new StateDto();
                stateDto.setName(s.getName());
                return  stateDto;
            }).toList();
            return ResponseEntity.ok().body(stateDtos);
        } catch (Exception e) {
            return  ResponseEntity.badRequest().body("Hubo un error" + e.getMessage());
        }
    }

    public  ResponseEntity<?> searchLiderProject () {
        try {
            List<UserDtoResponse> userDtoResponses = userProjectRepository.findByRolproject("Lider").stream().map(u -> {
                UserDtoResponse userDtoResponse = new UserDtoResponse();
                userDtoResponse.setName(u.getUsers().getName());
                userDtoResponse.setLastname(u.getUsers().getLastname());
                return userDtoResponse;
            }).toList();
            return  ResponseEntity.ok().body(userDtoResponses);
        } catch (Exception e) {
             return  ResponseEntity.badRequest().body("hay error " + e.getMessage());
        }

    }
}
