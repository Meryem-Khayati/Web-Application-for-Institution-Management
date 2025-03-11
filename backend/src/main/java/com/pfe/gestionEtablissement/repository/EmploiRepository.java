package com.pfe.gestionEtablissement.repository;

import com.pfe.gestionEtablissement.model.EmploiDeTemps;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmploiRepository extends JpaRepository<EmploiDeTemps,Integer> {
    List<EmploiDeTemps> findAllEmploiBySemestreId(Integer semestreId);

}
