package com.pfe.gestionEtablissement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Filiere {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nom;
    private String descreption;
    @Lob
    @Column(length = 100000000)
    private byte[] image;
    @OneToMany(mappedBy = "filiere")
    @JsonIgnore
    private List<Semestre> semestres;

    public Filiere(Integer fId) {
        this.id=fId;
    }

}
