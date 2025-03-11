package com.pfe.gestionEtablissement.repository;

import com.pfe.gestionEtablissement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username); //utilisée pour rechercher un utilisateur par son nom d'utilisateur dans la base de données. Elle renvoie un Optional, ce qui signifie que si aucun utilisateur correspondant n'est trouvé, elle retournera Optional.empty()
}
