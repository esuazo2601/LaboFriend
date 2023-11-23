import React, { useState } from 'react';
import TablaAvances from './Componentes/TablaAvances';
import ModalAvance from './Componentes/ModalAvance';
import { Container } from 'react-bootstrap';
import '../../../../../EstilosGlobales/basicos.css';
import ModalDetalle from './Componentes/ModalDetalle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function AyudanteInvestigacionTerceros() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Container>
            <h1 className="letra-grande">Investigación</h1>
            <hr className="linea-divisora" />

            <Row>
                <Col>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Buscar por avance"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <span className="search-icon">
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                    </div>
                </Col>
                <Col>
                    <ModalAvance />
                </Col>
            </Row>

            <ModalDetalle />
            <TablaAvances searchTerm={searchTerm} />
        </Container>
    );
}

export default AyudanteInvestigacionTerceros;