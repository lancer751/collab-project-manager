package com.gestionproyectoscolaborativos.backend.services.dto;

import com.gestionproyectoscolaborativos.backend.services.dto.request.StateDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ActivityPacthDTO {
    private List<Integer> idActivity;
    private StateDto stateDto;
}
