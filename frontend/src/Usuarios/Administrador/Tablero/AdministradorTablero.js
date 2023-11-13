import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { FaUserAlt, FaArchive, FaUserSecret } from "react-icons/fa";
import '../../../EstilosGlobales/basicos.css';
import './tablero.css';

function AdministradorTablero() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
       <Container>
        <h1 className="letra-grande">Tablero</h1>
        <hr className="linea-divisora" />
        <div className="tablero-container">
          <NavLink to="/administrador/cuenta" className="tablero-item">
            <FaUserAlt className="tablero-icon" />
            <span>Cuenta</span>
          </NavLink>
          <NavLink to="/administrador/inventario" className="tablero-item">
            <FaArchive className="tablero-icon" />
            <span>Inventario</span>
          </NavLink>
          <NavLink to="/administrador/investigaciones/personales" className="tablero-item">
          <FaUserSecret className="link-icon"/> 
            <span>Investigaciones Personales</span>
          </NavLink>
        </div>
      </Container>
    </motion.div>
  );
}
  
  export default AdministradorTablero;