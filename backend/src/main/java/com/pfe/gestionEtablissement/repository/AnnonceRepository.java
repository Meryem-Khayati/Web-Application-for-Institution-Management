package com.pfe.gestionEtablissement.repository;

import com.pfe.gestionEtablissement.model.Annonce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnnonceRepository extends JpaRepository<Annonce,Long> {

    Annonce findByTitre(String titreAnnonce);
}
