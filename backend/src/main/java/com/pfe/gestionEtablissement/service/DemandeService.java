package com.pfe.gestionEtablissement.service;

import com.pfe.gestionEtablissement.enumeration.TypeDocument;
import com.pfe.gestionEtablissement.model.Demande;
import com.pfe.gestionEtablissement.model.Etudiant;
import com.pfe.gestionEtablissement.repository.DemandeRepository;
import jakarta.mail.internet.MimeMessage;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class DemandeService {
    @Autowired
    private DemandeRepository demandeRepository;
    public String creerDemande(Etudiant etudiant, TypeDocument typeDocument, String date) {
        Demande demande = new Demande();
        demande.setEtudiant(etudiant);
        demande.setTypeDocument(typeDocument);
        demande.setDateDemande(date);
        demande.setStatut("en attente");
         demandeRepository.save(demande);
        return "{\"message\":\"Demande envoyée avec succès \"}";
    }
    public Demande getById(Integer id) {
       return demandeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Demande n'existe pas avec l'id: " + id));
    }
    public List<Demande> getAllDemandes() {
        return demandeRepository.findAll();
    }

    public List<Demande> rechercherDemandesParStatut(String statut) {
        return demandeRepository.findByStatut(statut);
    }
//    public Demande accepteDemande(Integer idd) {
//        Demande demande = demandeRepository.findById(idd)
//                .orElseThrow(() -> new EntityNotFoundException("Demande not found with id: " + idd));
//        demande.setStatut("Accepté");
//        return demandeRepository.save(demande);
//    }


    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public String accepterEtEnvoyerMail(Integer idd, String subject, String body, MultipartFile[] files) {
        Demande demande = demandeRepository.findById(idd)
                .orElseThrow(() -> new EntityNotFoundException("Demande not found with id: " + idd));

        demande.setStatut("Accepté");
        demandeRepository.save(demande);
        String to = demande.getEtudiant().getUsername();
        sendMail(files, to, subject, body);


        return "{\"message\":\"Demande acceptée avec succès \"}";
    }

    private void sendMail(MultipartFile[] files, String to, String subject, String body) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setFrom(fromEmail);
            mimeMessageHelper.setTo(to);
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(body);

            for (MultipartFile file : files) {
                mimeMessageHelper.addAttachment(file.getOriginalFilename(), new ByteArrayResource(file.getBytes()));
            }

            javaMailSender.send(mimeMessage);

        } catch (Exception e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }
    public String refuseDemande(Integer idd) {
        Demande demande = demandeRepository.findById(idd)
                .orElseThrow(() -> new EntityNotFoundException("Demande not found with id: " + idd));
        demande.setStatut("refusé");
         demandeRepository.save(demande);
        return "{\"message\":\"Demande refusée \"}";
    }

    public Demande mettreAJourStatutDemande(Integer demandeId, String nouveauStatut) {
        Optional<Demande> optionalDemande = demandeRepository.findById(demandeId);
        if (optionalDemande.isPresent()) {
            Demande demande = optionalDemande.get();
            demande.setStatut(nouveauStatut);
            return demandeRepository.save(demande);
        } else {
            throw new EntityNotFoundException("Demande non trouvée avec l'ID : " + demandeId);
        }
    }
    public long nombreDemandes() {
        return demandeRepository.count();
    }




}
