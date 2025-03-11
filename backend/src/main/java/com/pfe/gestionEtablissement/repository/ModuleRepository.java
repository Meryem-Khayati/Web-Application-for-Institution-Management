package com.pfe.gestionEtablissement.repository;

import com.pfe.gestionEtablissement.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Arrays;
import java.util.List;

public interface ModuleRepository extends JpaRepository<Module,Integer> {
    Module findByNom(String nomModule);

    List<Module> findAllBySemestreId(Integer sId);
    @Query("SELECT COUNT(DISTINCT m.nom) FROM Module m")
    long countDistinctModules();

}
