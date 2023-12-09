import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../Estilos/modal-detalle.css';


const DetalleAvance = ({ show, avance, onHide }) => {
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
            <Modal show={show} onHide={() => { onHide(); closeModal(); }} centered={true} dialogClassName="modal-wider">
                <Modal.Header closeButton className="modal-header-custom">
                    <Modal.Title className="ms-auto header-name modal-desborde">
                        {avance ? avance.avance : "No hay datos disponibles"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-custom-description">
                    <div className="row">
                        <div className="col-6">
                            <img src="https://caracoltv.brightspotcdn.com/dims4/default/aed15c5/2147483647/strip/true/crop/1125x728+0+0/resize/1000x647!/quality/90/?url=http%3A%2F%2Fcaracol-brightspot.s3.amazonaws.com%2F7f%2F34%2Fb44f2646433eb28932765faa2949%2Fgunther-vi.jpg" alt="" style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div className="col-6">
                            <p className='descripcion-modal'>
                                {avance ? avance.observacion : "No hay descipción disponible"}
                            </p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center modal-footer-custom">
                    <Button variant="primary" onClick={closeModal} className="modal-button btn-cancel">
                        Cerrar
                    </Button>
                    <Button variant="primary" className="modal-button btn-save">
                        Descargar Archivo
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
};

export default DetalleAvance;
