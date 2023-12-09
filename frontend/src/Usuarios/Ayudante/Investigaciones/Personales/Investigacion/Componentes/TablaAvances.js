import React, { useState, useEffect } from 'react';
//import MUIDataTable from 'mui-datatables';
import { Table, Button, Spinner } from 'react-bootstrap';
import '../Estilos/tabla-avances.css';
import '../Estilos/paginacion.css';
import '../../../../../../EstilosGlobales/basicos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFile, faTrash } from '@fortawesome/free-solid-svg-icons';
import DetalleAvance from './ModalDetalle';
import EliminarAvance from './ModalEliminacionAvance';
import { deleteIncidencia, getIncidencias } from '../../../../../../api_service/investigaciones_api';





const TablaAvances = ({ searchTerm , investigacionId, refreshInvestigaciones }) => {
    const [avances, setAvances] = useState([]);
    const [showModalDetalle, setShowModalDetalle] = useState(false);
    const [showModalEliminacion, setShowModalEliminacion] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedAvance, setSelectedAvance] = useState(null);
    const [refreshDelete, setRefreshDelete] = useState(false)
    const [selectedVisualizacion, setSelectedVisualizacion] = useState({
        avance: '',
        fecha: '',
        archivo: '',
        imagen: '',
    });

    useEffect(()=>{
        try {
            const getData = async () => {
                const data = await getIncidencias(investigacionId);
                console.log(data)
                if(data){
                    setAvances(data)
                    setLoading(false)
                    setRefreshDelete(false);
                }
                else{
                    setAvances([])
                    setLoading(false)
                    setRefreshDelete(false);
                }
            };
            getData();
        } catch (error) {
            setAvances([])
            setLoading(false)
            console.log("Se encontró un error: ", error);
            setRefreshDelete(false);
        }
    },[refreshDelete, refreshInvestigaciones])

    console.log('searchTerm en TablaAvances:', searchTerm);
    


    //Visualizar informacion de un avance
    const handleVisualizacionClick = (avance) => {
        setShowModalDetalle(true);
        setSelectedAvance(avance);
    };

    //Visualizacion de confirmacion de eliminacion
    const handleEliminationClick = (avance) => {
        setShowModalEliminacion(true);
        setSelectedAvance(avance);
    };

    //Eliminar avance
    const handleEliminarAvance = async (id) => {
        console.log(id)
        try{
            const resp = await deleteIncidencia(id)
            console.log(resp)
            setRefreshDelete(true)
          }catch(error){
            console.log(error)
          }
          console.log("avance eliminado");
    };

    const normalizeText = (text) => {
        if (text) {
            return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        }
        return '';
    };


    const filteredAvances = avances.filter((avance) =>
        normalizeText(avance.titulo).includes(normalizeText(searchTerm))
    );

    const itemsPerPage = 5; // Cantidad de elementos por pág
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
                    {paginatedAvances.length === 0 ? (
                        <p>No hay avances.</p>
                    ) : (
                        <>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="encabezado-tabla text-center align-middle" style={{ width: '10%' }}>#</th>
                                    <th className="encabezado-tabla text-center align-middle" style={{ width: '35%' }}>Avance</th>
                                    <th className="encabezado-tabla text-center align-middle" style={{ width: '15%' }}>Fecha</th>
                                    <th className="encabezado-tabla text-center align-middle" style={{ maxWidth: '15%' }}>Archivo</th>
                                    <th colspan="2" className="encabezado-tabla text-center align-middle" style={{ width: '5%' }}>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedAvances.map((avance, index) => (
                                    <tr key={index}>
                                        <td className="columna-nombre-tabla text-center align-middle">{(index + 1)+ (5*(currentPage-1))}</td>
                                        <td className="celdas-restantes-tabla text-center align-middle">{avance.titulo}</td>
                                        <td className="celdas-restantes-tabla text-center align-middle">{formatFecha(avance.fecha)}</td>
                                        <td className="celdas-restantes-tabla text-center align-middle" > <FontAwesomeIcon icon={faFile} style={{ color: "#507E9D", }} />&nbsp;&nbsp;<a href='#'>{avance.archivo}</a></td>
                                        <td className="celdas-restantes-tabla opcion-accion text-center align-middle" onClick={() => handleVisualizacionClick(avance)}><FontAwesomeIcon icon={faEye} /></td>
                                        <td className="celdas-restantes-tabla opcion-accion text-center align-middle" onClick={() => handleEliminationClick(avance)}><FontAwesomeIcon icon={faTrash} style={{ color: "red" }} /></td>
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
                            avance = {selectedAvance}
                            onHide={() => setShowModalEliminacion(false)}
                            onDelete={handleEliminarAvance}
                        />
                    </>
                    )}
            </div>
            )}
        </div >
    );
};

export default TablaAvances;