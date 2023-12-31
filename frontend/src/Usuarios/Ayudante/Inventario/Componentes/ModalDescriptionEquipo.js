import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import '../Estilos/modal.css';
import { getSala } from '../../../../api_service/salas_api';

const ModalDescriptionEquipo = ({ show, onHide, equipo, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEquipo, setEditedEquipo] = useState({});
  const [nombreSala, setNombreSala] = useState("");
  useEffect(()=>{
    try {
      const getData = async () => {
        if(equipo && equipo.id_sala){
          const nombre = await getSala(equipo.id_sala)
          console.log("nombre sala: ",nombre.nombre)
          if(nombre){
            setNombreSala(nombre.nombre)
          }else{
            setNombreSala('')
          }
        }
        else{
          setNombreSala('')
        }
      };
      getData();
    } catch (error) {
      setNombreSala('')
    }
  },[equipo])
  const handleEditClick = () => {
    setIsEditing(true);
    setEditedEquipo({
      nombre: equipo.nombre,
      sala: nombreSala,
      descripcion: equipo.descripcion,
    });
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSave(editedEquipo);
    onHide();
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    onHide(); 
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedEquipo({
      ...editedEquipo,
      [name]: value,
    });
  };

  return (
    <Modal show={show} onHide={() => { onHide(); handleCancelClick(); }} centered={true} dialogClassName="modal-wider">
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="ms-auto header-name">
          {isEditing ? (
            <Form.Control
              type="text"
              name="nombre"
              value={editedEquipo.nombre}
              onChange={handleInputChange}
              className="custom-input"
            />
          ) : (
            equipo ? equipo.nombre : "No hay datos disponibles"
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom-description">
        {equipo && (
          <div className="d-flex">
            <div className="black-square"></div>
            <div className="text-container">
              <div className="data-item">
                <p>Sala:</p>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="sala"
                    value={editedEquipo.sala}
                    onChange={handleInputChange}
                    className="custom-input"
                  />
                ) : (
                  <div className="scrollable-text">{nombreSala}</div>
                )}
              </div>
          
              <div className="data-item">
                <p>Detalles:</p>
                {isEditing ? (
                  <Form.Control
                    as="textarea"
                    name="descripcion"
                    value={editedEquipo.descripcion}
                    onChange={handleInputChange}
                    className="custom-input"
                  />
                ) : (
                  <div className="scrollable-text">{equipo.descripcion}</div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center modal-footer-custom">
        {isEditing ? (
          <>
            <Button variant="secondary" onClick={handleCancelClick} className="modal-button btn-cancel">
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSaveClick} className="modal-button btn-save">
              Guardar
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={handleEditClick} className="modal-button btn-save">
            Editar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDescriptionEquipo;