import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalReserva = ({ show, handleClose, fecha, hora, onReservar }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="ms-auto header-name">Detalles de la Reserva</Modal.Title>
      </Modal.Header >
      <Modal.Body className="modal-body-custom-description">
        <p>Fecha: {fecha}</p>
        <p>Hora: {hora}</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center modal-footer-custom">
        <Button variant="secondary" onClick={handleClose} className="modal-button btn-cancel">
          Cerrar
        </Button>
        <Button variant="primary" onClick={onReservar} className="modal-button btn-save">
          Reservar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalReserva;