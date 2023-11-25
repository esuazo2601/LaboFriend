import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import '../Estilos/tabla.css';
import '../Estilos/paginacion.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import ModalStockMicroorganismo from './ModalStockMicroorganismo';
import ModalDescriptionMicroorganismo from './ModalDescriptionMicroorganismo';
import ModalEliminarConfirmar from './ModalEliminarConfirmar';
import { getAllMicroorg, postMicroorganismo } from '../../../../api_service/microorganismo_api';

const Microorganismo = ({ searchTerm }) => {
  const microorganismosData = [
    {
      
      nombre: 'Microorganismo 1',
      nombreCientifico: 'Cientifico 1',
      procedencia: 'Origen 1',
      detalles: 'Detalles 1',
    },
  ];

  const [showModalEliminar, setShowModalEliminar] = useState(false);
  const [showModalDescription, setShowModalDescription] = useState(false);
  const [showModalStock, setShowModalStock] = useState(false);
  const [selectedMicroorganismo, setSelectedMicroorganismo] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState({
    procedencia: '',
    detalles: '',
  });


  const [microorganismos, setMicroorganismos] = useState([]);
  const [newStock, setNewStock] = useState(0);


  useEffect(() => {
    try
    {
      const fetchData  = async () =>{
        const data = await getAllMicroorg();
        setMicroorganismos(data)
        console.log(data)
      }  
      fetchData();
    }
    catch(error)
    {
      console.log(error)
    }
  },[])
  

  // Stock del microorganismo seleccionado
  const handleStockClick = (microorganismo) => {
    setShowModalStock(true);
    setSelectedMicroorganismo(microorganismo);
    setNewStock(microorganismo.stock);
  };

  // Editar descripción del microorganismo seleccionado
  const handleDescriptionClick = (microorganismo) => {
    setShowModalDescription(true);
    setSelectedMicroorganismo(microorganismo);
    setSelectedDescription({
      procedencia: microorganismo.procedencia,
      detalles: microorganismo.detalles,
    });
  };


  const handleSaveDescription = () => {
    setShowModalDescription(false);
  };

  // Filtra los elementos 
  const filteredMicroorganismos = microorganismosData.filter((microorganismo) =>
    microorganismo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 5; // Cantidad de elementos por pág
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = filteredMicroorganismos.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calcula los elementos para la pág actual
  const paginatedMicroorganismos = filteredMicroorganismos.slice(
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

  const handleEliminarClick = (microorganismo) => {
    setSelectedMicroorganismo(microorganismo);
    setShowModalEliminar(true);
  };

  const handleDelete = () => {
    console.log("Microorganismo eliminado"); // Simulación con backend
  };

  return (
    <div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th className="encabezado-tabla text-center align-middle">Nombre</th>
          <th className="encabezado-tabla text-center align-middle">Acción</th>
        </tr>
      </thead>
      <tbody>
        {microorganismos.map((microorganismo, index) => (
          <tr key={index}>
            <td className="columna-nombre-tabla text-center align-middle">
              {microorganismo.nombre_comun}
            </td>
            
            <td className="celdas-restantes-tabla text-center align-middle">
              <div className="action-container">
                <div className="action-item" onClick={() => handleDescriptionClick(microorganismo)}>
                  <FontAwesomeIcon icon={faEye} />
                </div>
                <div className="action-divider"></div>
                <div className="action-item" onClick={() => handleEliminarClick(microorganismo)}>
                  <FontAwesomeIcon icon={faTrash} />
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

      <ModalDescriptionMicroorganismo
        show={showModalDescription}
        onHide={() => setShowModalDescription(false)}
        microorganismo={selectedMicroorganismo}
        onSave={handleSaveDescription}
      />

      <ModalEliminarConfirmar
        show={showModalEliminar}
        onHide={() => setShowModalEliminar(false)}
        tipoElemento="Microorganismo" 
        nombreElemento={selectedMicroorganismo ? selectedMicroorganismo.nombre : ''}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Microorganismo;