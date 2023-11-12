import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import '../Estilos/boton-modal-avance.css';
import '../Estilos/modal-avance.css';

function ModalAvance() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className='boton-modal-avance' onClick={handleShow}>Agregar Avance</Button>

            <Modal className='modal-avance' show={show} onHide={handleClose}>
                <Modal.Header className='modal-color' closeButton>
                    <Modal.Title>Agregar Avance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className='label-custom'>Título</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Título"
                                autoFocus
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className='label-custom'>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                placeholder='Descripción' />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlFile_archivo">
                            <Form.Label className='label-custom'>Archivo</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="Título"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlFile_imagen">
                            <Form.Label className='label-custom'>Imagen</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="Título"
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='modal-color'>
                    <Button className='boton-cerrar' onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button className='boton-agregar' onClick={handleClose}>
                        Agregar Avance
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAvance;