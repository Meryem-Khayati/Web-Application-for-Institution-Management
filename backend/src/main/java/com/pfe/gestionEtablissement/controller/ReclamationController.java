package com.pfe.gestionEtablissement.controller;

import com.pfe.gestionEtablissement.enumeration.TypeDocument;
import com.pfe.gestionEtablissement.model.Etudiant;
import com.pfe.gestionEtablissement.model.Reclamation;
import com.pfe.gestionEtablissement.repository.EtudiantRepository;
import com.pfe.gestionEtablissement.service.ReclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")

public class ReclamationController {
    @Autowired
    private EtudiantRepository etudiantRepository;
    @Autowired
    private ReclamationService reclamationService;

    @PostMapping("/profil/reclamations")
    public ResponseEntity<String> creerReclamation(@RequestBody CreerReclamationRequest request) {
        Etudiant etudiant = etudiantRepository.findByApogeeAndUsernameAndCin(request.getApogee(), request.getUsername(), request.getCin());
        return ResponseEntity.ok(reclamationService.creerReclamation(etudiant, request.getTypeDocument(), request.getDateReclamation(), request.getMessage()));
    }

    public static class CreerReclamationRequest {
        private long apogee;
        private String username;
        private String cin;
        private TypeDocument typeDocument;
        private String dateReclamation;
        private String message;

        // Getters and setters


        public long getApogee() {
            return apogee;
        }

        public void setApogee(long apogee) {
            this.apogee = apogee;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getCin() {
            return cin;
        }

        public void setCin(String cin) {
            this.cin = cin;
        }

        public TypeDocument getTypeDocument() {
            return typeDocument;
        }

        public void setTypeDocument(TypeDocument typeDocument) {
            this.typeDocument = typeDocument;
        }

        public String getDateReclamation() {
            return dateReclamation;
        }

        public void setDateReclamation(String dateReclamation) {
            this.dateReclamation = dateReclamation;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    @GetMapping("/dashboard/reclamations/{id}")
    public ResponseEntity<Reclamation> getReclamationById(@PathVariable Integer id) {
        Optional<Reclamation> reclamation = reclamationService.getById(id);
        return reclamation.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/dashboard/reclamations")
    public ResponseEntity<List<Reclamation>> getAllReclamations() {
        List<Reclamation> reclamations = reclamationService.getAllReclamations();
        return ResponseEntity.ok(reclamations);
    }

    @PutMapping("/dashboard/reclamations/{id}/mettre-a-jourStatut")
    public ResponseEntity<Reclamation> mettreAJourStatutReclamation(
            @PathVariable("id") Integer reclamationId,
            @RequestParam("nouveauStatut") String nouveauStatut) {
        Reclamation updatedReclamation = reclamationService.mettreAJourStatutReclamation(reclamationId, nouveauStatut);
        return ResponseEntity.ok(updatedReclamation);
    }

    @PostMapping("/dashboard/reclamations/{id}/accepter-et-envoyer-mail")
    public ResponseEntity<String> accepterEtEnvoyerMail(
            @PathVariable("id") Integer id,
            @RequestParam("subject") String subject,
            @RequestParam("body") String body,
            @RequestParam("files") MultipartFile[] files) {
        return ResponseEntity.ok(reclamationService.accepterEtEnvoyerMail(id, subject, body, files));
    }
    @GetMapping("reclamations/nombre")
    public long nombreTotalRecalamtions() {
        return reclamationService.nombreReclamation();
    }
}
