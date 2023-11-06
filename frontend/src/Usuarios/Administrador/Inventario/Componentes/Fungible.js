import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import '../Estilos/tabla.css';
import '../Estilos/paginacion.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import ModalStockFungible from './ModalStockFungible';
import ModalDescriptionFungible from './ModalDescriptionFungible';

const Fungible = ({ searchTerm }) => {
  const fungiblesData = [
    {
      // Para comprobar que no se desborde 
      nombre: 'Fungible 1',
      procedencia: 'Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1 Origen 1',
      ubicacion: 'Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1 Ubicación 1',
      detalles: 'Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1 Detalles 1',
      imagen: 'imagen.jpg', 
      stock: 10
    },
    {
      nombre: 'Fungible 2',
      procedencia: 'Origen 2 lajlakjakljaljalajlakj',
      ubicacion: 'Ubicación 2',
      detalles: 'Detalles 2',
      imagen: 'imagen.jpg', 
      stock: 500
    },
    {
      nombre: 'Fungible 3',
      procedencia: 'Origen 3',
      ubicacion: 'Ubicación 3',
      detalles: 'Detalles 3',
      imagen: 'imagen.jpg', 
      stock: 10
    },
    {
      nombre: 'Fungible 4',
      procedencia: 'Origen 3',
      ubicacion: 'Ubicación 3',
      detalles: 'Detalles 3',
      imagen: 'imagen.jpg', 
      stock: 10
    },
    {
      nombre: 'Fungible 5',
      procedencia: 'Origen 3',
      ubicacion: 'Ubicación 3',
      detalles: 'Detalles 3',
      imagen: 'imagen.jpg', 
      stock: 10
    },
    {
      nombre: 'Fungible 6',
      procedencia: 'Origen 3',
      ubicacion: 'Ubicación 3',
      detalles: 'Detalles 3',
      imagen: 'imagen.jpg', 
      stock: 10
    },
    {
      nombre: 'Fungible 7',
      procedencia: 'Origen 3',
      ubicacion: 'Ubicación 3',
      detalles: 'Detalles 3',
      imagen: 'imagen.jpg', 
      stock: 10
    },
    {
      nombre: 'Fungible 8',
      procedencia: 'Origen 3',
      ubicacion: 'Ubicación 3',
      detalles: 'Detalles 3',
      imagen: 'imagen.jpg', 
      stock: 10
    },
    {
      nombre: 'Fungible 9',
      procedencia: 'Origen 3',
      ubicacion: 'Ubicación 3',
      detalles: 'Detalles 3',
      imagen: 'imagen.jpg', 
      stock: 10
    },
    {
      nombre: 'Fungible 10',
      procedencia: 'Origen 3',
      ubicacion: 'Ubicación 3',
      detalles: 'Detalles 3',
      imagen: 'imagen.jpg', 
      stock: 10
    },
    {
      nombre: 'Fungible 11',
      procedencia: 'Origen 3',
      ubicacion: 'Ubicación 3',
      detalles: 'Detalles 3',
      imagen: 'imagen.jpg', 
      stock: 10
    },
    {
      nombre: 'Fungible 12',
      procedencia: 'Origen 3',
      ubicacion: 'Ubicación 3',
      detalles: 'Detalles 3',
      imagen: 'imagen.jpg', 
      stock: 10
    },
    {
      nombre: 'Fungible 13',
      procedencia: 'Origen 3',
      ubicacion: 'Ubicación 3',
      detalles: 'Detalles 3',
      imagen: 'imagen.jpg', 
      stock: 10
    },
    
  ];

  const [showModalStock, setShowModalStock] = useState(false);
  const [showModalDescription, setShowModalDescription] = useState(false);
  const [selectedFungible, setSelectedFungible] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState({
    descripcion: '',
    procedencia: '',
    ubicacion: '',
    detalles: '',
    imagen: '',
  });

  const [newStock, setNewStock] = useState(0);

  // Stock del fungible seleccionado
  const handleStockClick = (fungible) => {
    setShowModalStock(true);
    setSelectedFungible(fungible);
    setNewStock(fungible.stock);
  };

  // Editar descripción del fungible seleccionado
  const handleDescriptionClick = (fungible) => {
    setShowModalDescription(true);
    setSelectedFungible(fungible);
    setSelectedDescription({
      descripcion: fungible.descripcion,
      procedencia: fungible.procedencia,
      ubicacion: fungible.ubicacion,
      detalles: fungible.detalles,
      imagen: fungible.imagen,
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
  const filteredFungibles = fungiblesData.filter((fungible) =>
    fungible.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 5; // Cantidad de elementos por pág
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = filteredFungibles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calcula los elementos para la pág actual
  const paginatedFungibles = filteredFungibles.slice(
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
          {paginatedFungibles.map((fungible, index) => (
            <tr key={index}>
              <td className="columna-nombre-tabla text-center align-middle">
                {fungible.nombre}
              </td>
              <td
                className="celdas-restantes-tabla text-center align-middle"
                onClick={() => handleDescriptionClick(fungible)}
              >
                <FontAwesomeIcon icon={faEye} />
              </td>
              <td
                className="celdas-restantes-tabla text-center align-middle"
                onClick={() => handleStockClick(fungible)}
              >
                {fungible.stock}
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

      <ModalStockFungible
        show={showModalStock}
        onHide={() => setShowModalStock(false)}
        fungible={selectedFungible}
        newStock={newStock}
        onIncrease={handleIncreaseStock}
        onDecrease={handleDecreaseStock}
        onSave={handleSaveStock}
      />

      <ModalDescriptionFungible
        show={showModalDescription}
        onHide={() => setShowModalDescription(false)}
        fungible={selectedFungible}
        onSave={handleSaveDescription}
      />
    </div>
  );
};

export default Fungible;
