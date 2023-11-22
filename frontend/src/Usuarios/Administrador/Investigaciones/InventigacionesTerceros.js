import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './investigaciones.css'

const InvestigacionesTerceros = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // IMPORTAR DESDE BACKEND
  const investigacionesData = [
    {
      nombre: 'Investigación 1 Investigación 1 Investigación 1 Investigación 1 Investigación 1 Investigación 1 Investigación 1 Investigación 1',
    },
    {
      nombre: 'Investigación 2',
    },
    {
      nombre: 'Investigación 3',
    },
    {
      nombre: 'Investigación 4',
    },
    {
      nombre: 'Investigación 5 Investigación 5 Investigación 5',
    },
    {
      nombre: 'Investigación 6',
    },
    {
      nombre: 'Investigación 7',
    },
    {
      nombre: 'Investigación 8',
    },
    {
      nombre: 'Investigación 9',
    },
    {
      nombre: 'Investigación 10',
    },
    {
      nombre: 'Investigación 11',
    },
    {
      nombre: 'Investigación 12',
    },

  ];

  const normalizeText = (text) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  const filteredInvestigaciones = investigacionesData.filter(investigacion =>
    normalizeText(investigacion.nombre).includes(normalizeText(searchTerm))
  );

  const itemsPerPage = 20;
  const totalItems = filteredInvestigaciones.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Página actual
  const paginatedInvestigaciones = filteredInvestigaciones.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

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
        {paginatedInvestigaciones.map((investigacion, index) => (
          <Button key={index} className="boton-investigacion" onClick={() => { window.location.href = '/administrador/investigaciones/personales/investigacion'; }}>
            {investigacion.nombre.length > 50
              ? `${investigacion.nombre.substring(0, 50)}...`
              : investigacion.nombre}
          </Button>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </Container>
  );
};

export default InvestigacionesTerceros;