import React, { useState } from 'react';
import Calendario from './Calendario';
import { Container } from 'react-bootstrap';
import HoraReserva from './HoraReserva';
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import './Estilos/AdministradorReservaHoras.css';

const EstudianteReservaHoras = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const handleFechaSeleccionada = (fecha) => {
    setFechaSeleccionada(fecha);
    setLoading(true)
  };
  return (
    <Container>
      <h1 className="letra-grande">Calendario de Reservas</h1>
      <hr className="linea-divisora" />
      <h2 className="letra-mediana">Horas para el {format(fechaSeleccionada, "EEEE d 'de' MMMM 'de' yyyy", { locale: esLocale })}</h2>
      <div style={{ display: 'flex' }}>
        <Calendario onFechaSeleccionada={handleFechaSeleccionada} />
        <HoraReserva fechaSeleccionada={fechaSeleccionada} handleLoading={setLoading} loading={loading}/>
      </div>
    </Container>
  );
};

export default EstudianteReservaHoras;