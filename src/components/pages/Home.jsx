import React from 'react';

import { Button, Container } from 'reactstrap';
import { Link } from 'react-router-dom';



const Home = () => {
    return (
        <div>
            <Container fluid>
                <Button color="link"><Link to="/suche">Suche Mitarbeiter im externen System und weise die Rollen zu</Link></Button>
            </Container>
        </div>

    )
}

export default Home;