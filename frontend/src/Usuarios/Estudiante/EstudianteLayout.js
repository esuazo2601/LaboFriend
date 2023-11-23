import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AyudanteSidebar from './EstudianteSideBar';

const EstudianteLayout = () => {
  const [isInvestigacionesSidebarOpen, setInvestigacionesSidebarOpen] = useState(false);

  const toggleInvestigacionesSidebar = () => {
    setInvestigacionesSidebarOpen(!isInvestigacionesSidebarOpen);
  };

  return (
    <div className="administrador-layout">
      <AyudanteSidebar toggleSidebar={toggleInvestigacionesSidebar} />
      <div className="content-area">
        <Outlet />
      </div>
    </div>
  );
};

export default EstudianteLayout;