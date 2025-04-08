package com.gestionproyectoscolaborativos.backend.repository;

import com.gestionproyectoscolaborativos.backend.entitys.Rol;
import com.gestionproyectoscolaborativos.backend.entitys.Users;
import com.gestionproyectoscolaborativos.backend.entitys.tablesintermedate.UserProjectRol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserProjectRolRepository extends JpaRepository<UserProjectRol, Integer> {

    @Query("SELECT upr.rol FROM UserProjectRol upr WHERE upr.users = :user")
    List<Rol> findRolesByUser(@Param("user") Users user);
}
