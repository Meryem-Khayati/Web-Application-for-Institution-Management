package com.pfe.gestionEtablissement.dtos;

import com.pfe.gestionEtablissement.model.Note;
import com.pfe.gestionEtablissement.model.Semestre;

public record NoteDto(
        Integer id,
        float valeur,
        long apogee
) {
    public NoteDto(Note note) {
        this(note.getId(), note.getValeur(),note.getEtudiant().getApogee());

    }
}
