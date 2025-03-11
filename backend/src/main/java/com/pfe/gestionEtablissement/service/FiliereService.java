package com.pfe.gestionEtablissement.service;

import com.pfe.gestionEtablissement.model.Filiere;
import com.pfe.gestionEtablissement.repository.FiliereRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class FiliereService {
    @Autowired
    private FiliereRepository filiereRepository;
    public String ajouterFiliere(String nom, String descreption, MultipartFile image) throws IOException {
    Filiere filiere=new Filiere();
    filiere.setNom(nom);
    filiere.setDescreption(descreption);
    filiere.setImage(image.getBytes());
     filiereRepository.save(filiere);
     return "{\"message\":\"Filiere ajouté avec succès\"}";
    }
    public List<Filiere> getAllFilieres() {
        return filiereRepository.findAll();
    }
    public Filiere getFiliereById(Integer id){
        return filiereRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Filiere non trouvé avec id"+id));
    }

    public String updateFiliere(Integer filiereId, String nom, String descreption, MultipartFile image) throws IOException {
        Optional<Filiere> optionalFiliere = filiereRepository.findById(filiereId);
        if (optionalFiliere.isPresent()) {
            Filiere filiere = optionalFiliere.get();
            filiere.setNom(nom);
            filiere.setDescreption(descreption);
            filiere.setImage(image.getBytes());
            filiereRepository.save(filiere);
            return "{\"message\":\"Filiere modifiée avec succès\"}";
        } else {
            throw new RuntimeException("Filiere n'existe pas");
        }
    }

    public String deleteFiliereById(Integer id) {
        if (filiereRepository.existsById(id)) {
            filiereRepository.deleteById(id);
            return "{\"message\":\"Filiere supprimée avec succès \"}";
        } else {
            return "{\"erreur\":\"Filiere n'existe pas \"}";

        }
    }
    public long nombreFilieres() {
        return filiereRepository.count();
    }


}
