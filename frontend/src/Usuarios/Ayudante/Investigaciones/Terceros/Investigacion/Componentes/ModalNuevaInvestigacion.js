import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import '../Estilos/boton-modal-avance.css';
import '../Estilos/modal-avance.css';
import { postInvestigacion, postTrabjando } from '../../../../../../api_service/investigaciones_api';

function ModalAvance(props) {
    const [show, setShow] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [success, setSuccess] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleNewInvestigacion = async() => {
        if (!titulo || !descripcion) {
            setShowAlert(true);
            setSuccess(false);
            return;
        }else{
            try{
              const fechaActual = new Date()
              fechaActual.setMilliseconds(0)
              const resp = await postInvestigacion(titulo, descripcion, fechaActual)
              console.log("resp: ",resp[0].id)
              if(resp && resp[0].id){
                const emailTrabajador = localStorage.getItem('email')
                const idAgenda = resp[0].id 
                const respTrabajando = await postTrabjando(emailTrabajador, idAgenda)
                console.log("trabajando: ",respTrabajando)
                if(respTrabajando){
                    console.log('Investigación y asociación exitosas:', resp, respTrabajando)
                    props.onAddInvestigacion()
                    setSuccess(true)
                    setShowAlert(false)
                    setShow(false)
                }else{
                    console.error('Error al asociar la investigación al usuario')
                    setSuccess(false)
                    setShowAlert(true)
                }
              }else{
                console.error('Error al crear la investigación');
                setSuccess(false);
                setShowAlert(true);
              }
            }catch(error){
                console.error('Error en la función handleNewInvestigacion:', error);
                setSuccess(false);
                setShowAlert(true);
            }
          }
    }

    return (
        <>
            <Button className='boton-modal-avance' onClick={handleShow}>Agregar Investigación</Button>

            <Modal className='modal-avance' show={show} onHide={handleClose}>
                <Modal.Header className='modal-header-custom' closeButton>
                    <Modal.Title className="ms-auto header-name">Agregar Investigación</Modal.Title>
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
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className='label-custom'>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                placeholder='Descripción'
                                value={descripcion} 
                                onChange={(e) => setDescripcion(e.target.value)}    
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center modal-footer-custom'>
                    <Button className="modal-button btn-cancel" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button className="modal-button btn-save" onClick={handleNewInvestigacion}>
                        Agregar Investigación
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAvance;