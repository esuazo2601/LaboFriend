import React, { useState } from 'react';
//import MUIDataTable from 'mui-datatables';
import { Table, Button } from 'react-bootstrap';
import '../Estilos/tabla-avances.css';
import '../Estilos/paginacion.css';
import '../../../../../../EstilosGlobales/basicos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import DetalleAvance from './ModalDetalle';
import EliminarAvance from './ModalEliminacion';

const TablaAvances = ({ searchTerm }) => {

    const investigacionesData = [
        {
            id: '01',
            nombre: 'Investigación 1 Investigación 1 Investigación 1 Investigación 1 Investigación 1 Investigación 1 Investigación 1 Investigación 1',
            autor: 'cientifico 1, cientifico 2',
            descripcion: 'descripcion 1',
            fecha: '10/04/23',
            investigacion: ''
        },
        {
            id: '02',
            nombre: 'Investigación 2',
            autor: 'cientifico 2',
            descripcion: 'descripcion 2',
            fecha: '08/07/23',
            investigacion: ''
        },
        {
            id: '03',
            nombre: 'Investigación 3',
            autor: 'cientifico 3',
            descripcion: 'descripcion 3',
            fecha: '26/07/23',
            investigacion: ''
        },
        {
            id: '04',
            nombre: 'Investigación 4',
            autor: 'cientifico 4',
            descripcion: 'descripcion 4',
            fecha: '16/11/23',
            investigacion: ''
        },
        {
            id: '05',
            nombre: 'Investigación 5 Investigación 5 Investigación 5',
            autor: 'cientifico 5',
            descripcion: 'descripcion 5',
            fecha: '11/02/23',
            investigacion: ''
        },
        {
            id: '06',
            nombre: 'Investigación 6',
            autor: 'cientifico 6',
            descripcion: 'descripcion 6',
            fecha: '04/05/23',
            investigacion: ''
        },
        {
            id: '07',
            nombre: 'Investigación 7',
            autor: 'cientifico 7',
            descripcion: 'descripcion 7',
            fecha: '08/08/23',
            investigacion: ''
        },
        {
            id: '08',
            nombre: 'Investigación 8',
            autor: 'cientifico 8',
            descripcion: 'descripcion 8',
            fecha: '22/09/23',
            investigacion: ''
        },
        {
            id: '09',
            nombre: 'Investigación 9',
            autor: 'cientifico 9',
            descripcion: 'descripcion 9',
            fecha: '27/10/23',
            investigacion: ''
        },
        {
            id: '10',
            nombre: 'Investigación 10',
            autor: 'cientifico 10',
            descripcion: 'descripcion 10',
            fecha: '06/11/23',
            investigacion: ''
        },
        {
            id: '11',
            nombre: 'Investigación 11',
            autor: 'cientifico 11',
            descripcion: 'descripcion 11',
            fecha: '08/08/23',
            investigacion: ''
        },
        {
            id: '12',
            nombre: 'Investigación 12',
            autor: 'cientifico 12',
            descripcion: 'descripcion 12',
            fecha: '29/12/23',
            investigacion: ''
        },
    
      ];

    console.log('searchTerm en TablaAvances:', searchTerm);
    const [showModalDetalle, setShowModalDetalle] = useState(false);
    const [showModalEliminacion, setShowModalEliminacion] = useState(false);

    const [selectedAvance, setSelectedAvance] = useState(null);


    //Visualizacion de confirmacion de eliminacion
    const handleEliminationClick = (avance) => {
        setShowModalEliminacion(true);
        setSelectedAvance(avance);
    };

    //Eliminar avance
    const handleEliminarAvance = (avance) => {
        setShowModalEliminacion(false);
        setSelectedAvance(avance);
    };

    const normalizeText = (text) => {
        if (text) {
            return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        }
        return '';
    };


    const filteredAvances = investigacionesData.filter((investigaciones) =>
        normalizeText(investigaciones.nombre).includes(normalizeText(searchTerm))
    );

    const itemsPerPage = 10; // Cantidad de elementos por pág
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = filteredAvances.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Calcula los elementos para la pág actual
    const paginatedAvances = filteredAvances.slice(
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

    return (

        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="encabezado-tabla text-center align-middle" style={{ width: '5%' }}>#</th>
                        <th className="encabezado-tabla text-center align-middle" style={{ width: '40%' }}>Nombre</th>
                        <th className="encabezado-tabla text-center align-middle" style={{ width: '40%' }}>Autor</th>
                        <th className="encabezado-tabla text-center align-middle" style={{ width: '10%' }}>Fecha</th>
                        <th colspan="2" className="encabezado-tabla text-center align-middle" style={{ width: '5%' }}>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedAvances.map((investigacion, index) => (
                        <tr key={index}>
                            <td className="columna-nombre-tabla text-center align-middle">{investigacion.id}</td>
                            <td className="celdas-restantes-tabla text-center align-middle">{investigacion.nombre}</td>
                            <td className="celdas-restantes-tabla text-center align-middle">{investigacion.autor}</td>
                            <td className="celdas-restantes-tabla text-center align-middle">{investigacion.fecha}</td>
                            <td className="celdas-restantes-tabla text-center align-middle" onClick={() => window.location.href = '/ayudante/investigaciones/terceros/investigacion'}><FontAwesomeIcon icon={faEye} /></td>
                            <td className="celdas-restantes-tabla text-center align-middle" onClick={() => handleEliminationClick(investigacion)}><FontAwesomeIcon icon={faTrash} style={{ color: "red" }} /></td>
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


            <DetalleAvance
                show={showModalDetalle}
                avance={selectedAvance}
                onHide={() => setShowModalDetalle(false)}
            />
            <EliminarAvance
                show={showModalEliminacion}
                avance={selectedAvance}
                onHide={() => setShowModalEliminacion(false)}
                onEliminarAvance={handleEliminarAvance}
            />
        </div >


    );
};

export default TablaAvances;