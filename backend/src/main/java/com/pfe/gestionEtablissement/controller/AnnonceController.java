package com.pfe.gestionEtablissement.controller;

import com.pfe.gestionEtablissement.model.Annonce;
import com.pfe.gestionEtablissement.service.AnnonceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class AnnonceController {
    @Autowired
    private AnnonceService annonceService;

    @GetMapping("/annonces")
    public ResponseEntity<List<Annonce>> getAllAnnonces() {
        List<Annonce> annonces = annonceService.getAllAnnonces();
        return new ResponseEntity<>(annonces, HttpStatus.OK);
    }

    @GetMapping("/annonces/{id}")
    public ResponseEntity<Annonce> getAnnonceById(@PathVariable Long id) {
        return ResponseEntity.ok(annonceService.getAnnonceById(id));
    }

    @PostMapping("/dashboard/annonces")
    public ResponseEntity<String> createAnnonce(@RequestBody Annonce annonce) {
        return  ResponseEntity.ok(annonceService.saveAnnonce(annonce));
    }


    @PutMapping("/dashboard/annonces/{id}")
    public ResponseEntity<String> updateAnnonce(@PathVariable Long id, @RequestBody Annonce updatedAnnonce) {
        return  ResponseEntity.ok(annonceService.updateAnnonce(id, updatedAnnonce));
    }


    @DeleteMapping("/dashboard/annonces/{id}")
    public ResponseEntity<String> deleteAnnonce(@PathVariable Long id) {
        return  ResponseEntity.ok(annonceService.deleteAnnonce(id));

    }
    @GetMapping("annonces/nombre")
    public long nombreTotalAnnonces() {
        return annonceService.nombreAnnonces();
    }

}
