import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './investigaciones.css'
import TablaInvestigaciones from './Personales/Investigacion/Componentes/TablaInvestigaciones'

const InvestigacionesTerceros = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // IMPORTAR DESDE BACKEND


  return (
    <Container>
      <h1 className="letra-grande">Investigaciones De Terceros</h1>
      <hr className="linea-divisora" />
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

      <div>
        <TablaInvestigaciones />
      </div>
    </Container>
  );
};

export default InvestigacionesTerceros;