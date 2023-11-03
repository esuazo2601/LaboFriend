import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleInventoryClick = () => {
    navigate("/administrador/inventario");
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Button variant="primary" className="btn btn-primary btn-lg" onClick={handleInventoryClick}>
        Inventario
      </Button>
    </div>
  );
}

export default Home;
