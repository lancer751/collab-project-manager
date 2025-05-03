package com.gestionproyectoscolaborativos.backend.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gestionproyectoscolaborativos.backend.security.SimpleGrantedAuthorityJsonCreator;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import static com.gestionproyectoscolaborativos.backend.security.TokenJwtConfig.*;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class JwtValidationFilter extends BasicAuthenticationFilter {

    //autenticacion manganer a la clase padre
    public JwtValidationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(HEADER_AUTHORIZATION);


        // 👉 Nueva forma: obtener token desde cookie si no viene en el header
        if (header == null || !header.startsWith(PREFIX_TOKEN)) {
            // Buscar la cookie con nombre "jwt-token"
            if (request.getCookies() != null) {
                for (Cookie cookie : request.getCookies()) {
                    if("token-jwt".equals(cookie.getName())) { // token de logeo
                        header = PREFIX_TOKEN + cookie.getValue();
                        break;
                    }
                }
            }
            if (header == null) { // Si no se encontró token-jwt
                if(request.getCookies() != null ) {
                    for (Cookie cookie : request.getCookies()) {
                        if ("refresh-token".equals(cookie.getName())) {
                            header = PREFIX_TOKEN + cookie.getValue();
                            break;
                        }
                    }
                }
            }
        }

        if(header == null || !header.startsWith(PREFIX_TOKEN)){
            chain.doFilter(request,response);
            return;
        }
        String token = header.replace(PREFIX_TOKEN, "");
        try {
            Claims claims = Jwts.parser().verifyWith(SECRET_KEY).build().parseSignedClaims(token).getPayload(); // verifica el token
            String username = claims.getSubject();
            //String username2 = (String) claims.get("username");
            Object authorizationClaims = claims.get("authorities");

            Collection<? extends GrantedAuthority> authorities = Arrays.asList(
                    new ObjectMapper()
                            .addMixIn(SimpleGrantedAuthority.class, SimpleGrantedAuthorityJsonCreator.class)
                            .readValue(authorizationClaims.toString().getBytes(), SimpleGrantedAuthority[].class));

            UsernamePasswordAuthenticationToken authenticationToken= new UsernamePasswordAuthenticationToken(username, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            chain.doFilter(request, response);
        } catch (JwtException e) {
            Map<String, String> body = new HashMap<>();
            body.put("error", e.getMessage());
            body.put("message", "El token Jwt es invalido");

            response.getWriter().write(new ObjectMapper().writeValueAsString(body));
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType(CONTENT_TYPE);
        }
    }
}
