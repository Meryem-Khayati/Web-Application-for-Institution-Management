package com.pfe.gestionEtablissement.repository;

import com.pfe.gestionEtablissement.model.Reclamation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReclamationRepository extends JpaRepository<Reclamation,Integer> {
    List<Reclamation> findByStatut(String statut);
}
