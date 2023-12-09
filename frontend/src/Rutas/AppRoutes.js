import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../ComponentesGlobales/Login';
import AdministradorLayout from '../Usuarios/Administrador/AdministradorLayout';
import AdministradorCuenta from '../Usuarios/Administrador/Cuenta/AdministradorCuenta';
import AdministradorTablero from '../Usuarios/Administrador/Tablero/AdministradorTablero';
import AdministradorInventario from '../Usuarios/Administrador/Inventario/AdministradorInventario';
import AdministradorReservaHora from '../Usuarios/Administrador/ReservaHoras/AdministradorReservaHoras';
import AdministradorEditarUsuarios from '../Usuarios/Administrador/Editar/AdministradorEditarUsuarios';
import InvestigacionesPersonales from '../Usuarios/Administrador/Investigaciones/InventigacionesPersonales';
import InvestigacionesTerceros from '../Usuarios/Administrador/Investigaciones/InventigacionesTerceros';
import Investigacion from '../Usuarios/Administrador/Investigaciones/Personales/Investigacion/Investigacion';
import InvestigacionTercero from '../Usuarios/Administrador/Investigaciones/Personales/Investigacion/InvestigacionTercero';

import AyudanteLayout from '../Usuarios/Ayudante/AyudanteLayout';
import AyudanteCuenta from '../Usuarios/Ayudante/Cuenta/AyudanteCuenta';
import AyudanteTablero from '../Usuarios/Ayudante/Tablero/AyudanteTablero';
import AyudanteInventario from '../Usuarios/Ayudante/Inventario/AyudanteInventario';
import AyudanteReservaHora from '../Usuarios/Ayudante/ReservaHoras/AyudanteReservaHoras';
import AyudanteNotificaciones from '../Usuarios/Ayudante/Notificaciones/AyudanteNotificaciones';
import AyudanteInvestigacionesPersonales from '../Usuarios/Ayudante/Investigaciones/AyudanteInventigacionesPersonales';
import AyudanteInvestigacionesTerceros from '../Usuarios/Ayudante/Investigaciones/AyudanteInventigacionesTerceros';
import AyudanteInvestigacion from '../Usuarios/Ayudante/Investigaciones/Personales/Investigacion/AyudanteInvestigacion';
import AyudanteInvestigacionTerceros from '../Usuarios/Ayudante/Investigaciones/Terceros/Investigacion/AyudanteInvestigacionTerceros';

import EstudianteLayout from '../Usuarios/Estudiante/EstudianteLayout';
import EstudianteCuenta from '../Usuarios/Estudiante/Cuenta/EstudianteCuenta';
import EstudianteTablero from '../Usuarios/Estudiante/Tablero/EstudianteTablero';
import EstudianteInventario from '../Usuarios/Estudiante/Inventario/EstudianteInventario';
import EstudianteReservaHora from '../Usuarios/Estudiante/ReservaHoras/EstudianteReservaHoras';
import EstudianteNotificaciones from '../Usuarios/Estudiante/Notificaciones/EstudianteNotificaciones';
import EstudianteInvestigaciones from '../Usuarios/Estudiante/Investigaciones/InventigacionesPersonales';
import EstudianteInvestigacion from '../Usuarios/Estudiante/Investigaciones/Personales/Investigacion/Investigacion';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/administrador/*" element={<AdministradorLayout />}>
        <Route path="cuenta" element={<AdministradorCuenta />} />
        <Route path="tablero" element={<AdministradorTablero />} />
        <Route path="inventario" element={<AdministradorInventario />} />
        <Route path="reservaHora" element={<AdministradorReservaHora />} />
        <Route path="editarUsuarios" element={<AdministradorEditarUsuarios />} />
        <Route path="investigaciones/personales" element={<InvestigacionesPersonales />} />
        <Route path="investigaciones/terceros" element={<InvestigacionesTerceros />} />
        <Route path="investigaciones/terceros/:investigacionId" element={<InvestigacionTercero />} />
        <Route path="investigaciones/personales/:investigacionId" element={<Investigacion />} />
      </Route>

      <Route path="/ayudante/*" element={<AyudanteLayout />}>
        <Route path="cuenta" element={<AyudanteCuenta />} />
        <Route path="tablero" element={<AyudanteTablero />} />
        <Route path="inventario" element={<AyudanteInventario />} />
        <Route path="reservaHora" element={<AyudanteReservaHora />} />
        <Route path="notificaciones" element={<AyudanteNotificaciones />} />
        <Route path="investigaciones/personales" element={<AyudanteInvestigacionesPersonales />} />
        <Route path="investigaciones/terceros" element={<AyudanteInvestigacionesTerceros />} />
        <Route path="investigaciones/terceros/investigacion" element={<AyudanteInvestigacionTerceros />} />
        <Route path="investigaciones/personales/investigacion" element={<AyudanteInvestigacion />} />
        
      </Route>
      
      <Route path="/estudiante/*" element={<EstudianteLayout />}>
        <Route path="cuenta" element={<EstudianteCuenta />} />
        <Route path="tablero" element={<EstudianteTablero />} />
        <Route path="inventario" element={<EstudianteInventario />} />
        <Route path="reservaHora" element={<EstudianteReservaHora />} />
        <Route path="notificaciones" element={<EstudianteNotificaciones />} />
        <Route path="investigaciones/personales" element={<EstudianteInvestigaciones />} />
        <Route path="investigaciones/personales/:investigacionId" element={<EstudianteInvestigacion />} />
        </Route>
    </Routes>
  );
};

export default AppRoutes;