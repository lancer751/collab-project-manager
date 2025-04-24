package com.gestionproyectoscolaborativos.backend.services.dto.response;

import com.gestionproyectoscolaborativos.backend.services.dto.request.RolDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDtoResponse {

    private String name;


    private String lastname;


    private String email;

    private List<RolDto> rolDtoList;
}
