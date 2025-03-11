package com.pfe.gestionEtablissement.controller;

import com.pfe.gestionEtablissement.dtos.EtudiantDetails;
import com.pfe.gestionEtablissement.dtos.EtudiantDetailsDto;
import com.pfe.gestionEtablissement.dtos.EtudiantDto;
import com.pfe.gestionEtablissement.dtos.ModuleDetails;
import com.pfe.gestionEtablissement.model.*;
import com.pfe.gestionEtablissement.repository.EtudiantRepository;
import com.pfe.gestionEtablissement.repository.SemestreRepository;
import com.pfe.gestionEtablissement.service.AuthenticationService;
import com.pfe.gestionEtablissement.service.EtudiantService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {
    private final AuthenticationService authService;


    public AuthenticationController( AuthenticationService authService) {
        this.authService = authService;
    }



    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody User request
    ){
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody User request
    ) {
        System.out.println(request);
   return ResponseEntity.ok(authService.authenticate(request));
    }




}
