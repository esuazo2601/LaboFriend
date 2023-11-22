import React, { useState } from 'react';
import Calendario from './Calendario';
import { Container } from 'react-bootstrap';
import HoraReserva from './HoraReserva';
import './Estilos/AdministradorReservaHoras.css';

const AdministradorReservaHoras = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);

  const handleFechaSeleccionada = (fecha) => {
    setFechaSeleccionada(fecha);
  };

  const handleHoraSeleccionada = (hora) => {
    setHoraSeleccionada(hora);
  };

  return (
    <Container>
      <h1 className="letra-grande">Calendario de Reservas</h1>
      <hr className="linea-divisora" />
      <div style={{ display: 'flex' }}>
        <Calendario onFechaSeleccionada={handleFechaSeleccionada} />
        {fechaSeleccionada && (
          <HoraReserva
            fechaSeleccionada={fechaSeleccionada}
            onHoraSeleccionada={handleHoraSeleccionada}
          />
        )}
      </div>
      {horaSeleccionada && (
        <div>
          <p>Fecha seleccionada: {fechaSeleccionada.toDateString()}</p>
          <p>Hora seleccionada: {horaSeleccionada}</p>
        </div>
      )}
    </Container>
  );
};

export default AdministradorReservaHoras;