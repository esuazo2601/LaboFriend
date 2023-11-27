import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AyudanteSidebar from './AyudanteSideBar';
import SideBarInvestigaciones from '../Ayudante/Investigaciones/SideBarInvestigaciones';

const AyudanteLayout = () => {
  const [isInvestigacionesSidebarOpen, setInvestigacionesSidebarOpen] = useState(false);

  const toggleInvestigacionesSidebar = () => {
    setInvestigacionesSidebarOpen(!isInvestigacionesSidebarOpen);
  };

  return (
    <div className="administrador-layout">
      <AyudanteSidebar toggleSidebar={toggleInvestigacionesSidebar} />
      {isInvestigacionesSidebarOpen && <SideBarInvestigaciones onClose={toggleInvestigacionesSidebar} />}
      <div className="content-area">
        <Outlet />
      </div>
    </div>
  );
};

export default AyudanteLayout;
