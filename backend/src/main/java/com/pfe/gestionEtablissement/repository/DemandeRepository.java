package com.pfe.gestionEtablissement.repository;

import com.pfe.gestionEtablissement.model.Demande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface DemandeRepository extends JpaRepository<Demande,Integer> {
    List<Demande> findByStatut(String statut);
}

