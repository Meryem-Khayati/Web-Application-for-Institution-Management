package com.pfe.gestionEtablissement.repository;

import com.pfe.gestionEtablissement.model.Filiere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FiliereRepository extends JpaRepository<Filiere,Integer> {
    Filiere findByNom(String nomFiliere);
//    Filiere findByNom(String nomFiliere);
//
//    List<Filiere> findByNomAndSemestreAndAnneeUniversitaire(String filiereNom, SemestreEnum semestre, String anneeUniversitaire);
//    List<Filiere> findBySemestre(SemestreEnum semestre);
//
//    List<Filiere> findBySemestreAndAnneeUniversitaire(SemestreEnum semestre, String annee);
}
