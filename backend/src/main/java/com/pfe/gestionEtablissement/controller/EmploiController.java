package com.pfe.gestionEtablissement.controller;

import com.pfe.gestionEtablissement.dtos.EmploiDto;
import com.pfe.gestionEtablissement.model.EmploiDeTemps;
import com.pfe.gestionEtablissement.model.Filiere;
import com.pfe.gestionEtablissement.service.EmploiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class EmploiController {

        @Autowired
        private EmploiService emploiService;

    //------------------------------Emploi de Temps------------------------------

    @PostMapping("/dashboard/filieres/{fId}/semestres/{sId}/emplois")
    public ResponseEntity<String> ajouterEmploi(@PathVariable Integer sId, @RequestParam MultipartFile file) throws IOException {
        return ResponseEntity.ok(emploiService.ajouterEmploi(sId,file));
    }

    @PatchMapping("/dashboard/filieres/{fId}/semestres/{sId}/emplois/{id}")
    public ResponseEntity<String> updateEmploi(@PathVariable("id") Integer emploiId, @RequestParam MultipartFile file) throws IOException {
        return ResponseEntity.ok(emploiService.modifierEmploi(emploiId, file));

    }
    @GetMapping("/filieres/{fId}/semestres/{sId}/emplois/{emploiId}")
    public ResponseEntity<EmploiDto> getEmploiById(@PathVariable Integer emploiId) {
        EmploiDto emploiDto = emploiService.findEmploiById(emploiId);
        return ResponseEntity.ok(emploiDto);
    }
    @GetMapping("/filieres/{fId}/semestres/{sId}/emplois")
    public ResponseEntity<List<EmploiDto>> getListEmploi(@PathVariable Integer sId) {
        List<EmploiDto> emploiDtos = emploiService.findAllEmploiDeTemps(sId);
        return ResponseEntity.ok(emploiDtos);
    }
    @GetMapping("/dashboard/filieres/{fId}/semestres/{sId}/emplois/lire/{id}")
    public ResponseEntity<byte[]> lireFichierEmploiDeTemps(@PathVariable("id") Integer id) {
        EmploiDeTemps emploiDeTemps = emploiService.getEmploiById(id);
        byte[] fileBytes = emploiDeTemps.getFile();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF); // Définir le type MIME du fichier (PDF, image, etc.)

        return new ResponseEntity<>(fileBytes, headers, HttpStatus.OK);
    }
    @DeleteMapping("/dashboard/filieres/{fId}/semestres/{sId}/emplois/{idEmploi}")
    public ResponseEntity<String> supprimerEmploi(@PathVariable Integer idEmploi) {
        String message = emploiService.supprimerEmploi(idEmploi);
        return ResponseEntity.ok(message);
    }

}
