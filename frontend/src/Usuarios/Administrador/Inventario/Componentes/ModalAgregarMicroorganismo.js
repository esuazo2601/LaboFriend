import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import '../Estilos/modal.css';
import {postMicroorganismo} from '../../../../api_service/microorganismo_api'
import { de } from 'date-fns/locale';
const ModalAgregarMicroorganismo = (props) => {
  
  const [nombre, setNombre] = useState('');
  const [nombreCientifico, setNombreCientifico] = useState('');
  const [procedencia, setProcedencia] = useState('');
  const [detalles, setDetalles] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async() => {
    if (!nombre || !nombreCientifico || !procedencia) {
      setShowAlert(true);
      setSuccess(false);
      return;
    }else{
      try{
        const resp = await postMicroorganismo(nombreCientifico, nombre, procedencia,detalles);
        console.log(resp)
      }catch(error){
        alert('Error al agregar microorganismo')
        console.log(error);
      }
    }
    console.log({ nombre, nombreCientifico, procedencia});
    setSuccess(true);
    setShowAlert(false);
  };

  const handleClose = () => {
    setNombre('');
    setNombreCientifico('');
    setProcedencia('');
    setShowAlert(false);
    setSuccess(false);
    props.onHide();
  };

  useEffect(() => {
    if (!props.show) {
      handleClose();
    }
  }, [props.show]);

  return (
    <Modal {...props} centered>
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="ms-auto header-name">Agregar Microorganismo</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center modal-body-custom-general">
        {showAlert && !success && <Alert variant="warning">Todos los campos son obligatorios</Alert>}
        {success && <Alert variant="success">Microorganismo agregado con éxito</Alert>}
        <Form>
          <Form.Group>
            <Form.Label >Nombre</Form.Label>
            <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nombre Científico</Form.Label>
            <Form.Control type="text" value={nombreCientifico} onChange={(e) => setNombreCientifico(e.target.value)} />
          </Form.Group>
          <Form.Group >
            <Form.Label>Procedencia</Form.Label>
            <Form.Control type="text" value={procedencia} onChange={(e) => setProcedencia(e.target.value)} />
          </Form.Group>
          <Form.Group >
            <Form.Label>Detalles</Form.Label>
            <Form.Control as="textarea" rows={3} value={detalles} onChange={(e) => setDetalles(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center modal-footer-custom">
        {!success ? (
          <>
            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
            <Button variant="primary" onClick={handleSubmit}>Agregar</Button>
          </>
        ) : (
          <Button variant="primary" onClick={handleClose}>Cerrar</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAgregarMicroorganismo;