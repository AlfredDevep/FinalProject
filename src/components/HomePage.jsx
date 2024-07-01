import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1>Bienvenido</h1>
      <div className="mb-3">
        <button onClick={() => navigate('/login')} className="btn btn-outline-primary mr-2">Iniciar Sesión</button>
        <button onClick={() => navigate('/register')} className="btn btn-outline-secondary">Registrarse</button>
      </div>
    </div>
  );
};

export default HomePage;

