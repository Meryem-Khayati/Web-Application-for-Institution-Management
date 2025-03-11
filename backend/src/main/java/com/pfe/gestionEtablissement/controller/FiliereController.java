package com.pfe.gestionEtablissement.controller;

import com.pfe.gestionEtablissement.model.Filiere;
import com.pfe.gestionEtablissement.service.FiliereService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FiliereController {
    @Autowired
    private FiliereService filiereService;

    @GetMapping("/filieres")
    public ResponseEntity<List<Filiere>> getAllFilieres() {
        List<Filiere> filieres = filiereService.getAllFilieres();
        return ResponseEntity.ok(filieres);
    }

    @GetMapping("/filieres/{id}")
    public ResponseEntity<Filiere> getFiliereByID(@PathVariable Integer id) {
        Filiere filiere = filiereService.getFiliereById(id);
        return ResponseEntity.ok(filiere);
    }

    @PostMapping("/dashboard/filieres")
    public ResponseEntity<String> ajouterFiliere(@RequestParam("nom") String nom,
                                                 @RequestParam("descreption") String descreption,
                                                 @RequestParam("image") MultipartFile image) throws IOException {

        String response = filiereService.ajouterFiliere(nom, descreption, image);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/dashboard/filieres/{id}")
    public ResponseEntity<String> deleteFiliere(@PathVariable Integer id) {
        String response = filiereService.deleteFiliereById(id);
        return ResponseEntity.ok().body(response);
    }

    @PatchMapping("/dashboard/filieres/{filiereId}")
    public ResponseEntity<String> updateFiliere(@PathVariable Integer filiereId,
                                                @RequestParam("nom") String nom,
                                                @RequestParam("descreption") String descreption,
                                                @RequestParam("image") MultipartFile image) throws IOException {
        String response = filiereService.updateFiliere(filiereId, nom, descreption, image);
        return ResponseEntity.ok(response);
    }
    @GetMapping("filieres/nombre")
    public long nombreTotalFilieres() {
        return filiereService.nombreFilieres();
    }



}
