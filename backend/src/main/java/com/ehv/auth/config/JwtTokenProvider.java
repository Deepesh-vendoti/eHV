package com.ehv.auth.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${app.jwt-secret}")
    private String jwtSecret;

    @Value("${app.jwt-expiration-milliseconds}")
    private long jwtExpirationInMs;

    private Key key;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(key)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
} 