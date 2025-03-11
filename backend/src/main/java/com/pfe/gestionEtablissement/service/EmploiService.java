package com.pfe.gestionEtablissement.service;

import com.pfe.gestionEtablissement.dtos.EmploiDto;
import com.pfe.gestionEtablissement.dtos.EtudiantDto;
import com.pfe.gestionEtablissement.model.EmploiDeTemps;
import com.pfe.gestionEtablissement.model.Etudiant;
import com.pfe.gestionEtablissement.model.Filiere;
import com.pfe.gestionEtablissement.model.Semestre;
import com.pfe.gestionEtablissement.repository.EmploiRepository;
import com.pfe.gestionEtablissement.repository.FiliereRepository;
import com.pfe.gestionEtablissement.repository.SemestreRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmploiService {

    @Autowired
    private EmploiRepository emploiRepository;
    @Autowired
    private SemestreRepository semestreRepository;
    public String ajouterEmploi(Integer sId, MultipartFile file) throws IOException {
        if(semestreRepository.existsById(sId)){
            Semestre semestre=new Semestre(sId);
            EmploiDeTemps emploiDeTemps=new EmploiDeTemps();
            emploiDeTemps.setFile(file.getBytes());
            emploiDeTemps.setSemestre(semestre);
            emploiRepository.save(emploiDeTemps);
        return "{\"message\":\"Emploi de Temps  ajouté avec succès\"}";
        }
        else{
            return "{\"erreur\":\"Semestre n'existe pas\"}";

        }
    }
    public String modifierEmploi(Integer idEmploi, MultipartFile fichier) throws IOException {
        if (emploiRepository.existsById(idEmploi) ) {
            EmploiDeTemps emploiDeTemps = emploiRepository.getById(idEmploi);
            emploiDeTemps.setFile(fichier.getBytes());
            emploiRepository.save(emploiDeTemps);
            return "{\"message\":\"Emploi de Temps modifié avec succès\"}";
        } else {
            return "{\"erreur\":\"L'emploi de temps  n'existe pas\"}";
        }
    }

    public EmploiDto findEmploiById(Integer emploiId) {
        EmploiDeTemps emploiDeTemps=emploiRepository.findById(emploiId).orElseThrow(()->new EntityNotFoundException("Emploi not found with id "+ emploiId));
        return toEmploiDto(emploiDeTemps);
    }
    private EmploiDto toEmploiDto(EmploiDeTemps emploiDeTemps) {
        return new EmploiDto(emploiDeTemps);
    }
    public List<EmploiDto> findAllEmploiDeTemps(Integer sId) {
       return emploiRepository.findAllEmploiBySemestreId(sId)
               .stream()
               .map(this::toEmploiDto)
               .collect(Collectors.toList());
 }
    public String supprimerEmploi(Integer idEmploi) {
        if (emploiRepository.existsById(idEmploi)) {
            emploiRepository.deleteById(idEmploi);
            return "{\"message\":\"Emploi de Temps supprimé avec succès\"}";
        } else {
            return "{\"erreur\":\"L'emploi de temps n'existe pas\"}";
        }
    }
    public EmploiDeTemps getEmploiById(Integer id){
        return emploiRepository.findById(id).orElseThrow(()->new EntityNotFoundException("vide"));
    }





}
