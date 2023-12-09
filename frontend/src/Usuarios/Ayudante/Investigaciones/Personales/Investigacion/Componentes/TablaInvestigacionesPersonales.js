import React, { useState, useEffect } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import '../Estilos/tabla-avances.css';
import '../Estilos/paginacion.css';
import '../../../../../../EstilosGlobales/basicos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import DetalleAvance from '../Componentes/ModalDetalle';
import EliminarInvestigacion from '../Componentes/ModalEliminacion';
import { getTrabajandoEmail, getInvestigacionById,deleteInvestigacion } from '../../../../../../api_service/investigaciones_api';
import { Link } from 'react-router-dom';

const TablaInvestigacionesPersonales = ({ searchTerm, refreshInvestigaciones}) => {

    const [InvestigacionesPersonales, setInvestigacionesPersonales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshDelete, setRefreshDelete] = useState(false)
    const [showModalDetalle, setShowModalDetalle] = useState(false);
    const [showModalEliminacion, setShowModalEliminacion] = useState(false);
    const [selectedInvestigacion, setSelectedInvestigacion] = useState(null);

    useEffect(() => {
        try {
            const getData = async () => {
                const data = await getTrabajandoEmail(localStorage.getItem('email'));
    
                if (Array.isArray(data)) {
                    let investigacion_list = [];
    
                    console.log('Data:', data);
    
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
                    setRefreshDelete(false);
                } else {
                    setInvestigacionesPersonales([]);
                    setLoading(false);
                    setRefreshDelete(false);
                }
            };
    
            getData();
        } catch (error) {
            console.log("Se encontró un error: ", error);
            setLoading(false);
            setInvestigacionesPersonales([]);
            setRefreshDelete(false);
        }
    }, [refreshDelete, refreshInvestigaciones]);
    

    console.log("Inv",InvestigacionesPersonales)


    //Visualizacion de confirmacion de eliminacion
    const handleEliminationClick = (investigacion) => {
        setShowModalEliminacion(true);
        setSelectedInvestigacion(investigacion);
    };

    //Eliminar avance
    const handleEliminarInvestigacion = async(id) => {
        console.log(id)
        try{
            const resp = await deleteInvestigacion(id)
            console.log(resp)
            setRefreshDelete(true)
          }catch(error){
            console.log(error)
          }
          console.log("Investigación eliminada");
        //MANEJAR ELIMINACION DE AVNACE CON LLAMADA A API
        // await deleteInvestigacion(avance.id)
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
            {loading ? (
                <div className='loading-spinner'>
                    <Spinner animation="border" role="status" size="lg">
                    <span className="visually-hidden">Cargando...</span>
                    </Spinner>
                </div>
                
            ) : (
                <div>
                    {InvestigacionesPersonales.length === 0 ? (
                        <p>No hay investigaciones disponibles.</p>
                    ) : (
                        <>
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
                                            <td className="columna-nombre-tabla text-center align-middle">{(index+1) + (itemsPerPage*(currentPage-1))}</td>
                                            <td className="celdas-restantes-tabla text-center align-middle">{investigacion.titulo}</td>
                                            <td className="celdas-restantes-tabla text-center align-middle">{formatFecha(investigacion.fecha)}</td>
                                            <td className="celdas-restantes-tabla opcion-accion text-center align-middle"><Link to = {`/ayudante/investigaciones/personales/${investigacion.id}`}><FontAwesomeIcon icon={faEye} style={{color:"black"}} /></Link></td>
                                            <td className="celdas-restantes-tabla text-center align-middle" onClick={() => handleEliminationClick(investigacion)}><FontAwesomeIcon icon={faTrash} style={{ color: "red" , cursor: 'pointer'}} /></td>
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
                                onHide={() => setShowModalDetalle(false)}
                            />
                            <EliminarInvestigacion
                                show={showModalEliminacion}
                                id={selectedInvestigacion? selectedInvestigacion.id:''}
                                onHide={() => setShowModalEliminacion(false)}
                                onDelete={handleEliminarInvestigacion}
                            />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default TablaInvestigacionesPersonales;