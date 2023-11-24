import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../Estilos/modal.css';

const ModalEliminarConfirmar = ({ show, onHide, tipoElemento, nombreElemento, onDelete }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleConfirm = () => {
    setIsConfirmed(true);
    onDelete();
    setIsDeleted(true);
  };

  const handleClose = () => {
    setIsConfirmed(false);
    setIsDeleted(false);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered={true}>
      <Modal.Header className="modal-header-custom" closeButton>
        <Modal.Title className="ms-auto header-name">Eliminar {tipoElemento}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center modal-body-custom-general">
        {!isConfirmed && !isDeleted ? (
            <p className="modal-text">¿Estás seguro de que quieres eliminar el {tipoElemento} <strong>{nombreElemento}</strong>?</p>
          ) : isDeleted ? (
            <p className="modal-text">El {tipoElemento} <strong>{nombreElemento}</strong> ha sido eliminado exitosamente.</p>
          ) : null}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center modal-footer-custom">
        {!isConfirmed && !isDeleted ? (
          <>
            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
            <Button variant="danger" onClick={handleConfirm}>Eliminar</Button>
          </>
        ) : (
          <Button variant="primary" onClick={handleClose}>Cerrar</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminarConfirmar;