package com.example.photopage.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtService {

    private final String secretKey = "bardzoDlugiIBezpiecznyKluczJwtKtoryPowinienBycTrzymanyWTajemnicy"; // zmień na długi losowy klucz

    private long jwtExpiration = 3600000; // 1 godzina

    public String genereteToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return buildToken(claims, userDetails, jwtExpiration);
    }

    public String buildToken(Map<String, Object> claims, UserDetails userDetails, long expiration) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() +  expiration))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public long getExpirationTime() {
        return jwtExpiration;
    }
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}

            



//public String getEmailFromJwtToken(String token) {
//    return Jwts.parser()
//            .setSigningKey(jwtSecret)
//            .parseClaimsJws(token)
//            .getBody()
//            .getSubject();
//}
//
//public boolean validateJwtToken(String token) {
//    try {
//        Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
//        return true;
//    } catch (JwtException e) {
//        // np. expired, malformed, unsupported
//    }
//    return false;
//}

