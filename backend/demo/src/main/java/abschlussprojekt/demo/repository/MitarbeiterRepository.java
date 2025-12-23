package abschlussprojekt.demo.repository;

import abschlussprojekt.demo.model.Mitarbeiter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MitarbeiterRepository extends JpaRepository<Mitarbeiter, Long> {

     @Query(value="SELECT * FROM mitarbeiter m WHERE " +
             "m.email = 'test1@test.de' " +
             "and m.vorname = 'test1' " +
             "and m.nachname= 'test1'", nativeQuery = true)
     Mitarbeiter getMitarbeiter(String email, String vorname, String nachname);
}