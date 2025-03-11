package com.pfe.gestionEtablissement.service;

import com.pfe.gestionEtablissement.dtos.EmploiDto;
import com.pfe.gestionEtablissement.dtos.ModuleDto;
import com.pfe.gestionEtablissement.model.EmploiDeTemps;
import com.pfe.gestionEtablissement.model.Filiere;
import com.pfe.gestionEtablissement.model.Module;
import com.pfe.gestionEtablissement.model.Semestre;
import com.pfe.gestionEtablissement.repository.FiliereRepository;
import com.pfe.gestionEtablissement.repository.ModuleRepository;
import com.pfe.gestionEtablissement.repository.SemestreRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class ModuleService {

    @Autowired
    private SemestreRepository semestreRepository;
    @Autowired
    private ModuleRepository moduleRepository;

    public String ajouterModule(Integer sId, Module module) throws IOException {
        if(semestreRepository.existsById(sId)){
            Semestre semestre =new Semestre(sId);
           Module newModule=new Module();
            newModule.setNom(module.getNom());
            newModule.setSemestre(semestre);
            moduleRepository.save(newModule);
            return "{\"message\":\"Module ajouté avec succès\"}";
        }
        else{
            return "{\"erreur\":\"Semestre n'existe pas\"}";

        }
    }
    public String modifierModule(Integer idModule, Module module) throws IOException {
        if (moduleRepository.existsById(idModule) ) {
            Module existModule = moduleRepository.getById(idModule);
            existModule.setNom(module.getNom());
            moduleRepository.save(existModule);
            return "{\"message\":\"Module modifié avec succès\"}";
        } else {
            return "{\"erreur\":\"Module  n'existe pas\"}";
        }
    }

    public ModuleDto findModuleById(Integer moduleId) {
        Module module=moduleRepository.findById(moduleId).orElseThrow(()->new EntityNotFoundException("Module not found with id "+ moduleId));
        return toModuleDto(module);
    }
    private ModuleDto toModuleDto(Module module) {
        return new ModuleDto(module);
    }
    public List<ModuleDto> findAllModules(Integer sId) {
        return moduleRepository.findAllBySemestreId(sId)
                .stream()
                .map(this::toModuleDto)
                .collect(Collectors.toList());
    }
    public String supprimerModule(Integer idModule) {
        if (moduleRepository.existsById(idModule)) {
            moduleRepository.deleteById(idModule);
            return "{\"message\":\"Module supprimé avec succès\"}";
        } else {
            return "{\"erreur\":\"Module  n'existe pas\"}";
        }
    }

    public long nombreModules() {
        return moduleRepository.countDistinctModules();
    }

}


