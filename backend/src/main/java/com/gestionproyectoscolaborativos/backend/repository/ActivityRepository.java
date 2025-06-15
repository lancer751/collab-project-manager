package com.gestionproyectoscolaborativos.backend.repository;

import com.gestionproyectoscolaborativos.backend.entitys.Activity;
import com.gestionproyectoscolaborativos.backend.entitys.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByProject (Project project);

    void deleteByProjectId(Integer id);

    List<Activity> findByProjectId(Integer id);

    List<Activity> findByProjectIdAndActivityFatherIsNull(Integer projectId);

    List<Activity> findByActivityFatherIsNull();

    Page<Activity> findByActivityFatherIsNull(Pageable pageable);


}
