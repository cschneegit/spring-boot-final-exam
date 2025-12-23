import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Label, Form, FormGroup, Input, Col,
    FormText, Button, Container, Row, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap"


function SearchPanel({ gesuchterMitarbeiter, toggle }) {

    /**
     * zum navigieren zu andere Seiten
     */
    const navigate = useNavigate();
    /**
    * form state data
    */
    const [form, setForm] = useState({
        rollenName: '',
    });
    //state für alle geladene Rollen
    const [roles, setRoles] = useState([])

    const [disabledInput, setDisabledInput] = useState(true)

    const setSaveButton = () => {
        if (gesuchterMitarbeiter.email != '') {
            setDisabledInput(false)
        }
    }


    /**
      * am anfang sollen die daten geladen werden
      * http://127.0.0.1:9292/api/rollenliste
      */
    const getRolesData = () => {
        fetch('api/rollenliste',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (jsonResponse) {
                console.log("Rollen Response: " + jsonResponse);
                setRoles(jsonResponse)
            });
    }
    /**
    * am anfang immer laden
    */
    useEffect(() => {
        getRolesData()
    }, []);

    /**
     * setze Daten wenn feld geändert wird
     * @param {} event 
     */
    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        });
    };

    /**
     * hier posten data auf server endpoint
     * @param {*} event 
     */
    const saveData = (event) => {
        //verhindere Browser refresh
        event.preventDefault()

        //Zeige alle Form Daten in die Konsole
        console.log("Rolle: " + form.rollenName)
        console.log("Email: " + gesuchterMitarbeiter.email)
        console.log("Vorname: " + gesuchterMitarbeiter.vorname)
        console.log("Nachname: " + gesuchterMitarbeiter.nachname)

        //Speicher in die DB
        saveMitarbeiter(gesuchterMitarbeiter.email,
            gesuchterMitarbeiter.vorname,
            gesuchterMitarbeiter.nachname,
            form.rollenName)
        //schalte Modal aus
        toggle()

        navigate(`/suche`)
    };


    /**
    * suche im backend nach diesem Mitarbeiter
    */
    const saveMitarbeiter = (email, vorname, nachname, roleName) => {
        console.log("findSearchedMitarbeiter() aufruf")

        fetch(`api/save?email=${email}&vorname=${vorname}&nachname=${nachname}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonResponse) {
                console.log("save Mitarbeiter json response: " + jsonResponse)
            });




    }


    return (
        <>

            <Container>
                Gefundener Mitarbeiter
            </Container>
            <hr />
            <Form onSubmit={saveData}>
                <FormGroup row>
                    <Label for="email" sm={2}>Email</Label>
                    <Col sm={10}>
                        <Input
                            disabled
                            id="email"
                            name="email"
                            placeholder="--"
                            type="email"
                            value={gesuchterMitarbeiter.email}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="vorname" sm={2}>Vorname</Label>
                    <Col sm={10}>
                        <Input
                            disabled
                            id="vorname"
                            name="vorname"
                            placeholder="--"
                            type="text"
                            value={gesuchterMitarbeiter.vorname}

                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="nachname" sm={2}>Nachname</Label>
                    <Col sm={10}>
                        <Input
                            disabled
                            id="nachname"
                            name="nachname"
                            placeholder="--"
                            type="text"
                            value={gesuchterMitarbeiter.nachname}

                        />
                    </Col>
                </FormGroup>
                <Container>
                    <hr />
                </Container>
                <FormGroup row>
                    <Label for="rollenName" sm={2}> Rolle wählen</Label>

                    <Col sm={10}>
                        <Input
                            id="rollenName"
                            name="rollenName"
                            type="select"
                            onChange={handleChange}
                        >
                            <option>--Rolle Wählen--</option>
                            {

                                roles.map((role) => (
                                    <option key={role.role_id} value={role.role_name}>
                                        {role.role_name}
                                    </option>

                                ))
                            }

                        </Input>
                    </Col>
                </FormGroup>

                <FormGroup check row >
                    <Col sm={{ offset: 2, size: 10 }} >
                        <Button>
                            Rolle hinzufügen
                        </Button>
                    </Col>
                </FormGroup>
            </Form>





        </>
    )
}
export default SearchPanel