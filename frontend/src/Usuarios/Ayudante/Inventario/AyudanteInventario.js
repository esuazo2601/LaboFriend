import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import '../../../EstilosGlobales/basicos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Fungible from './Componentes/Fungible';
import Microorganismo from './Componentes/Microorganismo';
import Equipo from './Componentes/Equipo';

function AyudanteInventario() {
  const [selectedOption, setSelectedOption] = useState('fungible');
  const [searchTerm, setSearchTerm] = useState('');

  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case 'fungible':
        return <Fungible searchTerm={searchTerm} />;
      case 'microorganismo':
        return <Microorganismo searchTerm={searchTerm} />;
      case 'equipo':
        return <Equipo searchTerm={searchTerm} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container>
        <h1 className="letra-grande">Inventario</h1>
        <hr className="linea-divisora" />
        <nav>
          <div className="opcion-inventario">
            <p
              className={`letra-mediana ${selectedOption === 'fungible' ? 'seleccionada' : ''}`}
              onClick={() => setSelectedOption('fungible')}
            >
              Fungible
            </p>
          </div>
          <div className="opcion-inventario">
            <p
              className={`letra-mediana ${selectedOption === 'microorganismo' ? 'seleccionada' : ''}`}
              onClick={() => setSelectedOption('microorganismo')}
            >
              Microorganismo
            </p>
          </div>
          <div className="opcion-inventario">
            <p
              className={`letra-mediana ${selectedOption === 'equipo' ? 'seleccionada' : ''}`}
              onClick={() => setSelectedOption('equipo')}
            >
              Equipo
            </p>
          </div>
        </nav>
        <div className="search-container">
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
        {renderSelectedComponent()}
      </Container>
    </motion.div>
  );
}

export default AyudanteInventario;