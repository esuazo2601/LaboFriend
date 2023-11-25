import React, { useEffect, useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './investigaciones.css';
import { getInvestigacionById, getTrabajandoEmail } from '../../../api_service/investigaciones_api.js'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalNuevaInvestigacion from './Personales/Investigacion/Componentes/ModalNuevaInvestigacion'


const InvestigacionesPersonales = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [investigacionesPersonales, setInvestigacionesPersonales] = useState([]);
  const [loading, setLoading] = useState(true);
  //const [personalInv, setPersonalInv] = useEffect
  /*   const {data,error,loading} = useAxios({
      url:""
    }) */


  useEffect(() => {
    try {
      const getData = async () => {
        const data = await getTrabajandoEmail(localStorage.getItem('email'));
        let investigacion_list = [];
        if(data){
          for (var i = 0; i < data.length; ++i) {
            const id = data[i].id_investigacion
            const investigacion = await getInvestigacionById(id)
            investigacion_list.push(investigacion)
            console.log('Investigacion list: ', investigacion_list)
          }
          setInvestigacionesPersonales(investigacion_list)
          setLoading(false)
        }else{
          setInvestigacionesPersonales([])
          setLoading(false)
        }
      };
      getData();

    } catch (error) {
      console.log("se encontro un error: ",error);
      setLoading(false);
      setInvestigacionesPersonales([])
    }
  }, []);


  const normalizeText = (text) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  const filteredInvestigaciones = investigacionesPersonales.filter(investigacion =>
    normalizeText(investigacion[0].titulo).includes(normalizeText(searchTerm))
  );

  const itemsPerPage = 20;
  const totalItems = filteredInvestigaciones.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Página actual
  const paginatedInvestigaciones = filteredInvestigaciones.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <Container>
      <h1 className="letra-grande">Investigaciones Personales</h1>
      <hr className="linea-divisora" />
      <Row>
        <Col>
          {loading ? (
            <div className='loading-spinner'>
              <Spinner animation="border" role="status" size="lg">
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
            </div>
          ) : (
            investigacionesPersonales.length > 0 && (
              <div className="search-container-investigaciones">
                <input
                  type="text"
                  placeholder="Buscar por nombre"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <span className="search-icon">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
              </div>
            )
          )}
        </Col>
        <Col>
          <ModalNuevaInvestigacion />
        </Col>
      </Row>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          {investigacionesPersonales.length === 0 ? (
            <p>No hay investigaciones disponibles.</p>
          ) : (
            paginatedInvestigaciones.map((investigacion, index) => (
              <Button key={index} className="boton-investigacion" onClick={() => { window.location.href = '/administrador/investigaciones/personales/investigacion'; }}>
                {investigacion[0].titulo.length > 50
                  ? `${investigacion[0].titulo.substring(0, 50)}...`
                  : investigacion[0].titulo}
              </Button>
            ))
          )}
        </div>
      )}

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </Container>
  );
};

export default InvestigacionesPersonales;