package com.pfe.gestionEtablissement.controller;

import com.pfe.gestionEtablissement.dtos.EtudiantDetails;
import com.pfe.gestionEtablissement.dtos.EtudiantDto;
import com.pfe.gestionEtablissement.model.AuthenticationResponse;
import com.pfe.gestionEtablissement.model.Etudiant;
import com.pfe.gestionEtablissement.model.Semestre;
import com.pfe.gestionEtablissement.repository.EtudiantRepository;
import com.pfe.gestionEtablissement.repository.SemestreRepository;
import com.pfe.gestionEtablissement.service.EtudiantService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@CrossOrigin("http://localhost:3000")
@RestController
public class EtudiantController {
    private final EtudiantRepository etudiantRepository;
    private final SemestreRepository semestreRepository;
    private final EtudiantService etudiantService;

    public EtudiantController(EtudiantRepository etudiantRepository, SemestreRepository semestreRepository, EtudiantService etudiantService) {
        this.etudiantRepository = etudiantRepository;
        this.semestreRepository = semestreRepository;
        this.etudiantService = etudiantService;
    }

    @PostMapping("/dashboard/filieres/{fId}/semestres/{sId}/etudiants")
    public ResponseEntity<AuthenticationResponse> ajouterEtudiant(@PathVariable Integer sId, @RequestBody Etudiant etudiant) {
        return ResponseEntity.ok(etudiantService.registerEtd(sId, etudiant));
    }

    @PatchMapping("/dashboard/filieres/{fId}/semestres/{sId}/etudiants/{id}")
    public ResponseEntity<AuthenticationResponse> updateEtudiant(@PathVariable("id") Integer etudiantId, @RequestBody Etudiant etudiant) {
        return ResponseEntity.ok(etudiantService.updateEtudiant(etudiantId, etudiant));
    }

    @GetMapping("/dashboard/filieres/{fId}/semestres/{sId}/etudiants")
    public ResponseEntity<List<EtudiantDto>> getAllEtudiants(@PathVariable Integer sId) {
        List<EtudiantDto> etudiants = etudiantService.findAllEtudiants(sId);
        return ResponseEntity.ok(etudiants);
    }

    @DeleteMapping("/dashboard/filieres/{fId}/semestres/{sId}/etudiants/{id}")
    public ResponseEntity<String> deleteEtudiant(@PathVariable("id") Integer etudiantId) {
        return ResponseEntity.ok(etudiantService.deleteEtudiant(etudiantId));

    }

    @GetMapping("/dashboard/filieres/{fId}/semestres/{sId}/etudiants/{etudiantId}")
    public ResponseEntity<EtudiantDto> getEtudiantById(@PathVariable Integer etudiantId) {
        EtudiantDto etudiantDto = etudiantService.findEtudiantById(etudiantId);
        return ResponseEntity.ok(etudiantDto);
    }
    @GetMapping("/{id}/details")
    public ResponseEntity<EtudiantDetails> getEtudiantDetailsById(@PathVariable("id") Integer etudiantId) {
        EtudiantDetails etudiantDetails = etudiantService.getEtudiantDetailsById(etudiantId);
        if (etudiantDetails != null) {
            return ResponseEntity.ok(etudiantDetails);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/profil/etudiants/{apogee}/infos-avec-notes")
    public List<Map<String, Object>> getInfosEtudiantAvecNotes(@PathVariable long apogee) {
        Etudiant etudiant = etudiantService.getEtudiantByApogee(apogee); // Obtenez l'objet Etudiant par son apogée
        if (etudiant == null) {
            throw new EntityNotFoundException("Étudiant non trouvé pour l'apogée : " + apogee);
        }
        return etudiantService.getInfosEtudiantAvecNotes(etudiant);
    }
    @PutMapping("/{idEtudiant}/changer-semestre")
    public ResponseEntity<String> changerSemestre(@PathVariable("idEtudiant") Integer idEtudiant, @RequestParam("nouveauSemestre") Integer idNouveauSemestre) {
        Etudiant etudiant = etudiantRepository.findById(idEtudiant).orElse(null);
        if (etudiant == null) {
            return ResponseEntity.notFound().build();
        }

        Semestre nouveauSemestre = semestreRepository.findById(idNouveauSemestre).orElse(null);
        if (nouveauSemestre == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok( etudiantService.changerSemestre(etudiant, nouveauSemestre));
    }
    @GetMapping("etudiants/nombre")
    public long nombreTotalEtudiants() {
        return etudiantService.nombreEtudiants();
    }

}
