import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../ComponentesGlobales/Login';
import AdministradorLayout from '../Usuarios/Administrador/AdministradorLayout';
import AdministradorCuenta from '../Usuarios/Administrador/Cuenta/AdministradorCuenta';
import AdministradorTablero from '../Usuarios/Administrador/Tablero/AdministradorTablero';
import AdministradorInventario from '../Usuarios/Administrador/Inventario/AdministradorInventario';
import AdministradorReservaHora from '../Usuarios/Administrador/ReservaHoras/AdministradorReservaHoras';
import AdministradorNotificaciones from '../Usuarios/Administrador/Notificaciones/AdministradorNotificaciones';
import InvestigacionesPersonales from '../Usuarios/Administrador/Investigaciones/InventigacionesPersonales';
import InvestigacionesTerceros from '../Usuarios/Administrador/Investigaciones/InventigacionesTerceros';
import Investigacion from '../Usuarios/Administrador/Investigaciones/Personales/Investigacion/Investigacion';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/administrador/*" element={<AdministradorLayout />}>
        <Route path="cuenta" element={<AdministradorCuenta />} />
        <Route path="tablero" element={<AdministradorTablero />} />
        <Route path="inventario" element={<AdministradorInventario />} />
        <Route path="reservaHora" element={<AdministradorReservaHora />} />
        <Route path="notificaciones" element={<AdministradorNotificaciones />} />
        <Route path="investigaciones/personales" element={<InvestigacionesPersonales />} />
        <Route path="investigaciones/terceros" element={<InvestigacionesTerceros />} />
        <Route path="investigaciones/terceros/insvestigacion" element={<Investigacion />} />
        <Route path="investigaciones/personales/investigacion" element={<Investigacion />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;