import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Estilos/Calendario.css';

const Calendario = ({ onFechaSeleccionada, diasSinHorasDisponibles }) => {
  const handleFechaChange = (date) => {
    onFechaSeleccionada(date);
  };

  return (
    <div className="contenedor-calendario">
      <Calendar
        onChange={handleFechaChange}
      />
    </div>
  );
};

export default Calendario;