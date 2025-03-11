package com.pfe.gestionEtablissement.controller;

import com.pfe.gestionEtablissement.model.Filiere;
import com.pfe.gestionEtablissement.repository.FiliereRepository;
import com.pfe.gestionEtablissement.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class DemoController {

    private final FiliereRepository filiereRepository;

    public DemoController(FiliereRepository filiereRepository) {
        this.filiereRepository = filiereRepository;
    }

    @GetMapping("/demo")
    public ResponseEntity<String> demo() {
        return ResponseEntity.ok("Hello from secured url");
    }

    @GetMapping("/admin_only")
    public ResponseEntity<String> adminOnly() {
        return ResponseEntity.ok("Hello from admin only url");
    }
 /*   @PostMapping("/ajouterf")
    public ResponseEntity<Filiere> ajouterFiliere(@RequestBody Filiere filiere){
        try{
           filiereRepository.save(filiere);
            return ResponseEntity.ok(filiere);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(filiere);
        }

    }*/
    @Autowired
    private JwtService JwtTokenUtil;
 @GetMapping("/test")
 public String testExtractUsername(@RequestParam("token") String token) {
     String username = JwtTokenUtil.extractUsername(token);
     return "Le nom d'utilisateur extrait du token JWT est : " + username;
 }
}
