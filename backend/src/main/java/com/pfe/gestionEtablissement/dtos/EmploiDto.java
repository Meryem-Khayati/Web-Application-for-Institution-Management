package com.pfe.gestionEtablissement.dtos;

import com.pfe.gestionEtablissement.model.EmploiDeTemps;

public record EmploiDto(
        Integer id,
        byte[] file
) {
    public EmploiDto(EmploiDeTemps emploiDeTemps) {
        this(emploiDeTemps.getId(), emploiDeTemps.getFile());
    }
}
