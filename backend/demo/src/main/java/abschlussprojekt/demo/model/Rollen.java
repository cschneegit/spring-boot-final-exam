package abschlussprojekt.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Rollen {

    @Id
    @GeneratedValue
    private Long id;
    private String rollenName;
    private String rollenKennzeichnung;


    /*insert into rollen (id, rollen_kennzeichnung, rollen_name) values (1, 'ADMIN', 'Administrator');
    insert into rollen (id, rollen_kennzeichnung, rollen_name) values (2, 'USER', 'User');
    insert into rollen (id, rollen_kennzeichnung, rollen_name) values (3, 'BEARB', 'Bearbeiter');*/
}
