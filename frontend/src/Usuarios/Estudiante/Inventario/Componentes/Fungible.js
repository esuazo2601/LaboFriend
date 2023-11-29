import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import '../Estilos/tabla.css';
import '../Estilos/paginacion.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import ModalDescriptionFungible from './ModalDescriptionFungible';
import { getProducto } from '../../../../api_service/inventario_api';

const Fungible = ({ searchTerm }) => {

  const [showModalStock, setShowModalStock] = useState(false);
  const [showModalDescription, setShowModalDescription] = useState(false);
  const [selectedFungible, setSelectedFungible] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState({
    descripcion: '',
    procedencia: '',
    ubicacion: '',
    detalles: '',
    imagen: '',
  });
  const [listaFungibles,setListaFungibles] = useState([])
  const [loading,setLoading] = useState([])

  // Stock del fungible seleccionado
  const handleStockClick = (fungible) => {
    setShowModalStock(true);
    setSelectedFungible(fungible);

  };

  // Editar descripción del fungible seleccionado
  const handleDescriptionClick = (fungible) => {
    setShowModalDescription(true);
    setSelectedFungible(fungible);
    setSelectedDescription({
      descripcion: fungible.descripcion,
      procedencia: fungible.procedencia,
      ubicacion: fungible.ubicacion,
      detalles: fungible.detalles,
      imagen: fungible.imagen,
    });
  };

  // Filtra los elementos 
  const filteredFungibles = listaFungibles.filter((fungible) =>
    fungible.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 5; // Cantidad de elementos por pág
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = filteredFungibles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(()=>{
    try {
      const getData = async () => {
        const data = await getProducto()
        if(data){
          console.log(data)
          setListaFungibles(data)
          setLoading(false)
        }else{
          setListaFungibles([])
          setLoading(false)
        }
      };
      getData();

    } catch (error) {
      console.log("se encontro un error: ",error);
      setListaFungibles([])
        setLoading(false)
    }
  },[])

  // Calcula los elementos para la pág actual
  const paginatedFungibles = filteredFungibles.slice(
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
      {loading ? (
        <div className='loading-spinner'>
          <Spinner animation="border" role="status" size="lg">
          </Spinner>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="encabezado-tabla text-center align-middle">Nombre</th>
              <th className="encabezado-tabla text-center align-middle">Descripción</th>
              <th className="encabezado-tabla text-center align-middle">Stock</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFungibles.map((fungible, index) => (
              <tr key={index}>
                <td className="columna-nombre-tabla text-center align-middle">
                  {fungible.nombre}
                </td>
                <td
                  className="celdas-restantes-tabla text-center align-middle"
                  onClick={() => handleDescriptionClick(fungible)}
                >
                  <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faEye} />
                </td>
                <td
                  className="celdas-restantes-tabla text-center align-middle"
                  onClick={() => handleStockClick(fungible)}
                >
                  {fungible.cantidad_total}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
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
  
        <ModalDescriptionFungible
          show={showModalDescription}
          onHide={() => setShowModalDescription(false)}
          fungible={selectedFungible}
        />
    </div>
  );
  
};

export default Fungible;
