import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Estilos/Calendario.css';

const Calendario = ({ onFechaSeleccionada, diasSinHorasDisponibles }) => {
  const handleFechaChange = (date) => {
    onFechaSeleccionada(date);
  };

  const tileContent = ({ date, view }) => {
    const fechaSinHoras =
      diasSinHorasDisponibles && diasSinHorasDisponibles.some(
        (fecha) =>
          fecha.getFullYear() === date.getFullYear() &&
          fecha.getMonth() === date.getMonth() &&
          fecha.getDate() === date.getDate()
      );

    return fechaSinHoras ? <div className="sin-horas">X</div> : null;
  };

  return (
    <div className="contenedor-calendario">
      <Calendar
        onChange={handleFechaChange}
        tileContent={tileContent}
      />
    </div>
  );
};

export default Calendario;