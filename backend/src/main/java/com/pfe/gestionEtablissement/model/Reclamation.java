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
@Builder
public class Reclamation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idrec;
    private String dateReclamation;
    private String statut;
    @Enumerated(EnumType.STRING)
    private TypeDocument typeDocument;
    @ManyToOne
    @JoinColumn(name = "etudiant_id")
    private Etudiant etudiant;
    private String message;
}
