import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdministradorSidebar from './Usuarios/Administrador/AdministradorSideBar';
import AdministadorCuenta from './Usuarios/Administrador/Cuenta/AdministradorCuenta'
import AdministadorTablero from './Usuarios/Administrador/Tablero/AdministradorTablero'
import AdministadorInventario from './Usuarios/Administrador/Inventario/AdministradorInventario'
import AdministadorReservaHora from './Usuarios/Administrador/ReservaHoras/AdministradorReservaHoras'
import AdministadorNotificaciones from './Usuarios/Administrador/Notificaciones/AdministradorNotificaciones'
import SideBarInvestigaciones from './Usuarios/Administrador/Investigaciones/SideBarInvestigaciones'
import InvestigacionesPersonales from './Usuarios/Administrador/Investigaciones/InventigacionesPersonales'
import InvestigacionesTerceros from './Usuarios/Administrador/Investigaciones/InventigacionesTerceros'
import Investigacion from "./Usuarios/Administrador/Investigaciones/Personales/Investigacion/Investigacion";
import Login from './ComponentesGlobales/Login';

function App() {
  const [isInvestigacionesSidebarOpen, setInvestigacionesSidebarOpen] = useState(false);

  const toggleInvestigacionesSidebar = () => {
    setInvestigacionesSidebarOpen(!isInvestigacionesSidebarOpen);
  };

  return (
    <BrowserRouter>

      <AdministradorSidebar toggleSidebar={toggleInvestigacionesSidebar}>
        {isInvestigacionesSidebarOpen && <SideBarInvestigaciones onClose={toggleInvestigacionesSidebar} />}
        <Routes>
          <Route path="/administrador/cuenta" element={<AdministadorCuenta />} />
          <Route path="/administrador/tablero" element={<AdministadorTablero />} />
          <Route path="/administrador/inventario" element={<AdministadorInventario />} />
          <Route path="/administrador/reservaHora" element={<AdministadorReservaHora />} />
          <Route path="/administrador/notificaciones" element={<AdministadorNotificaciones />} />
          <Route path="/administrador/investigaciones/personales" element={<InvestigacionesPersonales />} />
          <Route path="/administrador/investigaciones/terceros" element={<InvestigacionesTerceros />} />
          <Route path="/administrador/investigaciones/personales/investigacion" element={<Investigacion />} />
        </Routes>
      </AdministradorSidebar>
    </BrowserRouter>
  );
}

export default App;
