import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../Estilos/modal.css';

const ModalAgregarEquipo = (props) => {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [detalles, setDetalles] = useState('');
  const [modoUso, setModoUso] = useState('');
  const [fechaMantenimiento, setFechaMantenimiento] = useState(null);
  const [imagen, setImagen] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!nombre || !ubicacion || !detalles || !modoUso || !imagen) {
      setShowAlert(true);
      setSuccess(false);
      return;
    }
    console.log({ nombre, ubicacion, detalles, modoUso, fechaMantenimiento, imagen });
    setSuccess(true);
    setShowAlert(false);
  };

  const handleClose = () => {
    setNombre('');
    setUbicacion('');
    setDetalles('');
    setModoUso('');
    setFechaMantenimiento(null);
    setImagen(null);
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
          <Form.Group>
            <Form.Label>Ubicación</Form.Label>
            <Form.Control type="text" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Detalles</Form.Label>
            <Form.Control as="textarea" rows={3} value={detalles} onChange={(e) => setDetalles(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Modo de Uso</Form.Label>
            <Form.Control as="textarea" rows={3} value={modoUso} onChange={(e) => setModoUso(e.target.value)} />
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
          <Form.Group>
            <Form.Label>Imagen</Form.Label>
            <Form.Control type="file" onChange={(e) => setImagen(e.target.files[0])} />
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