import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import '../Estilos/tabla.css';
import '../Estilos/paginacion.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import ModalMantenimientoEquipo from './ModalMantenimientoEquipo';
import ModalDescriptionEquipo from './ModalDescriptionEquipo';
import ModalEliminarConfirmar from './ModalEliminarConfirmar';
import {getEquipo} from '../../../../api_service/equipo_api.js'

const Equipo = ({ searchTerm }) => {
  const equiposData = [
    {
      nombre: 'Equipo 1',
      sala: 'Sala 1',
      mantenimiento: '01-01-2023',
      descripcion: 'Descripción 1',
    },
  ];
  const [loading, setLoading] =useState(true);
  const [listaEquipos, setListaEquipos] = useState([]);

  const [showModalEliminar, setShowModalEliminar] = useState(false);
  const [showModalDescription, setShowModalDescription] = useState(false);
  const [selectedEquipo, setSelectedEquipo] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState({
    sala: '',
    descripcion: '',
  });

  const [showModalMantenimiento, setShowModalMantenimiento] = useState(false);
  const [selectedMantenimiento, setSelectedMantenimiento] = useState({
    oldDate: '',
    newDate: '',
  });

  useEffect(()=>{
    try {
      const getData = async () => {
        const data = await getEquipo()
        if(data){
          console.log(data)
          setListaEquipos(data)
          setLoading(false)
        }else{
          setListaEquipos([])
          setLoading(false)
        }
      };
      getData();
    } catch (error) {
      console.log("se encontro un error: ",error);
      setListaEquipos([])
        setLoading(false)
    }
  },[])

  const handleMantenimientoClick = (equipo) => {
    setShowModalMantenimiento(true);
    setSelectedMantenimiento({
      oldDate: equipo.mantenimiento,
      newDate: '',
    });
    setSelectedEquipo(equipo); 
  };

  const handleSaveMantenimiento = () => {
    // Actualizar fecha 
    setShowModalMantenimiento(false);
  };


  // Editar descripción del equipo seleccionado
  const handleDescriptionClick = (equipo) => {
    setShowModalDescription(true);
    setSelectedEquipo(equipo);
    setSelectedDescription({
      Sala: equipo.sala,
      descripcion: equipo.descripcion,
    });
  };

  const handleSaveDescription = () => {
    setShowModalDescription(false);
  };

  // Filtra los elementos 
  const filteredEquipos =  listaEquipos.filter((equipo) =>
    equipo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 5; // Cantidad de elementos por pág
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = filteredEquipos.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calcula los elementos para la pág actual
  const paginatedEquipos = filteredEquipos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleEliminarClick = (equipo) => {
    setSelectedEquipo(equipo);
    setShowModalEliminar(true);
  };

  const handleDelete = () => {
    console.log("Equipo eliminado"); 
  };

  return (
    <div>
      {loading ? (
        <div className='loading-spinner'>
          <Spinner animation="border" role="status" size="lg">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        listaEquipos.length > 0 ? (
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="encabezado-tabla text-center align-middle">Nombre</th>
                  <th className="encabezado-tabla text-center align-middle">Mantenimiento</th>
                  <th className="encabezado-tabla text-center align-middle">Acción</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEquipos.map((equipo, index) => (
                  <tr key={index}>
                    <td className="columna-nombre-tabla text-center align-middle">
                      {equipo.nombre}
                    </td>
                    <td
                      className="celdas-restantes-tabla text-center align-middle"
                      onClick={() => handleMantenimientoClick(equipo)}
                    >
                      {equipo.fecha_mantencion}
                    </td>
                    <td className="celdas-restantes-tabla text-center align-middle">
                      <div className="action-container">
                        <div className="action-item" onClick={() => handleDescriptionClick(equipo)}>
                          <FontAwesomeIcon style={{cursor:'pointer'}} icon={faEye} />
                        </div>
                        <div className="action-divider"></div>
                        <div className="action-item" onClick={() => handleEliminarClick(equipo)}>
                          <FontAwesomeIcon style={{cursor:'pointer'}} icon={faTrash} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="pagination">
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Anterior
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? "active" : ""}
                >
                  {page}
                </button>
              ))}
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Siguiente
              </button>
            </div>

            <ModalMantenimientoEquipo
              show={showModalMantenimiento}
              onHide={() => setShowModalMantenimiento(false)}
              equipo={selectedEquipo}
              oldDate={selectedMantenimiento.oldDate}
              newDate={selectedMantenimiento.newDate}
              onSave={handleSaveMantenimiento}
            />

            <ModalDescriptionEquipo
              show={showModalDescription}
              onHide={() => setShowModalDescription(false)}
              equipo={selectedEquipo}
              onSave={handleSaveDescription}
            />

            <ModalEliminarConfirmar
              show={showModalEliminar}
              onHide={() => setShowModalEliminar(false)}
              tipoElemento="Equipo"
              nombreElemento={selectedEquipo ? selectedEquipo.nombre : ''}
              onDelete={handleDelete}
            />
          </div>
        ) : (
          <p className="text-center">No se encontraron datos.</p>
        )
      )}
    </div>
  );
};

export default Equipo;