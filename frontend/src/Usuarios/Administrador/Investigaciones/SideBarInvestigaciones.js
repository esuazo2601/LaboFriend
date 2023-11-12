import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTimes, FaUserSecret, FaUsers } from 'react-icons/fa'; 
import '../../../EstilosGlobales/sidebarinvestigaciones.css'; 

const SideBarInvestigaciones = ({ onClose }) => {
    const sideBarRef = useRef();

    // Controlador para cerrar el sidebar si se hace clic fuera de el
    const handleClickOutside = (event) => {
        if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
            onClose(); // Cierra el sidebar
        }
    };

    // Efecto para agregar y limpiar el evento de escucha
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCloseClick = () => {
        onClose(); 
    };
    return (
        <div className="sideBarInvestigaciones" ref={sideBarRef}>
            <div className="closeButton" onClick={handleCloseClick}>
                <FaTimes className="close-icon"/> 
            </div>
            <div className="link-container"> 
                <div className="icon-link-wrapper">
                    <NavLink
                        to="/administrador/investigaciones/personales"
                        className="link-investigaciones"
                        activeClassName="active"
                        onClick={handleCloseClick}
                    >
                        <FaUserSecret className="link-icon"/> 
                        <span>Personales</span>
                    </NavLink>
                </div>
                <div className="icon-link-wrapper">
                    <NavLink
                        to="/administrador/investigaciones/terceros"
                        className="link-investigaciones"
                        activeClassName="active"
                        onClick={handleCloseClick}
                    >
                        <FaUsers className="link-icon"/> 
                        <span>De Terceros</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default SideBarInvestigaciones;