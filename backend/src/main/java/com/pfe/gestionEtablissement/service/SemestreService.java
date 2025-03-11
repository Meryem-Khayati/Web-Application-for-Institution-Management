package com.pfe.gestionEtablissement.service;

import com.pfe.gestionEtablissement.dtos.SemestreDto;
import com.pfe.gestionEtablissement.model.Filiere;
import com.pfe.gestionEtablissement.model.Semestre;
import com.pfe.gestionEtablissement.repository.FiliereRepository;
import com.pfe.gestionEtablissement.repository.SemestreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SemestreService {
    @Autowired
    private SemestreRepository semestreRepository;
    @Autowired
    private FiliereRepository filiereRepository;

    public String ajouterSemestre(Integer fId, Semestre semestre) {
        Filiere filiere = new Filiere(fId);
        semestre.setFiliere(filiere);
        semestreRepository.save(semestre);
        return "{\"message\":\"Semestre ajouté avec succès\"}";

    }

    private SemestreDto toSemestreDto(Semestre semestre) {
        return new SemestreDto(semestre);
    }

    public List<SemestreDto> findAllSemestres(Integer fId, String anneeUniversitaire) {
        return semestreRepository.findAllByFiliereIdAndAnneeUniversitaire(fId, anneeUniversitaire)
                .stream()
                .map(this::toSemestreDto)
                .collect(Collectors.toList());

    }
    public SemestreDto findSemestreById(Integer semestreId) {
        Semestre semestre = semestreRepository.findById(semestreId)
                .orElseThrow(() -> new RuntimeException("Semestre not found"));
        return toSemestreDto(semestre);
    }




    public String deleteSemestre(Integer id) {
        if (semestreRepository.existsById(id)) {
            semestreRepository.deleteById(id);
            return "{\"message\":\"Semestre supprimé avec succès\"}";
        } else {
            return "{\"erreur\":\"Semestre n'existe pas\"}";

        }

    }

    public String updateSemetstre(Integer sId, Semestre semestre) {
        Semestre existsemestre = semestreRepository.findById(sId).orElse(null);
        if (existsemestre != null) {
            if (semestre.getNom() != null && !semestre.getNom().isEmpty()) {
                existsemestre.setNom(semestre.getNom());
            }
            if (semestre.getAnneeUniversitaire() != null && !semestre.getAnneeUniversitaire().isEmpty()) {
                existsemestre.setAnneeUniversitaire(semestre.getAnneeUniversitaire());
            }
            semestreRepository.save(existsemestre);
            return "{\"message\":\"Semestre modifié avec succès\"}";
        }
        else{
            return "{\"erreur\":\"semestre n'existe pas\"}";
        }



    }
    }

