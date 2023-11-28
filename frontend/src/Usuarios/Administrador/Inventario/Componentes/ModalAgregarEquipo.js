import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../Estilos/modal.css';
import {postEquipo} from '../../../../api_service/equipo_api';

const ModalAgregarEquipo = (props) => {
  const [nombre, setNombre] = useState('');
  const [sala, setSala] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaMantenimiento, setFechaMantenimiento] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async() => {
    if (!nombre || !fechaMantenimiento || !descripcion) {
      setShowAlert(true);
      setSuccess(false);
      return;
    }else{
      try{
        const resp = await postEquipo(nombre,descripcion,fechaMantenimiento);
        console.log(resp)
        props.onAddEquipo()
      }catch(error){
        alert('Error al agregar microorganismo')
        console.log(error);
      }
    }
    //console.log({ nombre, sala, descripcion});
    setSuccess(true);
    setShowAlert(false);
  };

  const handleClose = () => {
    setNombre('');
    setSala('');
    setDescripcion('');
    setFechaMantenimiento(null);
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
        <Modal.Title className="ms-auto header-name">Agregar Equipo</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center modal-body-custom-general">
        {showAlert && !success && <Alert variant="warning">Todos los campos son obligatorios</Alert>}
        {success && <Alert variant="success">Equipo agregado con éxito</Alert>}
        <Form>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </Form.Group>
          {/* <Form.Group>
            <Form.Label>Sala</Form.Label>
            <Form.Control type="text" value={sala} onChange={(e) => setSala(e.target.value)} />
          </Form.Group> */}
          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha de Mantenimiento</Form.Label>
            <div>
              <DatePicker 
                selected={fechaMantenimiento} 
                onChange={(date) => setFechaMantenimiento(date)} 
                isClearable 
                placeholderText="  Sin fecha"
              />
            </div>
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

export default ModalAgregarEquipo;