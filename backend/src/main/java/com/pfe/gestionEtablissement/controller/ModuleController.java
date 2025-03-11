package com.pfe.gestionEtablissement.controller;

import com.pfe.gestionEtablissement.dtos.ModuleDto;
import com.pfe.gestionEtablissement.model.Filiere;
import com.pfe.gestionEtablissement.model.Module;
import com.pfe.gestionEtablissement.repository.ModuleRepository;
import com.pfe.gestionEtablissement.service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ModuleController {
    @Autowired
    private ModuleService moduleService;

    //--------------------------------Module ---------------------------------------------//
    @PostMapping("/dashboard/filieres/{fId}/semestres/{sId}/modules")
    public ResponseEntity<String> ajouterModule(@PathVariable Integer sId, @RequestBody Module module) throws IOException {
        return ResponseEntity.ok(moduleService.ajouterModule(sId,module));
    }

    @PatchMapping("/dashboard/filieres/{fId}/semestres/{sId}/modules/{id}")
    public ResponseEntity<String> updateEmploi(@PathVariable("id") Integer moduleId, @RequestBody Module module) throws IOException {
        return ResponseEntity.ok(moduleService.modifierModule(moduleId,module));

    }
    @GetMapping("/filieres/{fId}/semestres/{sId}/modules/{moduleId}")
    public ResponseEntity<ModuleDto> getModuleById(@PathVariable Integer moduleId) {
        ModuleDto moduleDto = moduleService.findModuleById(moduleId);
        return ResponseEntity.ok(moduleDto);
    }
    @GetMapping("/filieres/{fId}/semestres/{sId}/modules")
    public ResponseEntity<List<ModuleDto>> getListModule(@PathVariable Integer sId) {
        List<ModuleDto> moduleDtos = moduleService.findAllModules(sId);
        return ResponseEntity.ok(moduleDtos);
    }
    @DeleteMapping("/dashboard/filieres/{fId}/semestres/{sId}/modules/{idModule}")
    public ResponseEntity<String> supprimerModule(@PathVariable Integer idModule) {
        String message = moduleService.supprimerModule(idModule);
        return ResponseEntity.ok(message);
    }
    @GetMapping("modules/nombre")
    public long nombreTotalAnnonces() {
        return moduleService.nombreModules();
    }
}






