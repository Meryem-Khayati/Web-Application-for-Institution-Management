package com.pfe.gestionEtablissement.service;

import com.pfe.gestionEtablissement.enumeration.TypeDocument;
import com.pfe.gestionEtablissement.model.Etudiant;
import com.pfe.gestionEtablissement.model.Reclamation;
import com.pfe.gestionEtablissement.repository.ReclamationRepository;
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
public class ReclamationService {
    @Autowired
    private ReclamationRepository reclamationRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public String creerReclamation(Etudiant etudiant, TypeDocument typeDocument, String date, String message) {
        Reclamation reclamation = new Reclamation();
        reclamation.setEtudiant(etudiant);
        reclamation.setTypeDocument(typeDocument);
        reclamation.setDateReclamation(date);
        reclamation.setStatut("en attente");
        reclamation.setMessage(message);
         reclamationRepository.save(reclamation);
        return "{\"message\":\"Réclamation envoyée avec succès \"}";

    }

    public Optional<Reclamation> getById(Integer id) {
        return reclamationRepository.findById(id);
    }

    public List<Reclamation> getAllReclamations() {
        return reclamationRepository.findAll();
    }

    public List<Reclamation> rechercherReclamationsParStatut(String statut) {
        return reclamationRepository.findByStatut(statut);
    }

    public Reclamation mettreAJourStatutReclamation(Integer reclamationId, String nouveauStatut) {
        Optional<Reclamation> optionalReclamation = reclamationRepository.findById(reclamationId);
        if (optionalReclamation.isPresent()) {
            Reclamation reclamation = optionalReclamation.get();
            reclamation.setStatut(nouveauStatut);
            return reclamationRepository.save(reclamation);
        } else {
            throw new EntityNotFoundException("Réclamation non trouvée avec l'ID : " + reclamationId);
        }
    }

    public String accepterEtEnvoyerMail(Integer idRec, String subject, String body, MultipartFile[] files) {
        // Trouver la réclamation par son ID
        Reclamation reclamation = reclamationRepository.findById(idRec)
                .orElseThrow(() -> new EntityNotFoundException("Réclamation non trouvée avec id: " + idRec));

        // Changer le statut de la réclamation
        reclamation.setStatut("Acceptée");

        // Enregistrer les modifications de la réclamation
        reclamationRepository.save(reclamation);

        // Récupérer l'e-mail de l'étudiant
        String to = reclamation.getEtudiant().getUsername();

        // Envoyer l'e-mail
        sendMail(files, to, subject, body);

        return "{\"message\":\"Réclamation acceptée avec succès \"}";

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
    public long nombreReclamation() {
        return reclamationRepository.count();
    }
}
