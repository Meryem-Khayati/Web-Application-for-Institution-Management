package com.pfe.gestionEtablissement.dtos;

import com.pfe.gestionEtablissement.enumeration.TypeDocument;
import com.pfe.gestionEtablissement.model.Demande;

public record DemandeDto(
        Integer idD,
        String dateDemande,
        String statut,
        TypeDocument typeDocument,
        EtudiantDto etudiant
) {
    public DemandeDto(Demande demande) {
        this(
                demande.getIdD(),
                demande.getDateDemande(),
                demande.getStatut(),
                demande.getTypeDocument(),
                new EtudiantDto(demande.getEtudiant())
        );
    }

}
