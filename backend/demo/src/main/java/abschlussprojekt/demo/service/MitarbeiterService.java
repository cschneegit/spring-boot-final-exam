package abschlussprojekt.demo.service;

import abschlussprojekt.demo.model.Mitarbeiter;
import abschlussprojekt.demo.model.Rollen;
import abschlussprojekt.demo.model.Saeule;
import abschlussprojekt.demo.repository.MitarbeiterRepository;
import abschlussprojekt.demo.repository.RollenRepository;
import abschlussprojekt.demo.repository.SaeulenRepository;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;


import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;


@Service
public class MitarbeiterService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private MitarbeiterRepository mitarbeiterRepository;

    @Autowired
    private RollenRepository rollenRepository;

    @Autowired
    private SaeulenRepository saeulenRepository;

    public List<Mitarbeiter> findAllMitarbeiter() {
        return mitarbeiterRepository.findAll();
    }

    /**
     * Konvertiert ein JSON File zu Model Objekt
     *
     * @param classType
     * @param <T>
     * @return
     */
    private List<Mitarbeiter> findeAlleMitarbeiterImExternenSystem() {

        List<Mitarbeiter> mList = new ArrayList<>();

        try {
            File file = new ClassPathResource("data/" + "PersonServiceMock.json").getFile();

            try (BufferedReader bufferedReader = new BufferedReader(new FileReader(file))) {
                String line;
                while ((line = bufferedReader.readLine()) != null) {
                    ObjectMapper mapper = new ObjectMapper();
                    mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
                    Mitarbeiter mitarbeiter = mapper.readValue(line, Mitarbeiter.class);

                    mList.add(mitarbeiter);
                    logger.debug(mitarbeiter.getEmail() + " in die Liste hinzugefügt!");

                }
            }
            catch (Exception e) {
                System.out.println("Label Update fehlgeschlagen");
            }


        } catch (Exception e) {
            logger.error(e.getMessage());
        }

        return mList;
    }

    /**
     * Lösche Einträge aus der DB
     */
    public void deleteMitarbeiter(Long id) {
        mitarbeiterRepository.deleteById(id);
    }

    /**
     * rolle hinzufügen und in die DB protokollieren
     * @param mitarbeiter
     * @return
     */
    public Mitarbeiter saveRoleForMitarbeiter(Mitarbeiter mitarbeiter) {
        // füge die Rolle hinzu und speichert sie Lokal
        return mitarbeiterRepository.save(mitarbeiter);
    }

    /**
     * finde Mitarbeiter aus einem MockService Json File
     * @param email
     * @param vorname
     * @param nachname
     * @return
     */
    public Mitarbeiter sucheMitarbeiter(String email, String vorname, String nachname){

        List<Mitarbeiter> mitarbeiterList = findeAlleMitarbeiterImExternenSystem();

        System.out.println("Liste Größe: " + mitarbeiterList.size());

        Mitarbeiter searchedEntry = new Mitarbeiter();

        for (Mitarbeiter mitarbeiter : mitarbeiterList){

                if (mitarbeiter.getNachname().equals(nachname)
                        && mitarbeiter.getVorname().equals(vorname)
                        && mitarbeiter.getEmail().equals(email)) {

                    searchedEntry.setEmail(mitarbeiter.getEmail());
                    searchedEntry.setVorname(mitarbeiter.getVorname());
                    searchedEntry.setNachname(mitarbeiter.getNachname());

                    System.out.println("Mitarbeiter gefunden: "
                            + searchedEntry.getEmail() + " "
                            + searchedEntry.getNachname() + " "
                            + searchedEntry.getVorname());

                }

        }

        return searchedEntry;
    }
    public List<Rollen> findAllRoles() {
        return rollenRepository.findAll();
    }

    public List<Saeule> findAllSaeulen() {
        return saeulenRepository.findAll();
    }

    /* public Rollen addRole(Rollen rollen) {
        return rollenRepository.save(rollen);
    }

    public Optional<Rollen> findRolebyID(Long id) {
        return rollenRepository.findById(id);
    }*/
}