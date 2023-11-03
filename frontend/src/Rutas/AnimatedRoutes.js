import Home from "../ComponentesGlobales/Home";
import AdministradorInventario from "../Usuarios/Administrador/Inventario/AdministradorInventario";

import { useRoutes, Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";


function AnimatedRoutes() {  
    const routing = useRoutes([
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/administrador/inventario",
        element: <AdministradorInventario />,
      },
    ]);
  
    return (
      <AnimatePresence>
        <Outlet />
        {routing}
      </AnimatePresence>
    );
  }

export default AnimatedRoutes;
