import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../Estilos/modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';

const ModalMantenimientoEquipo = ({ show, onHide, equipo, oldDate, newDate, onSave }) => {
  const [selectedNewDate, setSelectedNewDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedNewDate(date);
  };
  
  useEffect(() => {
    if (!show) {
      setSelectedNewDate(null);
    }
  }, [show]);

  const handleSave = () => {
    onSave(selectedNewDate);
    onHide();
  };

  const handleCancel = () => {
    setSelectedNewDate(null);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleCancel} centered={true} dialogClassName="modal-wider-maintenance">
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="ms-auto header-name">{equipo && equipo.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center modal-body-custom-maintenance">
        <Form>
          <Form.Group className="icon-and-date d-flex align-items-center justify-content-center">
            <FontAwesomeIcon icon={faCalendar} className="mr-2 iconCalender" />
            <span className="header-name">Fecha anterior: {oldDate}</span>
          </Form.Group>
          <Form.Group className="d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faCalendar} className="mr-2 iconCalender" />
              <span className="header-name">Nueva fecha:</span>
            </div>
            <DatePicker
              selected={selectedNewDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              locale={es}
              className="custom-input2" 
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center modal-footer-custom">
        <Button variant="secondary" onClick={handleCancel} className="modal-button btn-cancel">
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave} className="modal-button btn-save">
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalMantenimientoEquipo;



