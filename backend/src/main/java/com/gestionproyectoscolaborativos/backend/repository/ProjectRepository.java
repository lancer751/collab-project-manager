package com.gestionproyectoscolaborativos.backend.repository;

import com.gestionproyectoscolaborativos.backend.entitys.Project;
import com.gestionproyectoscolaborativos.backend.entitys.enums.Priority;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {

    @Query("""
    SELECT p FROM Project p
    WHERE 
        (:search IS NULL OR p.name LIKE CONCAT('%', :search, '%'))
        AND (:state IS NULL OR p.state.name = :state)
        AND (:priority IS NULL OR p.priority = :priority)
        AND (:dateStart IS NULL OR p.dateStart >= :dateStart)
        AND (:dateFinish IS NULL OR p.dateDeliver <= :dateFinish)
        AND (:liderProject IS NULL OR EXISTS (
            SELECT upr FROM UserProject upr
            WHERE upr.project = p AND upr.rolproject = 'LIDER' AND upr.users.email LIKE CONCAT('%', :liderProject, '%')
        ))
    """)
    Page<Project> searchProjects(
            @Param("search") String search,
            @Param("state") String state,
            @Param("priority") Priority priority,
            @Param("dateStart") LocalDateTime dateStart,
            @Param("dateFinish") LocalDateTime dateFinish,
            @Param("liderProject") String liderProject,
            Pageable pageable
    );


}
