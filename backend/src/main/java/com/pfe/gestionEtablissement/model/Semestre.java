package com.pfe.gestionEtablissement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Semestre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nom;
    private String anneeUniversitaire;
    @ManyToOne
    private Filiere filiere;
    @ManyToMany(mappedBy = "semestres")
    @JsonIgnore
    private List<Etudiant> etudiants ;
    @OneToOne(mappedBy = "semestre")
    @JsonIgnore
    private EmploiDeTemps emploiDeTemps;
    @OneToMany(mappedBy = "semestre")
    @JsonIgnore
    private List<Module> modules ;

    public Semestre(Integer sId) {
        this.id=sId;
    }

}
