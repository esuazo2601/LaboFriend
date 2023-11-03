import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import '../Estilos/tabla.css';
import ModalStock from './ModalStock';

const Fungible = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFungible, setSelectedFungible] = useState(null);
  const [newStock, setNewStock] = useState(0);

  const fungiblesData = [
    { nombre: 'Fungible 1', descripcion: 'Descripción del fungible 1', stock: 10 },
    { nombre: 'Fungible 2', descripcion: 'Descripción del fungible 2', stock: 500 },
    { nombre: 'Fungible 3', descripcion: 'Descripción del fungible 3', stock: 10 },
  ];

  const handleStockClick = (fungible) => {
    setShowModal(true);
    setSelectedFungible(fungible);
    setNewStock(fungible.stock);
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
    setShowModal(false);
  };

  return (
    <div>
      <Table striped bordered hover>
      <thead>
        <tr> 
          <th className="encabezado-tabla">Nombre</th> 
          <th className="encabezado-tabla">Descripción</th> 
          <th className="encabezado-tabla">Stock</th> 
        </tr>
      </thead>
        <tbody>
          {fungiblesData.map((fungible, index) => (
            <tr key={index}>
              <td className="columna-nombre-tabla">{fungible.nombre}</td>
              <td className="celdas-restantes-tabla">{fungible.descripcion}</td>
              <td className="celdas-restantes-tabla" onClick={() => handleStockClick(fungible)}>
                {fungible.stock}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ModalStock
        show={showModal}
        onHide={() => setShowModal(false)}
        fungible={selectedFungible}
        newStock={newStock}
        onIncrease={handleIncreaseStock}
        onDecrease={handleDecreaseStock}
        onSave={handleSaveStock}
      />
    </div>
  );
};

export default Fungible;
