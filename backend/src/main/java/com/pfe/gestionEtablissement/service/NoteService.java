package com.pfe.gestionEtablissement.service;

import com.pfe.gestionEtablissement.dtos.EmploiDto;
import com.pfe.gestionEtablissement.dtos.NoteDto;
import com.pfe.gestionEtablissement.model.EmploiDeTemps;
import com.pfe.gestionEtablissement.model.Etudiant;
import com.pfe.gestionEtablissement.model.Module;
import com.pfe.gestionEtablissement.model.Note;
import com.pfe.gestionEtablissement.repository.EtudiantRepository;
import com.pfe.gestionEtablissement.repository.ModuleRepository;
import com.pfe.gestionEtablissement.repository.NoteRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NoteService {
    @Autowired
    private EtudiantRepository etudiantRepository;
    @Autowired
    private ModuleRepository moduleRepository;
    @Autowired
    private NoteRepository noteRepository;
    public String ajouterNote(Integer idModule, Long apogee, float valeur) {
        Module module = moduleRepository.findById(idModule)
                .orElseThrow(() -> new IllegalArgumentException("Module non trouvé avec l'ID: " + idModule));

        Etudiant etudiant = etudiantRepository.findByApogee(apogee)
                .orElseThrow(() -> new IllegalArgumentException("Étudiant non trouvé avec l'Apogee: " + apogee));
        Note note = new Note();
        note.setModule(module);
        note.setEtudiant(etudiant);
        note.setValeur(valeur);
        noteRepository.save(note);
        return "{\"message\":\"Note ajoutée avec succès\"}";

    }

    public String updateNote(Integer noteId, float nouvelleValeur) {
        Optional<Note> noteOptional = noteRepository.findById(noteId);
        Note note = noteOptional.orElseThrow(() ->
                new RuntimeException("Note introuvable avec l'ID : " + noteId));
        note.setValeur(nouvelleValeur);
        noteRepository.save(note);
        return "{\"message\":\"Note modifiée avec succès\"}";
    }

    public String supprimerNote(Integer idNote) {
        Note note = noteRepository.findById(idNote)
                .orElseThrow(() -> new IllegalArgumentException("Note non trouvée avec l'ID: " + idNote));

        noteRepository.delete(note);

        return "{\"message\":\"Note supprimée avec succès\"}";
    }

    public NoteDto findNoteById(Integer noteId) {
        Note note=noteRepository.findById(noteId).orElseThrow(()->new EntityNotFoundException("Note not found with id "+ noteId));
        return toNoteDto(note);
    }

    private NoteDto toNoteDto(Note note) {
        return new NoteDto(note);
    }
    public List<NoteDto> findAllNotes(Integer moduleId) {
        return noteRepository.findAllNotesByModuleId(moduleId)
                .stream()
                .map(this::toNoteDto)
                .collect(Collectors.toList());
    }

}
