package com.gestionproyectoscolaborativos.backend.security;

import com.gestionproyectoscolaborativos.backend.security.filter.JwtAuthenticacionFilter;
import com.gestionproyectoscolaborativos.backend.security.filter.JwtValidationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;


    @Bean
    AuthenticationManager authenticationManager () throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // para poder inyectar la dependencia
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //darle seguridad al endpoint
    @Bean
    SecurityFilterChain filterChain (HttpSecurity http) throws Exception{
        return http.authorizeHttpRequests((authz) -> authz
                .requestMatchers(HttpMethod.POST, "/dashboard/registeruser").hasAnyRole("ADMIN", "LIDERSISTEMAS", "LIDERSOFTWARE")
                        .requestMatchers(HttpMethod.POST, "/project/add").hasAnyRole("ADMIN", "LIDERSISTEMAS", "LIDERSOFTWARE")
                        .requestMatchers(HttpMethod.PUT, "/project/edit/{id}").hasAnyRole("ADMIN", "LIDERSISTEMAS", "LIDERSOFTWARE")
                        .requestMatchers(HttpMethod.DELETE, "/project/delete/{id}").hasAnyRole("ADMIN", "LIDERSISTEMAS", "LIDERSOFTWARE")
                        .requestMatchers(HttpMethod.GET, "/dashboardadmin/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/project/").authenticated()
                        .anyRequest().authenticated())
                .addFilter(new JwtAuthenticacionFilter(authenticationConfiguration.getAuthenticationManager()))
                .addFilter(new JwtValidationFilter(authenticationConfiguration.getAuthenticationManager()))
                .csrf(config -> config.disable())
                .sessionManagement(managment -> managment.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();
    }
}
