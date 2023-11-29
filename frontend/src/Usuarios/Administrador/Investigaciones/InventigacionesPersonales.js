import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import '../../Estudiante/Investigaciones/Personales/Investigacion/Estilos/tabla-avances.css';
import '../../Estudiante/Investigaciones/Personales/Investigacion/Estilos/paginacion.css';
import '../../../EstilosGlobales/basicos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import DetalleAvance from './Personales/Investigacion/Componentes/ModalDetalle';
import EliminarAvance from '../../Estudiante/Investigaciones/Personales/Investigacion/Componentes/ModalEliminacion';
import { getTrabajandoEmail } from '../../../api_service/investigaciones_api';
import { getInvestigacionById } from '../../../api_service/investigaciones_api';

const TablaInvestigacionesPersonales = ({ searchTerm }) => {

    const [InvestigacionesPersonales,setInvestigacionesPersonales] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        try {
            const getData = async () => {
                setLoading(true);
                const data = await getTrabajandoEmail(localStorage.getItem('email'));
                let investigacion_list = [];
    
                console.log('Data:', data);
    
                if (data) {
                    await Promise.all(data.map(async (item) => {
                        const id = item.id_investigacion;
                        const investigacionArray = await getInvestigacionById(id);
                        
                        if (investigacionArray && investigacionArray.length > 0) {
                            const investigacion = investigacionArray[0];
                            investigacion_list.push(investigacion);
                        }
                    }));
    
                    console.log('Investigacion list:', investigacion_list);
    
                    setInvestigacionesPersonales(investigacion_list);
                    setLoading(false);
                } else {
                    setInvestigacionesPersonales([]);
                    setLoading(false);
                }
            };
    
            getData();
        } catch (error) {
            console.log("Se encontró un error: ", error);
            setLoading(false);
            setInvestigacionesPersonales([]);
        }
    }, []);

    console.log("Inv",InvestigacionesPersonales)

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


    const filteredAvances = InvestigacionesPersonales.filter((investigaciones) =>
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
                        <th className="encabezado-tabla text-center align-middle" style={{ width: '10%' }}>Fecha</th>
                        <th colspan="2" className="encabezado-tabla text-center align-middle" style={{ width: '5%' }}>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedAvances.map((investigacion, index) => (
                        <tr key={index}>
                            <td className="columna-nombre-tabla text-center align-middle">{investigacion.id}</td>
                            <td className="celdas-restantes-tabla text-center align-middle">{investigacion.titulo}</td>
                            <td className="celdas-restantes-tabla text-center align-middle">{formatFecha(investigacion.fecha)}</td>
                            <td className="celdas-restantes-tabla opcion-accion text-center align-middle" onClick={() => window.location.href = '/ayudante/investigaciones/personales/investigacion'}><FontAwesomeIcon icon={faEye} /></td>
                            <td className="celdas-restantes-tabla opcion-accion text-center align-middle" onClick={() => handleEliminationClick(investigacion)}><FontAwesomeIcon icon={faTrash} style={{ color: "red" }} /></td>
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

export default TablaInvestigacionesPersonales;