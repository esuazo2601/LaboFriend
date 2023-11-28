import './Estilos/HoraReserva.css';
import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import ModalReserva from './Componentes/ModalReserva';
import ModalCancelarReserva from './Componentes/ModalCancelarReserva';
import { getBloques } from '../../../api_service/bloque_api';
import { getSalas } from '../../../api_service/salas_api';
import { checkAvailability } from '../../../api_service/agenda_api';

const HoraReserva = ({ fechaSeleccionada, handleLoading, loading  }) => {
  const [modalReservaOpen, setModalReservaOpen] = useState(false);
  const [modalCancelarReservaOpen, setModalCancelarReservaOpen] = useState(false);
  const [fechaHoraReserva, setFechaHoraReserva] = useState('');
  const [horasAgendadasUsuario] = useState([
    { sala: 'Sala 1', fecha: fechaSeleccionada, hora: '11:00' },
    { sala: 'Sala B', fecha: fechaSeleccionada, hora: '03:00' },
    { sala: 'Sala B', fecha: fechaSeleccionada, hora: '04:00' },
  ]);

  const [todasLasHoras, setTodasLasHoras]  = useState([])
  const [salasLab, setSalasLab] = useState([])
  const [bloquesDisponibles, setBloquesDisponibles] = useState([]) 

  useEffect (() => {
    try {
      const getData = async () => {
        const data = await getBloques();
        if(data){
          console.log(data)
          setTodasLasHoras(data)
        }else{
          console.log("No hay datos para mostrar")
          setTodasLasHoras([])
        }
      };
      const getSalasLabo = async() => {
        const data = await getSalas();
        if (data){
          console.log(data)
          setSalasLab(data)
        }else{
          console.log("No hay salas")
          setSalasLab([])
        }
      }
      const getDisponibilidad = async() =>{
        const data = await checkAvailability(1,fechaSeleccionada)
        if(data){
          console.log("availability",data)
          setBloquesDisponibles(data)
        }else{
          console.log("No hay datos para mostrar")
          setBloquesDisponibles([])
        }
      }
      const getTodo = async () => {
        try {
          await Promise.all([getData(), getSalasLabo(), getDisponibilidad()])
        } finally {
          // Independientemente de si hay un error o no, se llama a handleLoading(false)
          handleLoading(false)
        }
      };
      getTodo();
    } catch (error) {
      console.log(error)
      setTodasLasHoras([])
      setSalasLab([])
    }    
  },[loading])
    

  const salas = [
    {
      id: 1,
      nombre: 'Sala 1',
      horasDisponibles: ['08:15 AM', '09:15 AM', '10:15 AM'],
      horasNoDisponibles: ['11:15 AM', '12:15 PM', '01:15 PM'],
    }
  ];

  const handleHoraSeleccionada = (hora, nombreSala) => {
    const fechaReserva = format(fechaSeleccionada, 'dd/MM/yy', { locale: esLocale });
    setFechaHoraReserva({ fecha: fechaReserva, hora, nombreSala });
    setModalReservaOpen(true);
  };

  const handleCancelarHoraSeleccionada = (agenda) => {
    const fechaReserva = format(agenda.fecha, 'dd/MM/yy', { locale: esLocale });
    setFechaHoraReserva({ fecha: fechaReserva, hora: agenda.hora, sala: agenda.sala });
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
  const formatearHora = (hora) => {
    const [horas, minutos] = hora.split(':');
    return `${horas}:${minutos}`;
  };
    //disabled={sala.horasNoDisponibles.includes(hora) || horasAgendadasUsuario.some(agendada => agendada.hora === hora && agendada.salaId === sala.id)}
    //className={`hora-disponible${sala.horasNoDisponibles.includes(hora) || horasAgendadasUsuario.some(agendada => agendada.hora === hora && agendada.salaId === sala.id) ? ' no-disponible' : ' '}`}
    return (
      <div className="hora-reserva-container d-flex" >
      {loading ? (
        // Muestra el spinner mientras se está cargando
        <div className='loading-spinner' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} >
          <Spinner  animation="border" role="status" size='lg'>
        </Spinner>
        </div>
        
      ) :(
        salasLab.length > 0? (
          <>
          {salasLab.map((sala) => (
            <div key={sala.id} className="horas-column">
              <h2 className="letra-mediana">Horas para {sala.nombre}</h2>
              {todasLasHoras.map((hora, horaIndex) => (
                <div key={horaIndex} className="hora-item">
                  <span>{formatearHora(hora.hora_inicio)} - {formatearHora(hora.hora_fin)}</span>
                  <Button
                    onClick={() => handleHoraSeleccionada(hora, sala.nombre)}
                  >
                    {horasAgendadasUsuario.some(agendada => agendada.hora === hora && agendada.sala === sala.nombre) ? 'Reservado' : 'Reservar'}
                  </Button>
                </div>
              ))}
            </div>
          ))}
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
            sala={fechaHoraReserva.nombreSala}
            onReservar={handleReservar}
          />
          <ModalCancelarReserva
            show={modalCancelarReservaOpen}
            handleClose={handleCloseModals}
            fecha={fechaHoraReserva.fecha}
            hora={fechaHoraReserva.hora}
             sala={fechaHoraReserva.sala}
            onCancelarReserva={handleCancelarReserva}
          />
        </>
      ) : (
        <p className="text-center">No se encontraron datos.</p>
      ))
      }
    </div>
  );
};

export default HoraReserva;