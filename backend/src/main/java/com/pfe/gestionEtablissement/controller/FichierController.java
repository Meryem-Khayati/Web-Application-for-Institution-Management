package com.pfe.gestionEtablissement.controller;

import com.pfe.gestionEtablissement.model.Fichier;
import com.pfe.gestionEtablissement.service.AnnonceService;
import com.pfe.gestionEtablissement.service.FichierService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FichierController {
    @Autowired
    private FichierService fichierService;
    @Autowired
    private AnnonceService annonceService;

    @PostMapping("/dashboard/annonces/{annonceId}/fichiers")
    public ResponseEntity<String> ajouterFichierAAnnonce(
            @PathVariable Long annonceId,
            @RequestParam("file") MultipartFile file,
            @RequestParam String type
    ) throws IOException {
            return ResponseEntity.ok( fichierService.ajouterFichierAAnnonce(annonceId,type, file));

    }
    @DeleteMapping("/dashboard/annonces/{annonceId}/fichiers/{fichierId}")
    public ResponseEntity<String> supprimerFichierDeAnnonce(@PathVariable Long annonceId, @PathVariable Integer fichierId) {
        return ResponseEntity.ok(fichierService.supprimerFichierDeAnnonce(annonceId, fichierId));
    }

    @GetMapping("/annonces/{annonceId}/fichiers")
    public ResponseEntity<List<Fichier>> obtenirFichiersDeAnnonce(@PathVariable Long annonceId) {
        try {
            List<Fichier> fichiers = fichierService.obtenirFichiersDeAnnonce(annonceId);
            return ResponseEntity.ok(fichiers);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/annonces/{annonceId}/fichiers/{fichierId}")
    public ResponseEntity<Fichier> obtenirFichierDeAnnonce(@PathVariable Long annonceId, @PathVariable Integer fichierId) {
        try {
            Fichier fichier = fichierService.obtenirFichierDeAnnonce(annonceId, fichierId);
            return ResponseEntity.ok(fichier);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/dashboard/annonces/{annonceId}/fichiers/{fichierId}")
    public ResponseEntity<String> mettreAJourFichierDeAnnonce(@PathVariable Long annonceId, @PathVariable Integer fichierId,@RequestParam String type ,@RequestParam("file") MultipartFile nouveauFichier) throws IOException {
            return ResponseEntity.ok(fichierService.mettreAJourFichierDeAnnonce(annonceId, fichierId,type, nouveauFichier));
    }


}
