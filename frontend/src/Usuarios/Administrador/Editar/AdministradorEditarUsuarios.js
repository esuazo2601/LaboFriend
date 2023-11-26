import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { motion } from 'framer-motion';
import '../Inventario/Estilos/tabla.css';
import '../Inventario/Estilos/paginacion.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import ModalEliminarConfirmar from './ModalEliminarConfirmar';
import ModalEditarUsuario from './ModalEditarUsuario';
import { getUsers,getUserByEmail,getUserScopes } from '../../../api_service/user_api';

function AdministradorInventario() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [showModalEliminar, setShowModalEliminar] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [tipoUsuarioEditar, setTipoUsuarioEditar] = useState('');
  const [usuariosTabla, setUsuariosTabla] = useState([]);
  
  useEffect(() => {
    try {
      const getData = async () => {
        const data = await getUsers();
        if (data) {
          const usuariosConScopes = await Promise.all(
            data.map(async (usuario) => {
              const scopes = await getUserScopes(usuario.email);
              const firstScope = scopes[0] 
              console.log('Scopes',firstScope)
              return {
                ...usuario,
                tipo: firstScope || [] // Asegúrate de manejar el caso en que el nuevoCampo sea null o undefined
              };
            })
          );
  
          setUsuariosTabla(usuariosConScopes);
        } else {
          setUsuariosTabla([]);
        }
      };
  
      getData();
    } catch (error) {
      console.log("Se encontró un error:", error);
      setUsuariosTabla([]);
    }
  }, []);
  

  console.log('Usuarios Tabla',usuariosTabla)
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsuarios = usuariosTabla.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredUsuarios.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedUsuarios = filteredUsuarios.slice(
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

  const handleEditar = (usuario) => {
    setSelectedUsuario(usuario);
    setTipoUsuarioEditar(usuario.tipo);
    setShowModalEditar(true);
  };

  const handleUpdateTipoUsuario = (nuevoTipo) => {
    console.log(`Usuario ${selectedUsuario.nombre} cambiado de ${selectedUsuario.tipo} a ${nuevoTipo}`);
    setTipoUsuarioEditar(nuevoTipo);
  };
  

  const handleEliminarClick = (usuario) => {
    setSelectedUsuario(usuario);
    setShowModalEliminar(true);
  }

  const handleDelete = () => {
    console.log("Usuario eliminado"); 
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container>
        <h1 className="letra-grande">Administrar Usuarios</h1>
        <hr className="linea-divisora" />
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por nombre o correo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
        <Table striped bordered hover className="estilo-tabla">
          <thead>
            <tr>
              <th className="encabezado-tabla text-center align-middle">Nombre</th>
              <th className="encabezado-tabla text-center align-middle">Correo</th>
              <th className="encabezado-tabla text-center align-middle">Tipo de Usuario</th>
              <th colspan="2" className="encabezado-tabla text-center align-middle">Acción</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsuarios.map((usuario, index) => (
              <tr key={index}>
                <td className="columna-nombre-tabla text-center align-middle" >{usuario.nombre}</td>
                <td className="celdas-restantes-tabla text-center align-middle">{usuario.email}</td>
                <td className="celdas-restantes-tabla text-center align-middle">{usuario.tipo}</td>
                <td className="celdas-restantes-tabla text-center align-middle" onClick={() => handleEditar(usuario)}><FontAwesomeIcon style={{cursor:'pointer'}} icon={faEdit} /></td>
                <td className="celdas-restantes-tabla text-center align-middle" onClick={() => handleEliminarClick(usuario)}><FontAwesomeIcon style={{cursor:'pointer'}} icon={faTrash} /></td>
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

        {selectedUsuario && (
          <ModalEditarUsuario
            show={showModalEditar}
            onHide={() => setShowModalEditar(false)}
            usuario={selectedUsuario}
            tipoUsuarioActual={tipoUsuarioEditar}
            onActualizarTipoUsuario={handleUpdateTipoUsuario}
          />
        )}

        <ModalEliminarConfirmar
          show={showModalEliminar}
          onHide={() => setShowModalEliminar(false)}
          tipoElemento="Usuario"
          nombreElemento={selectedUsuario ? selectedUsuario.nombre : ''}
          onDelete={handleDelete}
        />

      </Container>
    </motion.div>
  );
}

export default AdministradorInventario;