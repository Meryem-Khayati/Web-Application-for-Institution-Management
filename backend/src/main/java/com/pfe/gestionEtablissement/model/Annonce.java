package com.pfe.gestionEtablissement.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Annonce {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String titre;
    private String description;
    private String datePublication;
    @OneToMany(mappedBy = "annonce",fetch = FetchType.EAGER)
    private List<Fichier> fichiers;

}
