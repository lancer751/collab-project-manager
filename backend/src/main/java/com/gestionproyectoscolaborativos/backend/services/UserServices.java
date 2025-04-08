package com.gestionproyectoscolaborativos.backend.services;

import com.gestionproyectoscolaborativos.backend.entitys.Rol;
import com.gestionproyectoscolaborativos.backend.entitys.Users;
import com.gestionproyectoscolaborativos.backend.entitys.tablesintermedate.UserProjectRol;
import com.gestionproyectoscolaborativos.backend.repository.ProjectRepository;
import com.gestionproyectoscolaborativos.backend.repository.RolRepository;
import com.gestionproyectoscolaborativos.backend.repository.UserProjectRolRepository;
import com.gestionproyectoscolaborativos.backend.repository.UserRepository;
import com.gestionproyectoscolaborativos.backend.services.dto.RolDto;
import com.gestionproyectoscolaborativos.backend.services.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServices {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserProjectRolRepository userProjectRolRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public ResponseEntity<?> save (UserDto userDto) {
        String password = passwordEncoder.encode(userDto.getPassword());

        Users user = new Users();
        user.setName(userDto.getName());
        user.setLastname(userDto.getLastname());
        user.setPassword(password);

        List<RolDto> rolDtoList = new ArrayList<>();
        List<UserProjectRol> userProjectRolList = new ArrayList<>();

        UserProjectRol userProjectRol = new UserProjectRol();
        userDto.getRolDtoList().forEach(e -> rolDtoList.add(e));

        for (RolDto r : rolDtoList) {
            Optional<Rol> rol = rolRepository.findByName(r.getName());
            if (!rol.isPresent()) {
                UserProjectRol userProjectRolNew = new UserProjectRol();
                Rol rol1 = new Rol();
                rol1.setName(r.getName());
                rolRepository.save(rol1);

                userProjectRolNew.setRol(rol1);
                userProjectRolNew.setUsers(user);
                userProjectRolNew.setProject(null);
                userProjectRolList.add(userProjectRolNew);

            }else{
                UserProjectRol userProjectRolNew = new UserProjectRol();
                userProjectRolNew.setRol(rol.get());
                userProjectRolNew.setUsers(user);
                userProjectRolNew.setProject(null);

                userProjectRolList.add(userProjectRolNew);
            }
        }

        user.setEmail(userDto.getEmail());
        user.setUsuarioProyectoRols(userProjectRolList);
        user.setEnable(true);
        user.setActivities(null);
        userRepository.save(user);
        userProjectRolList.forEach(userProjectRolRepository::save);
        return ResponseEntity.ok().body(new UserDto(userDto.getName(), userDto.getLastname(), userDto.getEmail(), password, rolDtoList));
    }
    public boolean existsByUsername(String username) {
        return userRepository.existsByEmail(username);
    }
}
