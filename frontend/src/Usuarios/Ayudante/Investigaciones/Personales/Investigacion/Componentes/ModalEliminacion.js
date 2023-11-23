import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';



const EliminarAvance = ({ show, avance, onHide, onEliminarAvance }) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        onHide();
    };


    return (
        <div>
            {/* Modal */}
            <Modal show={show} onHide={() => { onHide(); closeModal(); }}>
                <Modal.Header closeButton className="modal-header-custom">
                    <Modal.Title className="ms-auto header-name">Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-custom-description" style={{ textAlign: "center" }} >
                    <p>¿Está seguro que desea eliminar el {avance ? avance.avance : "No hay datos disponibles"}?</p>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center modal-footer-custom">
                    <Button variant="primary" onClick={closeModal} className="modal-button btn-cancel">
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={onEliminarAvance} className="modal-button btn-save">
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
};

export default EliminarAvance;