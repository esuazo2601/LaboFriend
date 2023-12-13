import React from "react";
import { Button } from "react-bootstrap";

function AdministradorCuenta() {
  const handleCerrarSesion = () => {
    // Limpiar el localStorage al cerrar sesión
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.removeItem("scopes");

    // Redireccionar a la página de inicio de sesión
    window.location.href = "/"; // Cambia esto según la ruta de tu página de inicio de sesión
  };

  return (
    <div className="d-flex flex-column align-items-center  vh-100">
      <h1 className="mb-4">En construcción . . .</h1>
      <Button variant="primary" onClick={handleCerrarSesion}>
        Cerrar Sesión
      </Button>
    </div>
  );
}

export default AdministradorCuenta;
