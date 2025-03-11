package com.pfe.gestionEtablissement.dtos;

public record FiliereDto(
        Integer id,
        String nom,
        String description,
        byte[] image
) {
}
