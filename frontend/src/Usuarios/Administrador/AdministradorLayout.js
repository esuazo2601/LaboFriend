import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdministradorSidebar from './AdministradorSideBar';
import SideBarInvestigaciones from '../Administrador/Investigaciones/SideBarInvestigaciones';

const AdministradorLayout = () => {
  const [isInvestigacionesSidebarOpen, setInvestigacionesSidebarOpen] = useState(false);

  const toggleInvestigacionesSidebar = () => {
    setInvestigacionesSidebarOpen(!isInvestigacionesSidebarOpen);
  };

  return (
    <div className="administrador-layout">
      <AdministradorSidebar toggleSidebar={toggleInvestigacionesSidebar} />
      {isInvestigacionesSidebarOpen && <SideBarInvestigaciones onClose={toggleInvestigacionesSidebar} />}
      <div className="content-area">
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdministradorLayout;
