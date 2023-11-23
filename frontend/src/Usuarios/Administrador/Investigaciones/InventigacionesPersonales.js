import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './investigaciones.css';
import { getInvestigacionById, getTrabajandoEmail } from '../../../api_service/investigaciones_api.js'

const InvestigacionesPersonales = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [investigacionesPersonales, setInvestigacionesPersonales] = useState([]);
  //const [personalInv, setPersonalInv] = useEffect
  /*   const {data,error,loading} = useAxios({
      url:""
    }) */


  useEffect(() => {
    try {
      const getData = async () => {
        const data = await getTrabajandoEmail(localStorage.getItem('email'));
        let investigacion_list = [];

        for (var i = 0; i < data.length; ++i) {
          const id = data[i].id_investigacion
          const investigacion = await getInvestigacionById(id)
          //console.log(investigacion[0].id)
          investigacion_list.push(investigacion)
          console.log('Investigacion list: ', investigacion_list)
        }
        setInvestigacionesPersonales(investigacion_list)
      };
      getData();

    } catch (error) {
      console.log(error);
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

      <div>
        {investigacionesPersonales.map((investigacion, index) => (
          <Button key={index} className="boton-investigacion" onClick={() => { window.location.href = '/administrador/investigaciones/personales/investigacion'; }}>
            {investigacion[0].titulo.length > 50
              ? `${investigacion[0].titulo.substring(0, 50)}...`
              : investigacion[0].titulo}
          </Button>
        ))}
      </div>

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