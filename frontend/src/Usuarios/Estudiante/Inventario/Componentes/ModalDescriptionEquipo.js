import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../Estilos/modal.css';

const ModalDescriptionEquipo = ({ show, onHide, equipo }) => {
  return (
    <Modal show={show} onHide={onHide} centered={true} dialogClassName="modal-wider">
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="ms-auto header-name">
          {equipo ? equipo.nombre : "No hay datos disponibles"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom-description">
        {equipo && (
          <div className="d-flex">
            <div className="black-square"></div>
            <div className="text-container">
              <div className="data-item">
                <p>Ubicación:</p>
                <div className="scrollable-text">{equipo.ubicacion}</div>
              </div>
              <div className="data-item">
                <p>Modo de uso:</p>
                <div className="scrollable-text">{equipo.modoUso}</div>
              </div>
              <div className="data-item">
                <p>Detalles:</p>
                <div className="scrollable-text">{equipo.detalles}</div>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center modal-footer-custom">
        <Button variant="secondary" onClick={onHide} className="modal-button btn-cancel">
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDescriptionEquipo;
