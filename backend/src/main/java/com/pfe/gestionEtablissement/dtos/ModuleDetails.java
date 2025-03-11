package com.pfe.gestionEtablissement.dtos;

import com.pfe.gestionEtablissement.model.Module;
import com.pfe.gestionEtablissement.model.Note;
import com.pfe.gestionEtablissement.model.Semestre;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ModuleDetails {
    private Module module;
    private Semestre semestre;
    private List<Note> notes;
}
