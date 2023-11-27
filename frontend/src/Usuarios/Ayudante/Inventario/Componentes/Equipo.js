import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import '../Estilos/tabla.css';
import '../Estilos/paginacion.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import ModalMantenimientoEquipo from './ModalMantenimientoEquipo';
import ModalDescriptionEquipo from './ModalDescriptionEquipo';

const Equipo = ({ searchTerm }) => {
  const equiposData = [
    {
      nombre: 'Equipo 1',
      ubicacion: 'Ubicación 1',
      modoUso: 'Mode de uso 1',
      detalles: 'Detalles 1',
      imagen: 'imagen.jpg', 
      mantenimiento: '01-01-2023',
    },
    {
      nombre: 'Equipo 2',
      ubicacion: 'Ubicación 2',
      modoUso: 'Mode de uso 2',
      detalles: 'Detalles 2',
      imagen: 'imagen.jpg', 
      mantenimiento: '01-01-2023',
    },
  ];

  const [showModalDescription, setShowModalDescription] = useState(false);
  const [selectedEquipo, setSelectedEquipo] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState({
    ubicacion: '',
    modoUso: '',
    detalles: '',
  });

  const [showModalMantenimiento, setShowModalMantenimiento] = useState(false);
  const [selectedMantenimiento, setSelectedMantenimiento] = useState({
    oldDate: '',
    newDate: '',
  });

  const handleMantenimientoClick = (equipo) => {
    setShowModalMantenimiento(true);
    setSelectedMantenimiento({
      oldDate: equipo.mantenimiento,
      newDate: '',
    });
    setSelectedEquipo(equipo); 
  };

  const handleSaveMantenimiento = () => {
    // Actualizar fecha 
    setShowModalMantenimiento(false);
  };


  // Editar descripción del equipo seleccionado
  const handleDescriptionClick = (equipo) => {
    setShowModalDescription(true);
    setSelectedEquipo(equipo);
    setSelectedDescription({
      ubicacion: equipo.ubicacion,
      modoUso: equipo.modoUso,
      detalles: equipo.detalles,
    });
  };

  const handleSaveDescription = () => {
    setShowModalDescription(false);
  };

  // Filtra los elementos 
  const filteredEquipos =  equiposData.filter((equipo) =>
    equipo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 5; // Cantidad de elementos por pág
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = filteredEquipos.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calcula los elementos para la pág actual
  const paginatedEquipos = filteredEquipos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="encabezado-tabla text-center align-middle">Nombre</th>
            <th className="encabezado-tabla text-center align-middle">Descripción</th>
            <th className="encabezado-tabla text-center align-middle">Mantenimiento</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEquipos.map((equipo, index) => (
            <tr key={index}>
              <td className="columna-nombre-tabla text-center align-middle">
                {equipo.nombre}
              </td>
              <td
                className="celdas-restantes-tabla text-center align-middle"
                onClick={() => handleDescriptionClick(equipo)}
              >
                <FontAwesomeIcon icon={faEye} />
              </td>
              <td
                className="celdas-restantes-tabla text-center align-middle"
                onClick={() => handleMantenimientoClick(equipo)}
              >
                {equipo.mantenimiento}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>

      <ModalMantenimientoEquipo
        show={showModalMantenimiento}
        onHide={() => setShowModalMantenimiento(false)}
        equipo={selectedEquipo} 
        oldDate={selectedMantenimiento.oldDate}
        newDate={selectedMantenimiento.newDate}
        onSave={handleSaveMantenimiento}
      />

      <ModalDescriptionEquipo
        show={showModalDescription}
        onHide={() => setShowModalDescription(false)}
        equipo={selectedEquipo}
        onSave={handleSaveDescription}
      />
    </div>
  );
};

export default Equipo;
