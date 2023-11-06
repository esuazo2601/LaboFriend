import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import '../Estilos/tabla.css';
import '../Estilos/paginacion.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import ModalStockMicroorganismo from './ModalStockMicroorganismo';
import ModalDescriptionMicroorganismo from './ModalDescriptionMicroorganismo';

const Microorganismo = ({ searchTerm }) => {
  const microorganismosData = [
    {
      
      nombre: 'Microorganismo 1',
      nombreCientifico: 'Cientifico 1',
      procedencia: 'Origen 1',
      ubicacion: 'Ubicación 1',
      detalles: 'Detalles 1',
      imagen: 'imagen.jpg', 
      stock: 10
    },
    {
      nombre: 'Microorganismo 2',
      nombreCientifico: 'Cientifico 2',
      procedencia: 'Origen 2',
      ubicacion: 'Ubicación 2',
      detalles: 'Detalles 2',
      imagen: 'imagen.jpg', 
      stock: 10
    },
    {
      
      nombre: 'Microorganismo 1',
      nombreCientifico: 'Cientifico 1',
      procedencia: 'Origen 1',
      ubicacion: 'Ubicación 1',
      detalles: 'Detalles 1',
      imagen: 'imagen.jpg', 
      stock: 10
    },
    {
      nombre: 'Microorganismo 2',
      nombreCientifico: 'Cientifico 2',
      procedencia: 'Origen 2',
      ubicacion: 'Ubicación 2',
      detalles: 'Detalles 2',
      imagen: 'imagen.jpg', 
      stock: 10
    },
    {
      
      nombre: 'Microorganismo 1',
      nombreCientifico: 'Cientifico 1',
      procedencia: 'Origen 1',
      ubicacion: 'Ubicación 1',
      detalles: 'Detalles 1',
      imagen: 'imagen.jpg', 
      stock: 10
    },
    {
      nombre: 'Microorganismo 2',
      nombreCientifico: 'Cientifico 2',
      procedencia: 'Origen 2',
      ubicacion: 'Ubicación 2',
      detalles: 'Detalles 2',
      imagen: 'imagen.jpg', 
      stock: 10
    },
    {
      
      nombre: 'Microorganismo 1',
      nombreCientifico: 'Cientifico 1',
      procedencia: 'Origen 1',
      ubicacion: 'Ubicación 1',
      detalles: 'Detalles 1',
      imagen: 'imagen.jpg', 
      stock: 10
    },
    {
      nombre: 'Microorganismo 2',
      nombreCientifico: 'Cientifico 2',
      procedencia: 'Origen 2',
      ubicacion: 'Ubicación 2',
      detalles: 'Detalles 2',
      imagen: 'imagen.jpg', 
      stock: 10
    },
  ];

  const [showModalStock, setShowModalStock] = useState(false);
  const [showModalDescription, setShowModalDescription] = useState(false);
  const [selectedMicroorganismo, setSelectedMicroorganismo] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState({
    descripcion: '',
    procedencia: '',
    ubicacion: '',
    detalles: '',
    imagen: '',
  });

  const [newStock, setNewStock] = useState(0);

  // Stock del microorganismo seleccionado
  const handleStockClick = (microorganismo) => {
    setShowModalStock(true);
    setSelectedMicroorganismo(microorganismo);
    setNewStock(microorganismo.stock);
  };

  // Editar descripción del microorganismo seleccionado
  const handleDescriptionClick = (microorganismo) => {
    setShowModalDescription(true);
    setSelectedMicroorganismo(microorganismo);
    setSelectedDescription({
      descripcion: microorganismo.descripcion,
      procedencia: microorganismo.procedencia,
      ubicacion: microorganismo.ubicacion,
      detalles: microorganismo.detalles,
      imagen: microorganismo.imagen,
    });
  };

  const handleIncreaseStock = () => {
    setNewStock(newStock + 1);
  };

  const handleDecreaseStock = () => {
    if (newStock > 0) {
      setNewStock(newStock - 1);
    }
  };

  const handleSaveStock = () => {
    setShowModalStock(false);
  };

  const handleSaveDescription = () => {
    setShowModalDescription(false);
  };

  // Filtra los elementos 
  const filteredMicroorganismos = microorganismosData.filter((microorganismo) =>
    microorganismo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 5; // Cantidad de elementos por pág
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = filteredMicroorganismos.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calcula los elementos para la pág actual
  const paginatedMicroorganismos = filteredMicroorganismos.slice(
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
            <th className="encabezado-tabla text-center align-middle">Stock</th>
          </tr>
        </thead>
        <tbody>
          {paginatedMicroorganismos.map((microorganismo, index) => (
            <tr key={index}>
              <td className="columna-nombre-tabla text-center align-middle">
                {microorganismo.nombre}
              </td>
              <td
                className="celdas-restantes-tabla text-center align-middle"
                onClick={() => handleDescriptionClick(microorganismo)}
              >
                <FontAwesomeIcon icon={faEye} />
              </td>
              <td
                className="celdas-restantes-tabla text-center align-middle"
                onClick={() => handleStockClick(microorganismo)}
              >
                {microorganismo.stock}
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

      <ModalStockMicroorganismo
        show={showModalStock}
        onHide={() => setShowModalStock(false)}
        microorganismo={selectedMicroorganismo}
        newStock={newStock}
        onIncrease={handleIncreaseStock}
        onDecrease={handleDecreaseStock}
        onSave={handleSaveStock}
      />

      <ModalDescriptionMicroorganismo
        show={showModalDescription}
        onHide={() => setShowModalDescription(false)}
        microorganismo={selectedMicroorganismo}
        onSave={handleSaveDescription}
      />
    </div>
  );
};

export default Microorganismo;