package com.pfe.gestionEtablissement.service;

import com.pfe.gestionEtablissement.model.Annonce;
import com.pfe.gestionEtablissement.model.Fichier;
import com.pfe.gestionEtablissement.repository.AnnonceRepository;
import com.pfe.gestionEtablissement.repository.FichierRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class FichierService {
    @Autowired
    private AnnonceRepository annonceRepository;

    @Autowired
    private FichierRepository fichierRepository;

    public String ajouterFichierAAnnonce(Long annonceId,String type, MultipartFile file) throws IOException {
        Optional<Annonce> optionalAnnonce = annonceRepository.findById(annonceId);
        if (optionalAnnonce.isPresent()) {
            Annonce annonce = optionalAnnonce.get();

            Fichier fichier = new Fichier();
            fichier.setType(type);
            fichier.setFile(file.getBytes());
            fichier.setAnnonce(annonce);
            fichierRepository.save(fichier);
            annonce.getFichiers().add(fichier);
            annonceRepository.save(annonce);
            return "{\"message\":\"Fichier ajouté avec succès \"}";
        } else {
            return "{\"erreur\":\"Annonce non trouvée \" }";
        }
    }
    public String mettreAJourFichierDeAnnonce(Long annonceId, Integer fichierId,String type, MultipartFile nouveauFichier) throws IOException {
        Optional<Annonce> optionalAnnonce = annonceRepository.findById(annonceId);
        if (optionalAnnonce.isPresent()) {
            Annonce annonce = optionalAnnonce.get();
            Optional<Fichier> optionalFichier = fichierRepository.findById(fichierId);
            if (optionalFichier.isPresent()) {
                Fichier fichier = optionalFichier.get();
                fichier.setFile(nouveauFichier.getBytes());
                fichier.setType(type);
                fichierRepository.save(fichier);
                return "{\"message\":\"Fichier modifié avec succès \"}";
            } else {
                return "{\"erreur\":\"Fichier non trouvée \" }";
            }
        } else {
            return "{\"erreur\":\"Annonce non trouvée \" }";
        }
    }
    public String supprimerFichierDeAnnonce(Long annonceId, Integer fichierId) {
        Optional<Annonce> optionalAnnonce = annonceRepository.findById(annonceId);
        if (optionalAnnonce.isPresent()) {
            Annonce annonce = optionalAnnonce.get();
            Optional<Fichier> optionalFichier = fichierRepository.findById(fichierId);
            if (optionalFichier.isPresent()) {
                Fichier fichier = optionalFichier.get();
                annonce.getFichiers().remove(fichier);
                annonceRepository.save(annonce);
                fichierRepository.delete(fichier);
                return "{\"message\":\"Fichier supprimé avec succès \"}";

            } else {
                return "{\"erreur\":\"Fichier non trouvée \" }";
            }
        } else {
            return "{\"erreur\":\"Annonce non trouvée \" }";
        }
    }
    public List<Fichier> obtenirFichiersDeAnnonce(Long annonceId) {
        Optional<Annonce> optionalAnnonce = annonceRepository.findById(annonceId);
        if (optionalAnnonce.isPresent()) {
            Annonce annonce = optionalAnnonce.get();
            return annonce.getFichiers();
        } else {
            throw new EntityNotFoundException("Annonce non trouvée avec l'ID : " + annonceId);
        }
    }
    public Fichier obtenirFichierDeAnnonce(Long annonceId, Integer fichierId) {
        Optional<Annonce> optionalAnnonce = annonceRepository.findById(annonceId);
        if (optionalAnnonce.isPresent()) {
            Annonce annonce = optionalAnnonce.get();
            Optional<Fichier> optionalFichier = fichierRepository.findById(fichierId);
            if (optionalFichier.isPresent()) {
                return optionalFichier.get();
            } else {
                throw new EntityNotFoundException("Fichier non trouvé avec l'ID : " + fichierId);
            }
        } else {
            throw new EntityNotFoundException("Annonce non trouvée avec l'ID : " + annonceId);
        }
    }




}
