import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './investigaciones.css'
import TablaInvestigacionesPersonales from './Personales/Investigacion/Componentes/TablaInvestigacionesPersonales';
import ModalNuevaInvestigacion from './Personales/Investigacion/Componentes/ModalNuevaInvestigacion'


const InvestigacionesPersonales = () => {
  const [searchTerm, setSearchTerm] = useState('');


  return (
    <Container>
      <h1 className="letra-grande">Investigaciones Personales</h1>
      <hr className="linea-divisora" />
      <Row>
        <Col>
          <div className="search-container-investigaciones">
          <input
            type="text"
            placeholder="Buscar por nombre"
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
          <ModalNuevaInvestigacion />
        </Col>
      </Row>
      

      <div>
        <TablaInvestigacionesPersonales />
      </div>
    </Container>
  );
};

export default InvestigacionesPersonales;