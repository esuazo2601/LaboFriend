import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './investigaciones.css'
import TablaInvestigacionesPersonales from './Personales/Investigacion/Componentes/TablaInvestigacionesPersonales';
import ModalNuevaInvestigacion from './Personales/Investigacion/Componentes/ModalNuevaInvestigacion'


const InvestigacionesPersonales = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshInvestigaciones, setRefreshInvestigaciones] = useState(false)
  const handleRefresh = () => {
    // Cambia el estado para forzar la actualización de la lista de fungibles
    setRefreshInvestigaciones((prev) => !prev);
  };

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
          <ModalNuevaInvestigacion onAddInvestigacion ={handleRefresh} />
        </Col>
      </Row>
      

      <div>
        <TablaInvestigacionesPersonales searchTerm={searchTerm} refreshInvestigaciones={refreshInvestigaciones}/>
      </div>
    </Container>
  );
};

export default InvestigacionesPersonales;