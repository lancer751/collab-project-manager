package com.gestionproyectoscolaborativos.backend.repository;

import com.gestionproyectoscolaborativos.backend.entitys.Users;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
    boolean existsByEmail (String email);
    @EntityGraph(attributePaths = {"usuarioProyectoRols", "usuarioProyectoRols.rol"}) // para que se cargue cuando realmente se tiene que usar
    Optional<Users> findByEmail (String email);
}
