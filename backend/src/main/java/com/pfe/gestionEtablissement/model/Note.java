package com.pfe.gestionEtablissement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private float valeur;
    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name = "module_id")
    private Module module;
    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name = "etudiant_id")
    private Etudiant etudiant;
}
