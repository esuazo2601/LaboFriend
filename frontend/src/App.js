import { BrowserRouter as Router } from "react-router-dom";
import { HomeProvider } from "./ComponentesGlobales/Contextos/HomeContext";

import AppRoutes from "./Rutas/AppRoutes";

function App() {
  return (
    <div className="App">
      {/* <HomeProvider> */}
        <Router>
          <AppRoutes />
        </Router>
      {/* </HomeProvider> */}
    </div>
  );
}

export default App;