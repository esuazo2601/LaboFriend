import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import '../Estilos/tabla.css';
import '../Estilos/paginacion.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import ModalStockMicroorganismo from './ModalStockMicroorganismo';
import ModalDescriptionMicroorganismo from './ModalDescriptionMicroorganismo';
import ModalEliminarConfirmar from './ModalEliminarConfirmar';
import { deleteMicroorganismo, getAllMicroorg, postMicroorganismo } from '../../../../api_service/microorganismo_api';

const Microorganismo = ({ searchTerm, refreshMicroorganismos }) => {
  const microorganismosData = [
    {
      
      nombre: 'Microorganismo 1',
      nombreCientifico: 'Cientifico 1',
      procedencia: 'Origen 1',
      detalles: 'Detalles 1',
    },
  ];
  const [microorganismos, setMicroorganismos] = useState([]);
  const [newStock, setNewStock] = useState(0);
  const [loading, setLoading] =useState(true);
  const [showModalEliminar, setShowModalEliminar] = useState(false);
  const [showModalDescription, setShowModalDescription] = useState(false);
  const [showModalStock, setShowModalStock] = useState(false);
  const [selectedMicroorganismo, setSelectedMicroorganismo] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState({
    nombre_cientifico: '',
    procedencia: '',
    detalles: '',
  });
  const [refreshDelete, setRefreshDelete] = useState(false)


  useEffect(() => {
    try
    {
      const fetchData  = async () =>{
        const data = await getAllMicroorg();
        if(data){
          setMicroorganismos(data)
          setLoading(false)
          console.log(data)
          setRefreshDelete(false)
        }else{
          setMicroorganismos([])
          setLoading(false)
          setRefreshDelete(false)
        }
      }  
      fetchData();
    }
    catch(error)
    {
      console.log(error)
      setMicroorganismos([])
      setLoading(false)
      setRefreshDelete(false)
    }
  },[refreshMicroorganismos, refreshDelete])
  

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
      nombre_cientifico: microorganismo.nombre_cientifico,
      procedencia: microorganismo.procedencia,
      detalles: microorganismo.detalles,
    });
  };


  const handleSaveDescription = () => {
    setShowModalDescription(false);
  };

  // Filtra los elementos 
  const filteredMicroorganismos = microorganismos.filter((microorganismo) =>
    microorganismo.nombre_comun.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleDelete = async (id) => {
    console.log(id)
    try{
      const resp = await deleteMicroorganismo(id)
      console.log(resp)
      setRefreshDelete(true)
    }catch(error){
      console.log(error)
    }
    console.log("Microorganismo eliminado"); // Simulación con backend
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
        microorganismos.length > 0 ? (
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="encabezado-tabla text-center align-middle">Nombre</th>
                  <th className="encabezado-tabla text-center align-middle">Acción</th>
                </tr>
              </thead>
              <tbody>
                {paginatedMicroorganismos.map((microorganismo, index) => (
                  <tr key={index}>
                    <td className="columna-nombre-tabla text-center align-middle">
                      {microorganismo.nombre_comun}
                    </td>

                    <td className="celdas-restantes-tabla text-center align-middle">
                      <div className="action-container">
                        <div className="action-item" onClick={() => handleDescriptionClick(microorganismo)}>
                          <FontAwesomeIcon style={{cursor:'pointer'}} icon={faEye} />
                        </div>
                        <div className="action-divider"></div>
                        <div className="action-item" onClick={() => handleEliminarClick(microorganismo)}>
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
              nombreElemento={selectedMicroorganismo ? selectedMicroorganismo.nombre_comun : ''}
              onDelete={handleDelete}
            />

            <ModalEliminarConfirmar
              show={showModalEliminar}
              onHide={() => setShowModalEliminar(false)}
              tipoElemento="Microorganismo" 
              nombreElemento={selectedMicroorganismo ? selectedMicroorganismo.nombre_comun : ''}
              id = {selectedMicroorganismo ? selectedMicroorganismo.id : ''}
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

export default Microorganismo;