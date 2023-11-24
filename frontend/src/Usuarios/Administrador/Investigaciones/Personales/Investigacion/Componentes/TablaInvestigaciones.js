import React, { useState, useEffect } from 'react';
//import MUIDataTable from 'mui-datatables';
import { Table, Button } from 'react-bootstrap';
import '../Estilos/tabla-avances.css';
import '../Estilos/paginacion.css';
import '../../../../../../EstilosGlobales/basicos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import DetalleAvance from './ModalDetalle';
import EliminarAvance from './ModalEliminacion';
import { getInvestigaciones, deleteInvestigacion } from '../../../../../../api_service/investigaciones_api'; 



const TablaAvances = ({ searchTerm }) => {

    const [investigaciones, setInvestgaciones] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getInvestigaciones();
                setInvestgaciones(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []); 

    //console.log("investigaciones",investigaciones);
    const [showModalDetalle, setShowModalDetalle] = useState(false);
    const [showModalEliminacion, setShowModalEliminacion] = useState(false);
    const [selectedAvance, setSelectedAvance] = useState(null);


    //Visualizacion de confirmacion de eliminacion
    const handleEliminationClick = (avance) => {
        setShowModalEliminacion(true);
        setSelectedAvance(avance);
    };

    //Eliminar avance
    const handleEliminarAvance = async(avance) => {
        setShowModalEliminacion(false);
        setSelectedAvance(avance);
        //MANEJAR ELIMINACION DE AVNACE CON LLAMADA A API
        // await deleteInvestigacion(avance.id)
    };

    const normalizeText = (text) => {
        if (text) {
            return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        }
        return '';
    };


    const filteredAvances = investigaciones.filter((investigaciones) =>
        normalizeText(investigaciones.titulo).includes(normalizeText(searchTerm))
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

    const formatFecha = (fecha) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(fecha).toLocaleDateString(undefined, options);
      };
    return (

        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="encabezado-tabla text-center align-middle" style={{ width: '5%' }}>#</th>
                        <th className="encabezado-tabla text-center align-middle" style={{ width: '40%' }}>Nombre</th>
                        {/* <th className="encabezado-tabla text-center align-middle" style={{ width: '40%' }}>Autor</th> */}
                        <th className="encabezado-tabla text-center align-middle" style={{ width: '10%' }}>Fecha</th>
                        <th colspan="2" className="encabezado-tabla text-center align-middle" style={{ width: '5%' }}>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedAvances.map((investigacion, index) => (
                        <tr key={index}>
                            <td className="columna-nombre-tabla text-center align-middle">{investigacion.id}</td>
                            <td className="celdas-restantes-tabla text-center align-middle">{investigacion.titulo}</td>
                            {/* <td className="celdas-restantes-tabla text-center align-middle">{investigacion.autor}</td> */}
                            <td className="celdas-restantes-tabla text-center align-middle">{formatFecha(investigacion.fecha)}</td>
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