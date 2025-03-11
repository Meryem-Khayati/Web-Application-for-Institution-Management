package com.pfe.gestionEtablissement.service;

import com.pfe.gestionEtablissement.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service //Cette annotation est utilisée pour indiquer à Spring qu'il doit traiter cette classe comme un service
public class UserDetailsServiceImp implements UserDetailsService { // interface utilisée par Spring Security pour récupérer les détails d'un utilisateur lors de l'authentification.
   private final UserRepository repository;

    public UserDetailsServiceImp(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException { //charger les détails de l'utilisateur en fonction de son nom d'utilisateur.
        return repository.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("User not found"));

    }

}
