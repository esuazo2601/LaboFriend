import './HoraReserva.css';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import ModalReserva from './ModalReserva';
import ModalCancelarReserva from './ModalCancelarReserva';

const HoraReserva = ({ fechaSeleccionada }) => {
  const horasReservadas = ['10:15 AM', '02:15 PM', '05:15 PM'];
  const todasLasHoras = ['08:15 AM', '09:15 AM', '10:15 AM', '11:15 AM', '12:15 PM', '01:15 PM', '02:15 PM', '03:15 PM', '04:15 PM', '05:15 PM'];

  const [modalReservaOpen, setModalReservaOpen] = useState(false);
  const [modalCancelarReservaOpen, setModalCancelarReservaOpen] = useState(false);
  const [fechaHoraReserva, setFechaHoraReserva] = useState('');
  const [horasUsuario, setHorasUsuario] = useState([]);

  useEffect(() => {
    const horasAgendadasUsuario = ['11:15 AM', '03:15 PM', '04:15 PM'];
    setHorasUsuario([...horasAgendadasUsuario]);
  }, []);

  const handleHoraSeleccionada = (hora) => {
    const fechaReserva = format(fechaSeleccionada, 'dd/MM/yy', { locale: esLocale });
    setFechaHoraReserva({ fecha: fechaReserva, hora });
    setModalReservaOpen(true);
  };

  const handleReservar = () => {
    // Editar para reservas la hora
    setModalReservaOpen(false);
  };

  const handleCancelarReserva = () => {
    // Editar para cancelar la reserva
    setModalCancelarReservaOpen(false);
  };

  const handleCloseModals = () => {
    setModalReservaOpen(false);
    setModalCancelarReservaOpen(false);
  };

  return (
    <div className="hora-reserva-container d-flex">
      <div className="horas-column">
        <h2 className="letra-mediana">Horas para el {format(fechaSeleccionada, "EEEE d 'de' MMMM 'de' yyyy", { locale: esLocale })}</h2>
        {todasLasHoras.map((hora, horaIndex) => (
          <div key={horaIndex} className="hora-item">
            <span>{hora}</span>
            <Button
              onClick={() => handleHoraSeleccionada(hora)}
              className={`hora-disponible${horasReservadas.includes(hora) || horasUsuario.includes(hora) ? ' no-disponible' : ' '}`}
              disabled={horasReservadas.includes(hora) || horasUsuario.includes(hora)}
            >
              Reservar
            </Button>
          </div>
        ))}
      </div>
      <div className="horas-column-agendadas ml-4">
        <h2 className='letra-mediana'>Horas agendadas del usuario</h2>
        {horasUsuario.map((hora, index) => (
          <div key={index} className="hora-agendada d-flex align-items-center">
            <span>{hora}</span>
            <Button
              variant="danger"
              className="ml-2"
              onClick={() => {
                setFechaHoraReserva({ fecha: ' ', hora });
                setModalCancelarReservaOpen(true);
              }}
            >
              Cancelar
            </Button>
          </div>
        ))}
      </div>
      <ModalReserva
        show={modalReservaOpen}
        handleClose={handleCloseModals}
        fecha={fechaHoraReserva.fecha}
        hora={fechaHoraReserva.hora}
        onReservar={handleReservar}
      />
      <ModalCancelarReserva
        show={modalCancelarReservaOpen}
        handleClose={handleCloseModals}
        fecha={fechaHoraReserva.fecha}
        hora={fechaHoraReserva.hora}
        onCancelarReserva={handleCancelarReserva}
      />
    </div>
  );
};

export default HoraReserva;