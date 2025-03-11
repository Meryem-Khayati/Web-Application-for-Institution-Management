package com.pfe.gestionEtablissement.controller;

import com.pfe.gestionEtablissement.dtos.*;
import com.pfe.gestionEtablissement.model.*;
import com.pfe.gestionEtablissement.model.Module;
import com.pfe.gestionEtablissement.service.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/dashboard")
public class AdminController {
    private final NoteService noteService;
    private final FiliereService filiereService;
    private final EmploiService emploiService;
    private final ModuleService moduleService;
    private final SemestreService semestreService;
    private final AuthenticationService authenticationService;

    public AdminController(NoteService noteService, FiliereService filiereService, EmploiService emploiService, ModuleService moduleService, SemestreService semestreService, AuthenticationService authenticationService) {
        this.noteService = noteService;
        this.filiereService = filiereService;
        this.emploiService = emploiService;
        this.moduleService = moduleService;
        this.semestreService = semestreService;
        this.authenticationService = authenticationService;
    }









}




























































