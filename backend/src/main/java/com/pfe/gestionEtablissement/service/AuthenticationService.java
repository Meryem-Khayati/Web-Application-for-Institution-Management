package com.pfe.gestionEtablissement.service;

import com.pfe.gestionEtablissement.dtos.EtudiantDetails;
import com.pfe.gestionEtablissement.dtos.EtudiantDetailsDto;
import com.pfe.gestionEtablissement.dtos.EtudiantDto;
import com.pfe.gestionEtablissement.dtos.ModuleDetails;
import com.pfe.gestionEtablissement.model.*;
import com.pfe.gestionEtablissement.model.Module;
import com.pfe.gestionEtablissement.repository.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AuthenticationService {



    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository repository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 AuthenticationManager authenticationManager
                                 ) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(User request) {

        // check if user already exist. if exist than authenticate the user
        if(repository.findByUsername(request.getUsername()).isPresent()) {
            return new AuthenticationResponse(null, "User already exist");
        }
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // encoder le mot de passe avant de le stocker dans la base de données.
        user.setRole(request.getRole());
        user = repository.save(user);
       String token = jwtService.generateToken(user);

        return new AuthenticationResponse(null, "L'inscription de l'administrateur a réussi");

    }





        public AuthenticationResponse authenticate (User request)
        { //C'est un bean Spring Security qui gère l'authentification. Il est configuré pour gérer l'authentification des utilisateurs de l'application.
            authenticationManager.authenticate( //Cette méthode est appelée sur l'objet authenticationManager pour effectuer le processus d'authentification
                    new UsernamePasswordAuthenticationToken( //crée un objet UsernamePasswordAuthenticationToken qui représente les informations d'identification de l'utilisateur que nous voulons authentifier.
                            request.getUsername(),
                            request.getPassword()
                    )
            );

            User user = repository.findByUsername(request.getUsername()).orElseThrow();
            String token = jwtService.generateToken(user);
            return new AuthenticationResponse(token, "Vous êtes connecté");

        }


}

