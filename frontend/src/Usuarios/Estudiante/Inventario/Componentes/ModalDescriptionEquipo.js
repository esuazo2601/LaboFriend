import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import '../Estilos/modal.css';
import { getSala } from '../../../../api_service/salas_api';

const ModalDescriptionEquipo = ({ show, onHide, equipo }) => {
  const [nombreSala, setNombreSala] = useState("");

  useEffect(() => {
    try {
      const getData = async () => {
        if (equipo && equipo.id_sala) {
          const nombre = await getSala(equipo.id_sala);
          setNombreSala(nombre ? nombre.nombre : '');
        } else {
          setNombreSala('');
        }
      };
      getData();
    } catch (error) {
      setNombreSala('');
    }
  }, [equipo]);

  return (
    <Modal show={show} onHide={onHide} centered={true} dialogClassName="modal-wider">
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="ms-auto header-name">
          {equipo ? equipo.nombre : "No hay datos disponibles"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom-description">
        {equipo && (
          <div className="d-flex">
            <div className="black-square"></div>
            <div className="text-container">
              <div className="data-item">
                <p>Sala:</p>
                <div className="scrollable-text">{nombreSala}</div>
              </div>
              <div className="data-item">
                <p>Detalles:</p>
                <div className="scrollable-text">{equipo.descripcion}</div>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalDescriptionEquipo;
