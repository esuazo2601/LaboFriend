import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import '../Estilos/modal.css';
import {postProducto} from '../../../../api_service/inventario_api'

const ModalAgregarFungible = (props) => {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  //const [ubicacion, setUbicacion] = useState('');
  const [stock, setStock] = useState('');
  //const [imagen, setImagen] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async() => {
    if (!nombre || !tipo || !stock ) {
      setShowAlert(true);
      setSuccess(false);
      return;
    }else{
      try{
        const resp = await postProducto(nombre,stock,tipo)
        console.log(resp)
        props.onAddFungible()
      }catch(error){
        alert('Falla al intentar agregar fungible')
        console.log("Fallo al intentar agregar")
      }
    }
    console.log({ nombre, tipo, stock });
    setSuccess(true);
    setShowAlert(false);
  };

  const handleClose = () => {
    setNombre('');
    setTipo('');
    //setUbicacion('');
    setStock('');
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
        <Modal.Title className="ms-auto header-name">Agregar Fungible</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center modal-body-custom-general">
        {showAlert && !success && <Alert variant="warning">Todos los campos son obligatorios</Alert>}
        {success && <Alert variant="success">Fungible agregado con éxito</Alert>}
        <Form>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tipo</Form.Label>
            <Form.Control type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Cantidad</Form.Label>
            <Form.Control type="text" value={stock} onChange={(e) => setStock(e.target.value)} />
          </Form.Group>
            
            {/* <Form.Group>
            <Form.Label>Imagen</Form.Label>
            <Form.Control type="file" onChange={(e) => setImagen(e.target.files[0])} />
          </Form.Group> */}
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

export default ModalAgregarFungible;