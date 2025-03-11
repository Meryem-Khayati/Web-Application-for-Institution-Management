package com.pfe.gestionEtablissement.dtos;

import com.pfe.gestionEtablissement.model.Semestre;

public record SemestreDto(
       Integer id,
       String nom,
       String anneeUniversitaire

) {
    public SemestreDto(Semestre semestre) {
        this(semestre.getId(), semestre.getNom(), semestre.getAnneeUniversitaire());

    }
}
