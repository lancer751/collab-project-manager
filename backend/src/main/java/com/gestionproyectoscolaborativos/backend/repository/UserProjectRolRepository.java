package com.gestionproyectoscolaborativos.backend.repository;

import com.gestionproyectoscolaborativos.backend.entitys.Project;
import com.gestionproyectoscolaborativos.backend.entitys.Rol;
import com.gestionproyectoscolaborativos.backend.entitys.Users;
import com.gestionproyectoscolaborativos.backend.entitys.tablesintermedate.UserProjectRol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserProjectRolRepository extends JpaRepository<UserProjectRol, Integer> {

    @Query("SELECT upr.rol FROM UserProjectRol upr WHERE upr.users = :user")
    List<Rol> findRolesByUser(@Param("user") Users user);

    @Query("SELECT upr FROM UserProjectRol upr WHERE upr.users = :user AND upr.rol = :rol")
    List<UserProjectRol> findRolesByUserRole(@Param("user") Users users, @Param("rol") Rol rol);

    @Query("SELECT upr FROM UserProjectRol upr WHERE upr.users = :user")
    List<UserProjectRol> findByUsers(@Param("user") Users users);


    @Query("SELECT upr FROM UserProjectRol upr WHERE upr.project = :project")
    List<UserProjectRol> findByProject(@Param("project") Project project);


    @Modifying
    @Transactional
    @Query("DELETE FROM UserProjectRol upr WHERE upr.project.id = :id")
    void deleteByProjectId(@Param("id") Integer id);

    void deleteByUsersAndProject(Users user, Project project);


}
