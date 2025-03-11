package com.pfe.gestionEtablissement.controller;

import com.pfe.gestionEtablissement.repository.EmailRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
@RestController
public class EmailController {
//    private EmailRepository emailRepo;
//
//    @PostMapping("/{idd}/accepter-et-envoyer-mail")
//    public ResponseEntity<Demande> accepterEtEnvoyerMail(@PathVariable("idd") Integer idd,
//                                                         @RequestParam String subject,
//                                                         @RequestParam String body,
//                                                         @RequestParam("files") MultipartFile[] files) {
//        Demande demande = demandeService.accepterEtEnvoyerMail(idd, subject, body, files);
//        return ResponseEntity.ok().body(demande);
//    }

}
