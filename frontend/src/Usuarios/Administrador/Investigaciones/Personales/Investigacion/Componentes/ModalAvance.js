import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import '../Estilos/boton-modal-avance.css';
import '../Estilos/modal-avance.css';
import { postIncidencia } from '../../../../../../api_service/investigaciones_api';

function ModalAvance(props) {
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [success, setSuccess] = useState(false);

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleNewAvance = async()=> {
        if(!titulo){
            setShowAlert(true);
            setShow(false);
            return
        }else{
            try{
                const fechaActual = new Date()
                fechaActual.setMilliseconds(0)
                console.log(titulo)
                console.log(descripcion)
                const resp = await postIncidencia(titulo, descripcion, fechaActual,props.id)
                console.log("resp: ",resp)
                if(resp){
                    console.log('Avance creado con exito:', resp)
                    props.onAddInvestigacion()
                    setSuccess(true)
                    setShowAlert(false)
                    setShow(false)
                    setTitulo('')
                    setDescripcion('')
                }else{
                    console.error('Error en la creación del avance')
                    setSuccess(false)
                    setShowAlert(true)
                    setTitulo('')
                    setDescripcion('')
                }
            }catch(error){
                console.error('Error en la función handleNewAvance: ', error);
                setSuccess(false);
                setShowAlert(true);
                setTitulo('')
                setDescripcion('')
            }
        }
    }

    return (
        <>
            <Button className='boton-modal-avance' onClick={handleShow}>Agregar Avance</Button>

            <Modal className='modal-avance' show={show} onHide={handleClose}>
                <Modal.Header className='modal-header-custom' closeButton>
                    <Modal.Title className="ms-auto header-name">Agregar Avance</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-custom-description">
                    <Form style={{ width: "100%" }}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className='label-custom'>Título</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Título"
                                autoFocus
                                required
                                value={titulo}
                                onChange={(e)=>{setTitulo(e.target.value)}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className='label-custom'>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                placeholder='Descripción'
                                value={descripcion}
                                onChange={(e)=>{setDescripcion(e.target.value)}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlFile_archivo">
                            <Form.Label className='label-custom'>Archivo</Form.Label>
                            <Form.Control
                                type="file"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlFile_imagen">
                            <Form.Label className='label-custom'>Imagen</Form.Label>
                            <Form.Control
                                type="file"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center modal-footer-custom'>
                    <Button className="modal-button btn-cancel" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button className="modal-button btn-save" onClick={handleNewAvance}>
                        Agregar Avance
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAvance;