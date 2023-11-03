import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import '../../../EstilosGlobales/basicos.css';

import Fungible from './Componentes/Fungible';
import Microorganismo from './Componentes/Microorganismo';
import Equipo from './Componentes/Equipo';

function AdministradorInventario() {
  const [selectedOption, setSelectedOption] = useState(null);

  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case 'fungible':
        return <Fungible />;
      case 'microorganismo':
        return <Microorganismo />;
      case 'equipo':
        return <Equipo />;
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
        {renderSelectedComponent()}
      </Container>
    </motion.div>
  );
}

export default AdministradorInventario;


