package com.pfe.gestionEtablissement.service;

import com.pfe.gestionEtablissement.dtos.EtudiantDetails;
import com.pfe.gestionEtablissement.dtos.EtudiantDto;
import com.pfe.gestionEtablissement.model.AuthenticationResponse;
import com.pfe.gestionEtablissement.model.Etudiant;
import com.pfe.gestionEtablissement.model.Semestre;
import com.pfe.gestionEtablissement.repository.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class EtudiantService {

    @Autowired
    private SemestreRepository semestreRepository;

    private final PasswordEncoder passwordEncoder;
    private final EtudiantRepository etudiantRepository;


    public EtudiantService(  PasswordEncoder passwordEncoder,
                             EtudiantRepository etudiantRepository
    ) {
        this.passwordEncoder = passwordEncoder;
        this.etudiantRepository=etudiantRepository;
    }


    public AuthenticationResponse registerEtd(Integer sId, Etudiant etudiant) {

        if(semestreRepository.existsById(sId)) {
            Semestre semestre=new Semestre(sId);
            // Crée un nouvel étudiant
            Etudiant newEtudiant = new Etudiant();
            newEtudiant.setFirstName(etudiant.getFirstName());
            newEtudiant.setLastName(etudiant.getLastName());
            newEtudiant.setUsername(etudiant.getUsername());
            newEtudiant.setPassword(passwordEncoder.encode(etudiant.getPassword()));
            newEtudiant.setRole(etudiant.getRole());
            newEtudiant.setApogee(etudiant.getApogee());
            newEtudiant.setCin(etudiant.getCin());
            newEtudiant.setCne(etudiant.getCne());
            newEtudiant.setDateNaissance(etudiant.getDateNaissance());
            newEtudiant.getSemestres().add(semestre);
            etudiantRepository.save(newEtudiant);
            return new AuthenticationResponse(null, "Inscription de l'étudiant réussie");
        }

        return new AuthenticationResponse(null, "Erreur lors de l'Inscription  ");
    }

    public AuthenticationResponse updateEtudiant(Integer etudiantId, Etudiant etudiant) {
        Optional<Etudiant> existingEtudiantOptional = etudiantRepository.findById(etudiantId);

        if(existingEtudiantOptional.isPresent()) {
            Etudiant existingEtudiant = existingEtudiantOptional.get();

            // Mettre à jour les informations de l'étudiant
            existingEtudiant.setFirstName(etudiant.getFirstName());
            existingEtudiant.setLastName(etudiant.getLastName());
            existingEtudiant.setUsername(etudiant.getUsername());
            if(Objects.equals(existingEtudiant.getPassword(), etudiant.getPassword())) {
                existingEtudiant.setPassword(etudiant.getPassword());
            }
            else{
                existingEtudiant.setPassword(passwordEncoder.encode(etudiant.getPassword()));
            }
            existingEtudiant.setRole(etudiant.getRole());
            existingEtudiant.setApogee(etudiant.getApogee());
            existingEtudiant.setCin(etudiant.getCin());
            existingEtudiant.setCne(etudiant.getCne());
            existingEtudiant.setDateNaissance(etudiant.getDateNaissance());

            //  mettre à jour le semestre
            // existingEtudiant.getSemestres().clear(); // Effacer les anciens semestres
            // Semestre semestre = new Semestre(sId);
            // existingEtudiant.getSemestres().add(semestre); // Ajouter le nouveau semestre

            etudiantRepository.save(existingEtudiant);

            return new AuthenticationResponse(null, "Mise à jour de l'étudiant réussie");
        } else {
            return new AuthenticationResponse(null, "Erreur : étudiant non trouvé");
        }
    }

    public List<EtudiantDto> findAllEtudiants(Integer sId) {
        return etudiantRepository.findAllBySemestresId(sId)
                .stream()
                .map(this::toEtudiantDto)
                .collect(Collectors.toList());
    }
    public EtudiantDto findEtudiantById(Integer etudiantId) {
        Etudiant etudiant = etudiantRepository.findById(etudiantId)
                .orElseThrow(() -> new RuntimeException("Étudiant non trouvé"));
        return toEtudiantDto(etudiant);
    }

    public EtudiantDetails getEtudiantDetailsById(Integer etudiantId) {
        Optional<Etudiant> etudiantOptional = etudiantRepository.findById(etudiantId);
        if (etudiantOptional.isPresent()) {
            Etudiant etudiant = etudiantOptional.get();
            return new EtudiantDetails(
                    etudiant,
                    etudiant.getSemestres().isEmpty() ? null : etudiant.getSemestres().get(0).getFiliere(),
                    etudiant.getSemestres().isEmpty() ? null : etudiant.getSemestres().get(0)
            );
        }
        return null; // Ou vous pouvez lever une exception ou renvoyer une réponse appropriée selon votre logique mét
    }
    @PersistenceContext
    private EntityManager entityManager;

    public List<Map<String, Object>> getInfosEtudiantAvecNotes(Etudiant etudiant) {
        String queryStr = "SELECT mo.nom, s.nom, n.valeur " +
                "FROM Etudiant e " +
                "JOIN e.notes n " +
                "JOIN n.module mo " +
                "JOIN mo.semestre s "+
                "WHERE e = :etudiant";

        TypedQuery<Object[]> query = entityManager.createQuery(queryStr, Object[].class);
        query.setParameter("etudiant", etudiant);

        List<Object[]> results = query.getResultList();
        List<Map<String, Object>> formattedResults = new ArrayList<>();

        for (Object[] result : results) {
            Map<String, Object> formattedResult = new HashMap<>();
            formattedResult.put("module", result[0]);
            formattedResult.put("semestre", result[1]);
            formattedResult.put("note", result[2]);
            formattedResults.add(formattedResult);
        }

        return formattedResults;
    }
    public Etudiant getEtudiantByApogee(long apogee) {
        Optional<Etudiant> etudiantOptional = etudiantRepository.findByApogee(apogee);
        return etudiantOptional.orElse(null);
    }


    @Transactional
    public String changerSemestre(Etudiant etudiant, Semestre nouveauSemestre) {
        // Retirer l'étudiant de tous les anciens semestres (si nécessaire)
        etudiant.getSemestres().clear();
        // Ajouter l'étudiant au nouveau semestre
        etudiant.getSemestres().add(nouveauSemestre);
        etudiantRepository.save(etudiant);
        return "{\"message\":\"Semestre de l'etudiant changé  avec succès \"}";
    }

    private EtudiantDto toEtudiantDto (Etudiant etudiant){
        return new EtudiantDto(etudiant);
    }

    public String deleteEtudiant (Integer etudiantId){
        Etudiant existingEtudiant = etudiantRepository.findById(etudiantId)
                .orElseThrow(() -> new EntityNotFoundException("Etudiant not found with id: " + etudiantId));
        etudiantRepository.delete(existingEtudiant);
        return "{\"message\":\"Etudiant supprimé  \"}";
    }
    public long nombreEtudiants() {
        return etudiantRepository.count();
    }


}
