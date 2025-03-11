package com.pfe.gestionEtablissement.repository;

import org.springframework.web.multipart.MultipartFile;

public interface EmailRepository {
    String sendMail(MultipartFile[] file, String to, String subject, String body);
}
