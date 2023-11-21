import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';

const ModalCancelarReserva = ({ show, handleClose, fecha, hora, onCancelarReserva }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="ms-auto header-name">Confirmar Reserva</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom-description">
        <p>Fecha: {fecha}</p>
        <p>Hora: {hora}</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center modal-footer-custom">
        <Button variant="secondary" onClick={handleClose} className="modal-button btn-cancel">
          Cerrar
        </Button>
        <Button variant="danger" onClick={onCancelarReserva} className="modal-button btn-save">
          Cancelar Reserva
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCancelarReserva;