package com.pfe.gestionEtablissement.dtos;

import com.pfe.gestionEtablissement.model.Module;
import com.pfe.gestionEtablissement.model.Semestre;

public record ModuleDto(
        Integer id,
        String nom

) {
    public ModuleDto(Module module) {
        this(module.getId(), module.getNom());

    }
}
