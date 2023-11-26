import React from 'react';
import { FaUserAlt, FaTachometerAlt, FaArchive, FaFlask, FaClock, FaUserEdit } from "react-icons/fa";
import '../../EstilosGlobales/sidebar.css';
import { NavLink } from 'react-router-dom';

const AdministradorSidebar = ({ children, toggleSidebar }) => {
    const menuItem = [
        {
            path: "/administrador/cuenta",
            name: "Cuenta",
            icon:  <FaUserAlt />
        },
        {
            path: "/administrador/tablero",
            name: "Tablero",
            icon: <FaTachometerAlt /> 
        },
        {
            path: "/administrador/inventario",
            name: "Inventario",
            icon: <FaArchive />
        },
        {
            path: "/administrador/investigaciones",
            name: "Investigaciones",
            icon: <FaFlask/>,
            onClick: (e) => {
                e.preventDefault(); // Previene la navegación
                toggleSidebar(); 
            }
        },
        {
            path: "/administrador/reservaHora",
            name: "Reserva de horas",
            icon: <FaClock />
        },
        {
            path: "/administrador/editarUsuarios",
            name: "Administrar usuarios",
            icon: <FaUserEdit />
        }
    ];

    return (
        <div className="container">
            <div className="sidebar">
                <div className="top_section">
                    <img src="/logo.jpg" alt="Logo" />
                </div>
                {menuItem.map((item, index) => (
                    <NavLink 
                        to={item.path} 
                        key={index} 
                        className="link" 
                        activeClassName="active"
                        onClick={item.onClick} 
                    >
                        <div className="icon">{item.icon}</div>
                        <div className="link_text">{item.name}</div>
                    </NavLink>
                ))}
            </div>
            <main>{children}</main>
        </div>
    );
};

export default AdministradorSidebar;

