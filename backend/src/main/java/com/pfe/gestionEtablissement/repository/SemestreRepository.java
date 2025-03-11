package com.pfe.gestionEtablissement.repository;

import com.pfe.gestionEtablissement.model.Semestre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SemestreRepository extends JpaRepository<Semestre,Integer> {
    List<Semestre> findByNom(String nomSemestre);

    Semestre findByNomAndFiliereNomAndAnneeUniversitaire(String nomSemestre, String nomFiliere, String anneeUniversitaire);
    List<Semestre> findAllByFiliereIdAndAnneeUniversitaire(Integer fId, String anneeUniversitaire);

    Optional<Semestre> findByIdAndFiliereId(Integer sId, Integer fId);
}
