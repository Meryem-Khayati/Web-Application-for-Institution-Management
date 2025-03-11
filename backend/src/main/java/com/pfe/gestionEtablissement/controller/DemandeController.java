package com.pfe.gestionEtablissement.controller;

import com.pfe.gestionEtablissement.enumeration.TypeDocument;
import com.pfe.gestionEtablissement.model.Demande;
import com.pfe.gestionEtablissement.model.Etudiant;
import com.pfe.gestionEtablissement.repository.EmailRepository;
import com.pfe.gestionEtablissement.repository.EtudiantRepository;
import com.pfe.gestionEtablissement.service.AuthenticationService;
import com.pfe.gestionEtablissement.service.DemandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DemandeController {

    @Autowired
    private DemandeService demandeService;
    @Autowired
    private EtudiantRepository etudiantRepository;
//    @Autowired
//    private EmailRepository emailRepo;

    @PostMapping("/dashboard/demandes/{idd}/accepter-et-envoyer-mail")
    public ResponseEntity<String> accepterEtEnvoyerMail(@PathVariable("idd") Integer idd,
                                                         @RequestParam String subject,
                                                         @RequestParam String body,
                                                         @RequestParam("files") MultipartFile[] files) {
        return ResponseEntity.ok(demandeService.accepterEtEnvoyerMail(idd, subject, body, files));
    }

    @PostMapping("/profil/demandes")
    public ResponseEntity<String> creerDemande(@RequestBody CreerDemandeRequest request) {
        Etudiant etudiant = etudiantRepository.findByApogeeAndUsernameAndCin(request.getApogee(), request.getUsername(), request.getCin());
        //        System.out.println("HHHHHHHHHH"+etudiant);
        return ResponseEntity.ok(demandeService.creerDemande(etudiant, request.getTypeDocument(), request.getDateDemande()));
    }

    public static class CreerDemandeRequest {
        private long apogee;
        private String username;
        private String cin;
        private TypeDocument typeDocument;
        private String dateDemande;

        // Getters and setters

        public String getCin() {
            return cin;
        }

        public void setCin(String cin) {
            this.cin = cin;
        }

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

        public TypeDocument getTypeDocument() {
            return typeDocument;
        }

        public void setTypeDocument(TypeDocument typeDocument) {
            this.typeDocument = typeDocument;
        }

        public String getDateDemande() {
            return dateDemande;
        }

        public void setDateDemande(String dateDemande) {
            this.dateDemande = dateDemande;
        }
    }


    @GetMapping("/dashboard/demandes/{id}")
    public ResponseEntity<Demande> getDemandeById(@PathVariable Integer id) {
        Demande demande = demandeService.getById(id);
        return ResponseEntity.ok(demande);
    }

    @GetMapping("/dashboard/demandes")
    public ResponseEntity<List<Demande>> getAllDemandes() {
        List<Demande> demandes = demandeService.getAllDemandes();
        return ResponseEntity.ok().body(demandes);
    }

    @GetMapping("/dashboard/demandes/statut")
    public ResponseEntity<List<Demande>> rechercherDemandesParStatut(@RequestParam String statut) {
        List<Demande> demandes = demandeService.rechercherDemandesParStatut(statut);
        return ResponseEntity.ok().body(demandes);
    }

//    @PostMapping("/{idd}/accepter")
//    public ResponseEntity<Demande> accepterDemande(@PathVariable("idd") Integer idd) {
//        Demande demande = demandeService.accepteDemande(idd);
//        return ResponseEntity.ok().body(demande);
//    }

    @PatchMapping("/dashboard/demandes/{idd}/refuser")
    public ResponseEntity<String> refuserDemande(@PathVariable("idd") Integer idd) {

        return ResponseEntity.ok(demandeService.refuseDemande(idd));
    }

    @PatchMapping("/dashboard/demandes/{demandeId}/mettre-a-jourStatut")
    public ResponseEntity<Demande> mettreAJourStatutDemande(@PathVariable Integer demandeId, @RequestParam String nouveauStatut) {
        Demande demande = demandeService.mettreAJourStatutDemande(demandeId, nouveauStatut);
        return ResponseEntity.ok().body(demande);
    }
    @GetMapping("/dashboard/demandes/acceptees")
    public ResponseEntity<List<Demande>> getDemandesAcceptees() {
        List<Demande> demandesAcceptees = demandeService.rechercherDemandesParStatut("Accepté");
        return ResponseEntity.ok(demandesAcceptees);
    }
    @GetMapping("/dashboard/demandes/refusees")
    public ResponseEntity<List<Demande>> getDemandesRefusees() {
        List<Demande> demandesRefusees = demandeService.rechercherDemandesParStatut("Refusé");
        return ResponseEntity.ok(demandesRefusees);
    }
    @GetMapping("/dashboard/demandes/en-cours")
    public ResponseEntity<List<Demande>> getDemandesEnAttente() {
        List<Demande> demandesEnAttente = demandeService.rechercherDemandesParStatut("En attente");
        return ResponseEntity.ok(demandesEnAttente);
    }
    @GetMapping("demandes/nombre")
    public long nombreTotalDemandes() {
        return demandeService.nombreDemandes();
    }





}
