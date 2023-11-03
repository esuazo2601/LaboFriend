import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HomeProvider } from './ComponentesGlobales/Contextos/HomeContext';
import AnimatedRoutes from './Rutas/AnimatedRoutes';

function App() {
  return (
    //<HomeProvider>
      <Router>
        <AnimatedRoutes/>
      </Router>
    //</HomeProvider>
  );
}

export default App;
