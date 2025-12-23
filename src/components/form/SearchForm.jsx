import React, { useState, useEffect } from 'react'
import {
    Label, Form, FormGroup, Input, Col,
    FormText, Button, Container, Row, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap"
import Table from '../table/Table'
import SearchPanel from './SearchPanel';

function SearchForm() {

    /**
     * form state data
     */
    const [form, setForm] = useState({
        vorname: '',
        nachname: '',
        email: '',
        saeulenName: '',
        timestamp: ''
    });
    // state für alle geladene Säulen
    const [saeulen, setSaeulen] = useState([])

    // gesuchter Mitarbeiter Daten
    const [gesuchterMitarbeiter, setGesuchterMiterbeiter] = useState({
        email: '',
        vorname: '',
        nachname: '',
    })
    //modal open / close state
    const [modal, setModal] = useState(false);
    /**
     * 
     * @returns setze Modal Fenster auf oder zu
     */
    const toggle = () => {
        setModal(!modal)
    };
    /**
     * suche im backend nach diesem Mitarbeiter
     */
    const findSerchedMitarbeiter = (email, vorname, nachname) => {
        console.log("findSearchedMitarbeiter() aufruf")

        fetch(`api/searched-employee?email=${email}&vorname=${vorname}&nachname=${nachname}`,
            {
                method: 'GET',
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
                setGesuchterMiterbeiter(jsonResponse)
                console.log("findSearchedMitarbeiter State: " + JSON.stringify(gesuchterMitarbeiter))
            });

    }

    /**
    * am anfang sollen die daten geladen werden
    * http://127.0.0.1:9292/api/saeulenliste
    */
    const getSaeuleData = () => {
        fetch('api/saeulenliste',
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
                console.log("Säulen Response: " + jsonResponse);
                setSaeulen(jsonResponse)
            });
    }
    /**
     * am anfang immer die Säulen laden
     */
    useEffect(() => {
        getSaeuleData()
    }, []);

    /**
     * schreibe ins State wenn Input geändert wird
     * @param {} event 
     */
    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        });
    };

    /**
     * 
     * @returns gibt aktuelles Datum zurück
     */
    const getCurrentDate = () => {
        var today = new Date();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        var day = today.getDate();
        var currDate = `${day}.${month}.${year}`;
        console.log("Timestamp: " + currDate);
        return currDate;
    }

    /**
     * hier posten data auf server endpoint
     * @param {*} event 
     */
    const handleSubmit = (event) => {
        event.preventDefault()

        //aktueller Zeit
        form.timestamp = getCurrentDate

        //Daten anzeigen
        console.log("Suche nach: " + JSON.stringify(form))

        //reset Modal Form immer am Anfang
        setGesuchterMiterbeiter({
            email: "",
            vorname: "",
            nachname: ""
        })

        //API Call Suche ob in CampusManagement System dieser Mitarbeiter gefunden wird
        findSerchedMitarbeiter(form.email, form.vorname, form.nachname)

        //starte Modal Fenster
        toggle()


    };

    return (
        <Container style={{ border: "1px solid #ccc", paddingTop: "3rem", paddingBottom: "3rem" }}>
            <Col>
                <h3>
                    TUHH-Rollenzuordnung
                </h3>
                <Row style={{ marginBottom: "2rem" }}>
                    <Container>
                        <hr />
                        <h5>Suche</h5>
                    </Container>

                </Row>

            </Col>
            <Row >
                <Col xs="10">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup row>
                            <Label for="email" sm={2}>Email </Label>
                            <Col sm={10}>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="vorname" sm={2}>Vorname</Label>
                            <Col sm={10}>
                                <Input
                                    id="vorname"
                                    name="vorname"
                                    placeholder="Vorname"
                                    type="text"
                                    value={form.vorname}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="nachname" sm={2}>Nachname</Label>
                            <Col sm={10}>
                                <Input
                                    id="nachname"
                                    name="nachname"
                                    placeholder="Nachname"
                                    type="text"
                                    value={form.nachname}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="saeuleName" sm={2}></Label>

                            <Col sm={10}>
                                <Input
                                    disabled
                                    id="saeuleName"
                                    name="saeuleName"
                                    type="select"
                                    onChange={handleChange}
                                >
                                    <option>Prod Säule</option>
                                    {
                                        saeulen.map((saeule) => (
                                            <option key={saeule.saeule_id} value={saeule.saeule_name}>
                                                {saeule.saeule_name}
                                            </option>

                                        ))
                                    }

                                </Input>


                            </Col>


                        </FormGroup>
                        <FormGroup >
                            <Col sm={{ offset: 10, size: 30 }} >
                                <Button color="danger">
                                    Suche Mitarbeiter
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>



                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Rolle für den Mitarbeiter vergeben</ModalHeader>
                    <ModalBody>
                        <SearchPanel gesuchterMitarbeiter={gesuchterMitarbeiter} toggle={toggle} />
                    </ModalBody>
                </Modal>


                <Container>
                    <hr />
                    Hier werden alle bearbeitete Mitarbeiter protokolliert
                    <hr />
                </Container>
                <Container>
                    <Table />
                </Container>
            </Row>
        </Container >


    )

}

export default SearchForm