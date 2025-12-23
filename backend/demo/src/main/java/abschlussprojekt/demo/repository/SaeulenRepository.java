package abschlussprojekt.demo.repository;

import abschlussprojekt.demo.model.Saeule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaeulenRepository extends JpaRepository<Saeule, Long> {}