import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';

const ModalEditarUsuario = ({ show, onHide, usuario, tipoUsuarioActual, onActualizarTipoUsuario }) => {
    const [tipoSeleccionado, setTipoSeleccionado] = useState('');
    const [error, setError] = useState(false);
    const [cambioExitoso, setCambioExitoso] = useState(false);
    const [tipoUsuarioPrevio, setTipoUsuarioPrevio] = useState(tipoUsuarioActual); 

  const opcionesTipo = {
    'Estudiante': ['Administrador', 'Ayudante'],
    'Administrador': ['Estudiante', 'Ayudante'],
    'Ayudante': ['Administrador', 'Estudiante']
  };

  const handleTipoClick = (tipo) => {
    setTipoSeleccionado(tipo);
    setError(false);
  };

  const confirmarCambio = () => {
    if (!tipoSeleccionado) {
      setError(true);
      return;
    }
    setTipoUsuarioPrevio(tipoUsuarioActual); 
    onActualizarTipoUsuario(tipoSeleccionado);
    setCambioExitoso(true);
  };

  const handleClose = () => {
    setTipoSeleccionado('');
    setError(false);
    setCambioExitoso(false);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className="modal-header-custom"closeButton>
        <Modal.Title className="ms-auto header-name">Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center modal-body-custom-general">
        {cambioExitoso ? (
          <p>{`El usuario ${usuario.nombre} ha sido cambiado de ${tipoUsuarioPrevio} a ${tipoSeleccionado} con éxito.`}</p>
        ) : usuario ? (
          <>
            <p>{`Nombre del usuario: ${usuario.nombre}`}</p>
            <p>{`Tipo de usuario actual: ${tipoUsuarioActual}`}</p>
            <p>Cambiar a:</p> 
            <div>
              {opcionesTipo[tipoUsuarioActual].map(tipo => (
                <Button 
                  key={tipo} 
                  variant={tipoSeleccionado === tipo ? 'primary' : 'secondary'} 
                  onClick={() => handleTipoClick(tipo)} 
                  style={{ marginRight: '10px' }}
                >
                  {tipo}
                </Button>
              ))}
            </div>
            {error && <Alert variant="warning" style={{ marginTop: '15px' }}>Debe seleccionar un tipo de usuario para poder hacer el cambio</Alert>}
          </>
        ) : null}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center modal-footer-custom">
        {cambioExitoso ? (
          <Button variant="primary" onClick={handleClose}>Cerrar</Button>
        ) : (
          <>
            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
            <Button variant="primary" onClick={confirmarCambio}>Aceptar</Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditarUsuario;