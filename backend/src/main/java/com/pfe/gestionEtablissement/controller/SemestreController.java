package com.pfe.gestionEtablissement.controller;

import com.pfe.gestionEtablissement.dtos.SemestreDto;
import com.pfe.gestionEtablissement.model.Semestre;
import com.pfe.gestionEtablissement.service.SemestreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SemestreController {

    @Autowired
    private SemestreService semestreService;

    @PostMapping("/dashboard/filieres/{fId}/semestres")
    public ResponseEntity<String> ajouterSemestre(@PathVariable Integer fId, @RequestBody Semestre semestre) {
        try {
            return ResponseEntity.ok(semestreService.ajouterSemestre(fId, semestre));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"erreur\":\"" + e.getMessage() + "\"}");
        }

    }

    @GetMapping("/filieres/{fId}/semestres")
    public ResponseEntity<List<SemestreDto>> getAllSemestres(@PathVariable Integer fId, @RequestParam("annee") String anneeUniversitaire) {
        return ResponseEntity.ok(semestreService.findAllSemestres(fId, anneeUniversitaire));
    }

    @GetMapping("/filieres/{fId}/semestres/{semestreId}")
    public ResponseEntity<SemestreDto> getSemestreById(@PathVariable Integer semestreId) {
        SemestreDto semestreDto = semestreService.findSemestreById(semestreId);
        return ResponseEntity.ok(semestreDto);
    }


    @DeleteMapping("/dashboard/filieres/{fId}/semestres/{sId}")
    public ResponseEntity<String> deleteSemestre(@PathVariable Integer sId) {
        return ResponseEntity.ok(semestreService.deleteSemestre(sId));
    }

    @PatchMapping("/dashboard/filieres/{fId}/semestres/{sId}")
    public ResponseEntity<String> updateSemestre(@PathVariable Integer sId, @RequestBody Semestre semestre) {
        return ResponseEntity.ok(semestreService.updateSemetstre(sId, semestre));
    }



}
