package com.pfe.gestionEtablissement.service;

import com.pfe.gestionEtablissement.model.Demande;
import com.pfe.gestionEtablissement.repository.DemandeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AdminService {
    @Autowired
    private DemandeRepository demandeRepository;




}
