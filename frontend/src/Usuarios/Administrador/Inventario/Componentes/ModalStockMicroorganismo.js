import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../Estilos/modal.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';


const ModalStockMicroorganismo = ({ show, onHide, microorganismo, newStock, onIncrease, onDecrease, onSave }) => {
  return (
    <Modal show={show} onHide={onHide} centered={true}>
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="ms-auto header-name">{microorganismo && microorganismo.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center modal-body-custom">
        <Form>
          <Form.Group className="d-flex align-items-center justify-content-center">
            <Button variant="primary" onClick={onDecrease} className="button-icon" >
              <FontAwesomeIcon icon={faMinus} />
            </Button>
            <span className="ml-2 mr-2 header-name">{newStock}</span>
            <Button variant="primary" onClick={onIncrease} className="button-icon">
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center modal-footer-custom">
        <Button variant="secondary" onClick={onHide} className="modal-button btn-cancel">
          Cancelar
        </Button>
        <Button variant="primary" onClick={onSave} className="modal-button btn-save">
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalStockMicroorganismo;

