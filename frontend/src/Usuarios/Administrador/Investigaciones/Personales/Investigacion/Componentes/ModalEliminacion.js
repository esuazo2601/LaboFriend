import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';



const EliminarInvestigacion = ({ show, onHide, id, onDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const handleDelete = () => {
        setIsConfirmed(true);
        onDelete(id);
        setIsDeleted(true);
    };

    const closeModal = () => {
        setIsConfirmed(false);
        setIsDeleted(false);
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
                    {!isConfirmed && !isDeleted ?(
                        <p className="modal-text">¿Estás seguro de que quieres eliminar la investigación?</p>
                    ): isDeleted?(
                        <p className="modal-text">La investigación se ha eliminado con éxito</p>
                    ):null
                    }
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center modal-footer-custom">
                {!isConfirmed && !isDeleted ? (
                    <>
                        <Button variant="primary" onClick={closeModal} className="modal-button btn-cancel">Cancelar</Button>
                        <Button variant="danger" onClick={handleDelete} className="modal-button btn-save">Eliminar</Button>
                    </>
                    
                ):(
                    <Button variant="primary" onClick={closeModal}>Cerrar</Button>
                )
                }
                    
                </Modal.Footer>
            </Modal>
        </div >
    );
};

export default EliminarInvestigacion;