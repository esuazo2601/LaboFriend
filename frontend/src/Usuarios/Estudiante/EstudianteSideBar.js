import React from 'react';
import { FaUserAlt, FaTachometerAlt, FaArchive, FaFlask, FaClock, FaBell } from "react-icons/fa";
import '../../EstilosGlobales/sidebar.css';
import { NavLink } from 'react-router-dom';

const AyudanteSidebar = ({ children, toggleSidebar }) => {
    const menuItem = [
        {
            path: "/estudiante/cuenta",
            name: "Cuenta",
            icon: <FaUserAlt />
        },
        {
            path: "/estudiante/tablero",
            name: "Tablero",
            icon: <FaTachometerAlt />
        },
        {
            path: "/estudiante/inventario",
            name: "Inventario",
            icon: <FaArchive />
        },
        {
            path: "/estudiante/investigaciones/personales",
            name: "Investigaciones",
            icon: <FaFlask />,
        },
        {
            path: "/estudiante/reservaHora",
            name: "Reserva de horas",
            icon: <FaClock />
        },
        {
            path: "/estudiante/notificaciones",
            name: "Notificaciones",
            icon: <FaBell />
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

export default AyudanteSidebar;

