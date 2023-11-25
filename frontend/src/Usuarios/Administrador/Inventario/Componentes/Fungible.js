import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import ModalStockFungible from './ModalStockFungible';
import ModalDescriptionFungible from './ModalDescriptionFungible';
import ModalEliminarConfirmar from './ModalEliminarConfirmar';
import '../Estilos/tabla.css';
import '../Estilos/paginacion.css';
import {getProducto} from '../../../../api_service/inventario_api.js'

const Fungible = ({ searchTerm }) => {
  const fungiblesData = [
    {
      nombre: 'Fungible 12',
      tipo: 'tipo 3',
      ubicacion: 'Ubicación 3',
      // detalles: 'Detalles 3',
      // imagen: 'imagen.jpg', 
      stock: 100
    },
  ];
  const [loading, setLoading] =useState(true);
  const [listaFungibles, setListaFungibles] = useState([]);
  const [showModalEliminar, setShowModalEliminar] = useState(false);
  const [showModalStock, setShowModalStock] = useState(false);
  const [showModalDescription, setShowModalDescription] = useState(false);
  const [selectedFungible, setSelectedFungible] = useState(null);
   const [selectedDescription, setSelectedDescription] = useState({
    descripcion: '',
    tipo: '',
    ubicacion: '',
    // detalles: '',
    // imagen: '',
  });
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

  const [newStock, setNewStock] = useState(0);

  const handleEliminarClick = (fungible, tipo) => {
    setSelectedFungible(fungible);
    setShowModalEliminar(true);
  };

  const handleDelete = () => {
    console.log("Elemento eliminado"); // Simulación con backend
  };

  // Stock del fungible seleccionado
  const handleStockClick = (fungible) => {
    setShowModalStock(true);
    setSelectedFungible(fungible);
    setNewStock(fungible.cantidad_total);
  };

  // Editar descripción del fungible seleccionado
  const handleDescriptionClick = (fungible) => {
    setShowModalDescription(true);
    setSelectedFungible(fungible);
    setSelectedDescription({
      descripcion: fungible.descripcion,
      procedencia: fungible.procedencia,
      ubicacion: fungible.ubicacion,
      imagen: fungible.imagen,
    });
  };

  const handleIncreaseStock = () => {
    setNewStock(newStock + 1);
  };

  const handleDecreaseStock = () => {
    if (newStock > 0) {
      setNewStock(newStock - 1);
    }
  };

  const handleSaveStock = () => {
    setShowModalStock(false);
  };

  const handleSaveDescription = () => {
    setShowModalDescription(false);
  };

  // Filtra los elementos 
  const filteredFungibles = listaFungibles.filter((fungible) =>
    fungible.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 5; // Cantidad de elementos por pág
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = filteredFungibles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        listaFungibles.length > 0 ? (
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="encabezado-tabla text-center align-middle">Nombre</th>
                  <th className="encabezado-tabla text-center align-middle">Stock</th>
                  <th className="encabezado-tabla text-center align-middle">Acción</th>
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
                      onClick={() => handleStockClick(fungible)}
                    >
                      {fungible.cantidad_total}
                    </td>
                    <td className="celdas-restantes-tabla text-center align-middle">
                      <div className="action-container">
                        <div className="action-item" onClick={() => handleDescriptionClick(fungible)}>
                          <FontAwesomeIcon icon={faEye} />
                        </div>
                        <div className="action-divider"></div>
                        <div className="action-item" onClick={() => handleEliminarClick(fungible)}>
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
  
            <ModalStockFungible
              show={showModalStock}
              onHide={() => setShowModalStock(false)}
              fungible={selectedFungible}
              newStock={newStock}
              onIncrease={handleIncreaseStock}
              onDecrease={handleDecreaseStock}
              onSave={handleSaveStock}
            />
  
            <ModalDescriptionFungible
              show={showModalDescription}
              onHide={() => setShowModalDescription(false)}
              fungible={selectedFungible}
              onSave={handleSaveDescription}
            />
  
            <ModalEliminarConfirmar
              show={showModalEliminar}
              onHide={() => setShowModalEliminar(false)}
              tipoElemento="Fungible" 
              nombreElemento={selectedFungible ? selectedFungible.nombre : ''}
              onDelete={handleDelete}
            />
          </div>
        ):(
          <p className="text-center">No se encontraron datos.</p>
        )
      )}
    </div>
  );
};

export default Fungible;