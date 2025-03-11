package com.pfe.gestionEtablissement.model;

import com.pfe.gestionEtablissement.enumeration.TypeDocument;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Demande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idD;
    private String dateDemande;
    private String statut;
    @Enumerated(EnumType.STRING)
    private TypeDocument typeDocument;
    @ManyToOne
    @JoinColumn(name = "etudiant_id")
    private Etudiant etudiant;
}
