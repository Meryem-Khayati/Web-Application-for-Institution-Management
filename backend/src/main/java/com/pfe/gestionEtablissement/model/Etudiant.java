package com.pfe.gestionEtablissement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Etudiant extends User {
    @Column(unique = true)
    private long apogee;
    private String cin;
    private String cne;
    private String dateNaissance;
    @ManyToMany(fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Semestre> semestres = new ArrayList<>();
    @OneToMany(mappedBy = "etudiant",fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Note> notes;

    public long getApogee() {
        return apogee;
    }

    public void setApogee(long apogee) {
        this.apogee = apogee;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getCne() {
        return cne;
    }

    public void setCne(String cne) {
        this.cne = cne;
    }

    public String getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(String dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public void ifPresent(Consumer<Etudiant> action) {
        if (this != null) {
            action.accept(this);
        }
    }
}
