import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import '../Estilos/modal.css';

const ModalDescriptionMicroorganismo = ({ show, onHide, microorganismo, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMicroorganismo, setEditedMicroorganismo] = useState({});

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedMicroorganismo({
      nombre: microorganismo.nombre,
      nombreCientifico: microorganismo.nombreCientifico,
      procedencia: microorganismo.procedencia,
      detalles: microorganismo.detalles,
    });
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSave(editedMicroorganismo);
    onHide();
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    onHide(); 
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedMicroorganismo({
      ...editedMicroorganismo,
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
              value={editedMicroorganismo.nombre}
              onChange={handleInputChange}
              className="custom-input"
            />
          ) : (
            microorganismo ? microorganismo.nombre : "No hay datos disponibles"
          )}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body-custom-description">
  {microorganismo && (
    <div className="d-flex">
      <div className="black-square"></div>
      <div className="text-container">
        <div className="data-item">
          <p>Nombre Científico:</p>
          {isEditing ? (
            <Form.Control
              type="text"
              name="nombreCientifico"
              value={editedMicroorganismo.nombreCientifico}
              onChange={handleInputChange}
              className="custom-input"
            />
          ) : (
            <div className="scrollable-text">
              <i>{microorganismo.nombreCientifico}</i> 
            </div>
          )}
        </div>
        <div className="data-item">
          <p>Procedencia:</p>
          {isEditing ? (
            <Form.Control
              type="text"
              name="procedencia"
              value={editedMicroorganismo.procedencia}
              onChange={handleInputChange}
              className="custom-input"
            />
          ) : (
            <div className="scrollable-text">{microorganismo.procedencia}</div>
          )}
        </div>
        <div className="data-item">
          <p>Detalles:</p>
          {isEditing ? (
            <Form.Control
              as="textarea"
              name="detalles"
              value={editedMicroorganismo.detalles}
              onChange={handleInputChange}
              className="custom-input"
            />
          ) : (
            <div className="scrollable-text">{microorganismo.detalles}</div>
          )}
        </div>
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

export default ModalDescriptionMicroorganismo;