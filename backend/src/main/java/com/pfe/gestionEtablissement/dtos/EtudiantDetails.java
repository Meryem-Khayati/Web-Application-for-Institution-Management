package com.pfe.gestionEtablissement.dtos;

import com.pfe.gestionEtablissement.model.Etudiant;
import com.pfe.gestionEtablissement.model.Filiere;
import com.pfe.gestionEtablissement.model.Semestre;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EtudiantDetails {
    private Etudiant etudiant;
    private Filiere filiere;
    private Semestre semestre;
}
