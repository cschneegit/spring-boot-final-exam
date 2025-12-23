package abschlussprojekt.demo.controller;

import abschlussprojekt.demo.dto.RollenRequest;
import abschlussprojekt.demo.dto.SaeulenRequest;
import abschlussprojekt.demo.model.Rollen;
import abschlussprojekt.demo.model.Saeule;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import abschlussprojekt.demo.model.Mitarbeiter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import abschlussprojekt.demo.service.MitarbeiterService;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api")
@AllArgsConstructor
@Log4j2
@CrossOrigin(origins = "http://localhost:9292")
public class MitarbeiterController {

    private final Logger logger = LoggerFactory.getLogger(MitarbeiterController.class);

    @Autowired
    private MitarbeiterService mitarbeiterService;

    // Zeigt alle Mitarbeiter an.
    @GetMapping("/mitarbeiterliste")
    public ResponseEntity<List<Mitarbeiter>> mitarbeiterListe() {
        List<Mitarbeiter> mitarbeiterList = mitarbeiterService.findAllMitarbeiter();
        return ResponseEntity.ok(mitarbeiterList);
    }

    /**
     * Speichere diese Mitarbeiter lokal
     * @param email
     * @param vorname
     * @param nachname
     * @return
     * @throws URISyntaxException
     */
    @PostMapping("/save")
    public ResponseEntity<Mitarbeiter> addMitarbeiter(@RequestParam(value = "email", required = false) String email,
                                                      @RequestParam(value = "vorname", required = false) String vorname,
                                                      @RequestParam(value = "nachname", required = false) String nachname
                                                      ) throws URISyntaxException {

        Mitarbeiter m = new Mitarbeiter();
        m.setEmail(email);
        m.setVorname(vorname);
        m.setNachname(nachname);
        m.setTimestamp(LocalDate.now());
        m.setGueltig(1);
        log.info("Versuche die Rollen für einen Mitarbeiter hinzufügen...");
        Mitarbeiter mit = mitarbeiterService.saveRoleForMitarbeiter(m);

        return ResponseEntity.created(new URI("/api/save")).body(mit);

    }

    /* @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteMitarbeiter(@PathVariable Long id){
        System.out.println("Mitarbeiter " + id + " wird gelöscht");
        mitarbeiterService.deleteMitarbeiter(id);
        return ResponseEntity.ok().body("Erfolgreich gelöscht!");
    }
    */
    @GetMapping("/searched-employee")
    public ResponseEntity<Mitarbeiter> gesuchterMitarbeiter(
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "vorname", required = false) String vorname,
            @RequestParam(value = "nachname", required = false) String nachname
    ){

        System.out.println("Mitarbeiter mit " + email + " wird gesucht...");

        Optional<Mitarbeiter> mitarbeiter = Optional.ofNullable(mitarbeiterService.sucheMitarbeiter(email, vorname, nachname));

        System.out.println(mitarbeiter.isEmpty() ?  "Keine Mitarbeiter gefunden!"
                :  "Mitarbeiter mit " + email + " gefunden");


        return mitarbeiter.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    /**
     * Holt sich die Rollen Liste aus der DB
     * @return
     */
    @GetMapping("/rollenliste")
    public ResponseEntity<List<RollenRequest>> rollenListe() {
        List<Rollen> rollenList = mitarbeiterService.findAllRoles();
        List<RollenRequest> rollenRequestList = new ArrayList<>();
        for (Rollen rollen: rollenList) {
            RollenRequest rollenRequest = new RollenRequest();
            rollenRequest.setRole_id(String.valueOf(rollen.getId()));
            rollenRequest.setRole_name(rollen.getRollenName());
            rollenRequestList.add(rollenRequest);
            System.out.println("Gefunden: " + rollenRequest.getRole_name());
        }

        return ResponseEntity.ok(rollenRequestList);
    }

    /**
     * holt sich die Säulen Liste aus der DB
     * @return
     */
    @GetMapping("/saeulenliste")
    public ResponseEntity<List<SaeulenRequest>> sauelenListe() {
        List<Saeule> saeuleList = mitarbeiterService.findAllSaeulen();
        List<SaeulenRequest> saeulenRequestList = new ArrayList<>();
        for (Saeule saeule : saeuleList) {
            SaeulenRequest saeulenRequest = new SaeulenRequest();
            saeulenRequest.setSaeule_id(saeule.getId());
            saeulenRequest.setSaeule_name(saeule.getSaeulenName());
            saeulenRequestList.add(saeulenRequest);
            System.out.println("Gefunden: " + saeulenRequest.getSaeule_name());

        }
        return ResponseEntity.ok(saeulenRequestList);
    }

    // Zeigt die Rolle mit der gewünschten ID an.
    /* public ResponseEntity<Rollen> getRolebyID(@PathVariable Long id) {
        System.out.println("Rolle mit " + id + " wird gesucht...");
        Optional<Rollen> rolle = mitarbeiterService.findRolebyID(id);

        return rolle.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    } */
}