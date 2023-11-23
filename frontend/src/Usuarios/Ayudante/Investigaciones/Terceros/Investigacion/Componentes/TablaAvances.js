import React, { useState } from 'react';
//import MUIDataTable from 'mui-datatables';
import { Table, Button } from 'react-bootstrap';
import '../Estilos/tabla-avances.css';
import '../Estilos/paginacion.css';
import '../../../../../../EstilosGlobales/basicos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFile, faTrash } from '@fortawesome/free-solid-svg-icons';
import DetalleAvance from './ModalDetalle';



const TablaAvances = ({ searchTerm }) => {

    const avancesData = [
        {
            id: '01',
            avance: 'Avance ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo ejemplo',
            fecha: '2023-01-02',
            archivo: 'archivo1.pdf',
            imagen: 'imagen1.jpg',
            descripcion: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
        },
        {
            id: '02',
            avance: 'Avance 2',
            fecha: '2023-01-02',
            archivo: 'archivo2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222.pdf',
            imagen: 'imagen2.jpg',
            descripcion: 'descripcion2',
        },
        {
            id: '03',
            avance: 'Avance 3',
            fecha: '2023-01-04',
            archivo: 'archivo3.pdf',
            imagen: 'imagen3.jpg',
            descripcion: 'descripcion3',
        },
        {
            id: '04',
            avance: 'Avance 4',
            fecha: '2023-01-04',
            archivo: 'archivo4.pdf',
            imagen: 'imagen4.jpg',
            descripcion: 'descripcion4',
        },
        {
            id: '05',
            avance: 'Avance 5',
            fecha: '2023-01-11',
            archivo: 'archivo5.pdf',
            imagen: 'imagen5.jpg',
            descripcion: 'descripcion5',
        },
        {
            id: '06',
            avance: 'Avance 6',
            fecha: '2023-01-14',
            archivo: 'archivo6.pdf',
            imagen: 'imagen6.jpg',
            descripcion: 'descripcion6',
        },
        {
            id: '07',
            avance: 'Avance 7',
            fecha: '2023-01-20',
            archivo: 'archivo7.pdf',
            imagen: 'imagen7.jpg',
            descripcion: 'descripcion7',
        },
    ];

    console.log('searchTerm en TablaAvances:', searchTerm);
    const [showModalDetalle, setShowModalDetalle] = useState(false);
    const [showModalEliminacion, setShowModalEliminacion] = useState(false);

    const [selectedAvance, setSelectedAvance] = useState(null);

    const [selectedVisualizacion, setSelectedVisualizacion] = useState({
        avance: '',
        fecha: '',
        archivo: '',
        imagen: '',
    });


    //Visualizar informacion de un avance
    const handleVisualizacionClick = (avance) => {
        setShowModalDetalle(true);
        setSelectedAvance(avance);
    };

    const normalizeText = (text) => {
        if (text) {
            return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        }
        return '';
    };


    const filteredAvances = avancesData.filter((avance) =>
        normalizeText(avance.avance).includes(normalizeText(searchTerm))
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

    return (

        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="encabezado-tabla text-center align-middle" style={{ width: '10%' }}>#</th>
                        <th className="encabezado-tabla text-center align-middle" style={{ width: '35%' }}>Avance</th>
                        <th className="encabezado-tabla text-center align-middle" style={{ width: '15%' }}>Fecha</th>
                        <th className="encabezado-tabla text-center align-middle" style={{ maxWidth: '15%' }}>Archivo</th>
                        <th className="encabezado-tabla text-center align-middle" style={{ width: '5%' }}>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedAvances.map((avance, index) => (
                        <tr key={index}>
                            <td className="columna-nombre-tabla text-center align-middle">{avance.id}</td>
                            <td className="celdas-restantes-tabla text-center align-middle">{avance.avance}</td>
                            <td className="celdas-restantes-tabla text-center align-middle">{avance.fecha}</td>
                            <td className="celdas-restantes-tabla text-center align-middle" > <FontAwesomeIcon icon={faFile} style={{ color: "#507E9D", }} />&nbsp;&nbsp;<a href='#'>{avance.archivo}</a></td>
                            <td className="celdas-restantes-tabla text-center align-middle" onClick={() => handleVisualizacionClick(avance)}><FontAwesomeIcon icon={faEye} /></td>
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
        </div >


    );
};

export default TablaAvances;