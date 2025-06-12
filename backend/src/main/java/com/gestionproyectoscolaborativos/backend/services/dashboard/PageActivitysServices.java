package com.gestionproyectoscolaborativos.backend.services.dashboard;

import com.gestionproyectoscolaborativos.backend.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PageActivitysServices {
    @Autowired
    private ActivityRepository activityRepository;

    public ResponseEntity<?> addActivitys () {
        return null;
    }
}
