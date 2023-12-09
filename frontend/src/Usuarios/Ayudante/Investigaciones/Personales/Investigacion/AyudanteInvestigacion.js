import React, { useState} from 'react';
import TablaAvances from './Componentes/TablaAvances';
import ModalAvance from './Componentes/ModalAvance';
import { Container } from 'react-bootstrap';
import '../../../../../EstilosGlobales/basicos.css';
import ModalDetalle from './Componentes/ModalDetalle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';


function AyudanteInvestigacion() {
    const [searchTerm, setSearchTerm] = useState('');
    const {investigacionId} = useParams();
    const [refreshInvestigaciones, setRefreshInvestigaciones] = useState(false)
    const handleRefresh = () => {
        // Cambia el estado para forzar la actualización de la lista de fungibles
        setRefreshInvestigaciones((prev) => !prev);
      };
    console.log(investigacionId)
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
                    <ModalAvance id = {investigacionId} onAddInvestigacion ={handleRefresh} />
                </Col>
            </Row>

            <ModalDetalle />
            <TablaAvances searchTerm={searchTerm} investigacionId={investigacionId} refreshInvestigaciones={refreshInvestigaciones}/>
        </Container>
    );
}

export default AyudanteInvestigacion;