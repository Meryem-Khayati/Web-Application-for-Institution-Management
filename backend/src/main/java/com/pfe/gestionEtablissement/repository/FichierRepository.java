package com.pfe.gestionEtablissement.repository;

import com.pfe.gestionEtablissement.model.Fichier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FichierRepository extends JpaRepository<Fichier,Integer> {
}
