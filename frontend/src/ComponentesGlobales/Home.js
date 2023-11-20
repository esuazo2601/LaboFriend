import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdministradorSidebar from '../Usuarios/Administrador/AdministradorSideBar';
import AdministadorCuenta from '../Usuarios/Administrador/Cuenta/AdministradorCuenta'
import AdministadorTablero from '../Usuarios/Administrador/Tablero/AdministradorTablero'
import AdministadorInventario from '../Usuarios/Administrador/Inventario/AdministradorInventario'
import AdministadorInvestigaciones from '../Usuarios/Administrador/Investigaciones/AdminitradorInventigaciones'
import AdministadorReservaHora from '../Usuarios/Administrador/ReservaHoras/AdministradorReservaHoras'
import AdministadorNotificaciones from '../Usuarios/Administrador/Notificaciones/AdministradorNotificaciones'
import Login from './Login'

function Home() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      <AdministradorSidebar>
        <Routes>
          <Route path="/administrador/cuenta" element={<AdministadorCuenta />} />
          <Route path="/administrador/tablero" element={<AdministadorTablero />} />
          <Route path="/administrador/inventario" element={<AdministadorInventario />} />
          <Route path="/administrador/investigaciones" element={<AdministadorInvestigaciones />} />
          <Route path="/administrador/reservaHora" element={<AdministadorReservaHora />} />
          <Route path="/administrador/notificaciones" element={<AdministadorNotificaciones />} />
        </Routes>
      </AdministradorSidebar>
    </BrowserRouter>
  );
}

export default Home;

