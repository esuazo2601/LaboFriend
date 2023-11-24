import React, { useState } from 'react';
import Calendario from './Calendario';
import { Container } from 'react-bootstrap';
import HoraReserva from './HoraReserva';
import './Estilos/AdministradorReservaHoras.css';
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';

const AdministradorReservaHoras = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());

  const handleFechaSeleccionada = (fecha) => {
    setFechaSeleccionada(fecha);
  };

  return (
    <Container>
      <h1 className="letra-grande">Calendario de Reservas</h1>
      <hr className="linea-divisora" />
      <h2 className="letra-mediana">Horas para el {format(fechaSeleccionada, "EEEE d 'de' MMMM 'de' yyyy", { locale: esLocale })}</h2>
      <div style={{ display: 'flex' }}>
        <Calendario onFechaSeleccionada={handleFechaSeleccionada} />
        {fechaSeleccionada && (
          <HoraReserva
            fechaSeleccionada={fechaSeleccionada}
          />
        )}
      </div>
    </Container>
  );
};

export default AdministradorReservaHoras;