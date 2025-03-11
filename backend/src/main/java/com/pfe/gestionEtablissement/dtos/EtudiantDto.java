package com.pfe.gestionEtablissement.dtos;

import com.pfe.gestionEtablissement.model.Etudiant;
import com.pfe.gestionEtablissement.model.Role;
import com.pfe.gestionEtablissement.model.Semestre;

import java.util.List;
import java.util.stream.Collectors;

public record EtudiantDto(
        Integer id,
        String firstName,
        String lastName,
        String username,
        String password,
        Role role,
        long apogee,
        String cin,
        String cne,
        String dateNaissance
) {
    public EtudiantDto(Etudiant etudiant) {
        this(
                etudiant.getId(),
                etudiant.getFirstName(),
                etudiant.getLastName(),
                etudiant.getUsername(),
                etudiant.getPassword(),
                etudiant.getRole(),
                etudiant.getApogee(),
                etudiant.getCin(),
                etudiant.getCne(),
                etudiant.getDateNaissance()
        );
    }
    private static List<SemestreDto> convertSemestresToDTOs(List<Semestre> semestres) {
        return semestres.stream()
                .map(SemestreDto::new)
                .collect(Collectors.toList());
    }
}
