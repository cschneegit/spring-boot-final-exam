package abschlussprojekt.demo.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MitarbeiterResponse {
    private String vorname;
    private String nachname;
    private String email;
    private String benutzerkennung;
    private String rollenName;
    private String saeulenName;
    private LocalDate timestamp;
}