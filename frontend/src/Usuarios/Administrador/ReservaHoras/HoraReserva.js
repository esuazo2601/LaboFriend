import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import ModalReserva from './Componentes/ModalReserva';
import ModalCancelarReserva from './Componentes/ModalCancelarReserva';
import './Estilos/HoraReserva.css';

const HoraReserva = ({ fechaSeleccionada }) => {
  const horasReservadas = ['10:15 AM', '02:15 PM', '05:15 PM'];
  const todasLasHoras = ['08:15 AM', '09:15 AM', '10:15 AM', '11:15 AM', '12:15 PM', '01:15 PM', '02:15 PM', '03:15 PM', '04:15 PM', '05:15 PM'];

  const [modalReservaOpen, setModalReservaOpen] = useState(false);
  const [modalCancelarReservaOpen, setModalCancelarReservaOpen] = useState(false);
  const [fechaHoraReserva, setFechaHoraReserva] = useState('');
  const [horasAgendadasUsuario] = useState([
    { fecha: fechaSeleccionada, hora: '11:00 AM' },
    { fecha: fechaSeleccionada, hora: '03:00 PM' },
    { fecha: fechaSeleccionada, hora: '04:00 PM' },
  ]);

  const handleHoraSeleccionada = (hora) => {
    const fechaReserva = format(fechaSeleccionada, 'dd/MM/yy', { locale: esLocale });
    setFechaHoraReserva({ fecha: fechaReserva, hora });
    setModalReservaOpen(true);
  };

  const handleCancelarHoraSeleccionada = (agenda) => {
    const fechaReserva = format(agenda.fecha, 'dd/MM/yy', { locale: esLocale });
    setFechaHoraReserva({ fecha: fechaReserva, hora: agenda.hora });
    setModalCancelarReservaOpen(true);
  };

  const handleReservar = () => {
    // Editar para reservar la hora
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
              className={`hora-disponible${horasReservadas.includes(hora) || horasAgendadasUsuario.some(agendada => agendada.hora === hora) ? ' no-disponible' : ' '}`}
              disabled={horasReservadas.includes(hora) || horasAgendadasUsuario.some(agendada => agendada.hora === hora)}
            >
              {horasAgendadasUsuario.some(agendada => agendada.hora === hora) ? 'Reservado' : 'Reservar'}
            </Button>
          </div>
        ))}
      </div>
      <div className="horas-column-agendadas ml-4">
        <h2 className='letra-mediana'>Horas agendadas del usuario</h2>
        {horasAgendadasUsuario.map((agenda, index) => (
          <div key={index} className="hora-agendada d-flex align-items-center">
            <span>{format(agenda.fecha, "dd/MM/yy")} - {agenda.hora}</span>
            <Button
              variant="danger"
              className="ml-2"
              onClick={() => handleCancelarHoraSeleccionada(agenda)}
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