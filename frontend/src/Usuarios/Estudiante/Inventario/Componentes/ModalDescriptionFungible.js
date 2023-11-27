import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../Estilos/modal.css';

const ModalDescriptionFungible = ({ show, onHide, fungible }) => {
  return (
    <Modal show={show} onHide={onHide} centered={true} dialogClassName="modal-wider">
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="ms-auto header-name">
          {fungible ? fungible.nombre : "No hay datos disponibles"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom-description">
        {fungible && (
          <div className="d-flex">
            <div className="black-square"></div>
            <div className="text-container">
              <div className="data-item">
                <p>Procedencia:</p>
                <div className="scrollable-text">{fungible.procedencia}</div>
              </div>
              <div className="data-item">
                <p>Ubicación:</p>
                <div className="scrollable-text">{fungible.ubicacion}</div>
              </div>
              <div className="data-item">
                <p>Detalles:</p>
                <div className="scrollable-text">{fungible.detalles}</div>
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

export default ModalDescriptionFungible;
