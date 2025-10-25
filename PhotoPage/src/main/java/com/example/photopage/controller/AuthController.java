package com.example.photopage.controller;

import com.example.photopage.config.JwtService;
import com.example.photopage.dto.LoginRequest;
import com.example.photopage.dto.LoginResponse;
import com.example.photopage.dto.RegisterRequest;
import com.example.photopage.model.User;
import com.example.photopage.service.AuthenticationService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.apache.tomcat.util.http.SameSiteCookies;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    private final AuthenticationService authenticationService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest req) {
        User registeredUser = authenticationService.signup(req);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        User authenticatedUser = authenticationService.login(loginRequest);
        ResponseCookie cookie = ResponseCookie.from("jwt", jwtService.genereteToken(authenticatedUser))
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(36000)
                .sameSite(SameSiteCookies.STRICT.toString())
                .build();

        String jwtToken = jwtService.genereteToken(authenticatedUser);
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok(authenticatedUser);
    }
}
