import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import '../Estilos/modal.css';

const ModalDescriptionFungible = ({ show, onHide, fungible, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFungible, setEditedFungible] = useState({});

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedFungible({
      nombre: fungible.nombre,
      tipo: fungible.tipo,
      ubicacion: fungible.ubicacion,
      // detalles: fungible.detalles,
    });
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSave(editedFungible);
    onHide();
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    onHide(); 
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedFungible({
      ...editedFungible,
      [name]: value,
    });
  };

  return (
    <Modal show={show} onHide={() => { onHide(); handleCancelClick(); }} centered={true} dialogClassName="modal-wider">
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="ms-auto header-name">
          {isEditing ? (
            <Form.Control
              type="text"
              name="nombre"
              value={editedFungible.nombre}
              onChange={handleInputChange}
              className="custom-input"
            />
          ) : (
            fungible ? fungible.nombre : "No hay datos disponibles"
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom-description">
        {fungible && (
          <div className="d-flex">
            <div className="black-square"></div>
            <div className="text-container">
              <div className="data-item">
                <p>Tipo:</p>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="procedencia"
                    value={editedFungible.tipo}
                    onChange={handleInputChange}
                    className="custom-input"
                  />
                ) : (
                  <div className="scrollable-text" >{fungible.tipo}</div>
                )}
              </div>
              <div className="data-item">
                <p>Ubicación:</p>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="ubicacion"
                    value={editedFungible.ubicacion}
                    onChange={handleInputChange}
                    className="custom-input"
                  />
                ) : (
                  <div className="scrollable-text">{fungible.ubicacion}</div>
                )}
              </div>
              {/* <div className="data-item">
                <p>Detalles:</p>
                {isEditing ? (
                  <Form.Control
                    as="textarea"
                    name="detalles"
                    value={editedFungible.detalles}
                    onChange={handleInputChange}
                    className="custom-input"
                  />
                ) : (
                  <div className="scrollable-text">{fungible.detalles}</div>
                )}
              </div> */}
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center modal-footer-custom">
        {isEditing ? (
          <>
            <Button variant="secondary" onClick={handleCancelClick} className="modal-button btn-cancel">
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSaveClick} className="modal-button btn-save">
              Guardar
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={handleEditClick} className="modal-button btn-save">
            Editar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDescriptionFungible;