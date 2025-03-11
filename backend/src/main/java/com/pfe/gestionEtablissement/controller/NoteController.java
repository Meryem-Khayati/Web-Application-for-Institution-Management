package com.pfe.gestionEtablissement.controller;

import com.pfe.gestionEtablissement.dtos.NoteDto;
import com.pfe.gestionEtablissement.model.Note;
import com.pfe.gestionEtablissement.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class NoteController {
    @Autowired
    private NoteService noteService;

    @PostMapping("/dashboard/filieres/{fId}/semestres/{sId}/modules/{idModule}/notes")
    public ResponseEntity<String> ajouterNote(@PathVariable Integer idModule,@RequestParam long apogee,@RequestParam float note){
        return ResponseEntity.ok(noteService.ajouterNote(idModule,apogee,note));

    }
    @PatchMapping("/dashboard/filieres/{fId}/semestres/{sId}/modules/{idModule}/notes/{noteId}")
    public ResponseEntity<String> updateNote(@PathVariable Integer noteId, @RequestParam float note) {
        return ResponseEntity.ok(noteService.updateNote(noteId, note));
    }

    @GetMapping("/dashboard/filieres/{fId}/semestres/{sId}/modules/{idModule}/notes/{noteId}")
    public ResponseEntity<NoteDto> findNoteById(@PathVariable Integer noteId) {
        NoteDto noteDto = noteService.findNoteById(noteId);
        return ResponseEntity.ok(noteDto);
    }

    @GetMapping("/dashboard/filieres/{fId}/semestres/{sId}/modules/{moduleId}/notes")
    public ResponseEntity<List<NoteDto>> findAllNotesByModuleId(@PathVariable Integer moduleId) {
        List<NoteDto> notes = noteService.findAllNotes(moduleId);
        return ResponseEntity.ok(notes);
    }

    @DeleteMapping("/dashboard/filieres/{fId}/semestres/{sId}/modules/{idModule}/notes/{noteId}")
    public ResponseEntity<String> supprimerNote(@PathVariable Integer noteId) {
        return ResponseEntity.ok(noteService.supprimerNote(noteId));
    }
}
