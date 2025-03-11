package com.pfe.gestionEtablissement.service;

import com.pfe.gestionEtablissement.model.Annonce;
import com.pfe.gestionEtablissement.repository.AnnonceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnnonceService {

    @Autowired
    private AnnonceRepository annonceRepository;

    public List<Annonce> getAllAnnonces() {
        return annonceRepository.findAll();
    }

    public Annonce getAnnonceById(Long id) {
        return annonceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Annonce not found with id: " + id));
    }

    public String saveAnnonce(Annonce annonce) {
        try {
             annonceRepository.save(annonce);
            return "{\"message\":\"Annonce  ajoutée avec succès\"}";
        }catch(Exception e){
            return "{\"erreur\":\"Erreur lors de l'ajout de l'annonce \"}";
        }
    }

    public String deleteAnnonce(Long id) {
        if (!annonceRepository.existsById(id)) {
            return "{\"erreur\":\"Annonce n'existe pas \"}";
        }
        annonceRepository.deleteById(id);
        return "{\"message\":\"Annonce supprimée avec succès \"}";
    }
    public String updateAnnonce(Long id, Annonce updatedAnnonce) {
        Optional<Annonce> existingAnnonceOptional = annonceRepository.findById(id);
        if (existingAnnonceOptional.isPresent()) {
            Annonce existingAnnonce = existingAnnonceOptional.get();
            existingAnnonce.setTitre(updatedAnnonce.getTitre());
            existingAnnonce.setDescription(updatedAnnonce.getDescription());
            existingAnnonce.setDatePublication(updatedAnnonce.getDatePublication());
            existingAnnonce.setFichiers(updatedAnnonce.getFichiers());
             annonceRepository.save(existingAnnonce);
            return "{\"message\":\"Annonce modifiée avec succès \"}";

        } else {
            return "{\"erreur\":\"Annonce n'existe pas \"}";
        }
    }
    public long nombreAnnonces() {
        return annonceRepository.count();
    }

}
