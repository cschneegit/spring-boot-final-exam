package abschlussprojekt.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Mitarbeiter {

    @Id
    @GeneratedValue
    private Long id;
    private String vorname;
    private String nachname;
    private String email;
    private int gueltig;
    private LocalDate timestamp;
}