import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className='contenedor'style={{backgroundImage:'url(https://i.pinimg.com/originals/bc/8e/da/bc8eda437408f5fe7543665843e8b218.jpg)', backgroundRepeat:'no-repeat', backgroundSize:'', width:'auto', height:'auto'}}>
    
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-warning ">
      
      <div className="mb-3 p-4 border rounded bg-light">
      <h1>Bienvenido</h1>
        <button onClick={() => navigate('/login')} className="btn btn-outline-primary mr-2">Iniciar Sesión</button>
        <button onClick={() => navigate('/register')} className="btn btn-outline-secondary">Registrarse</button>
      </div>
    </div>
    </div>
  );
};

export default HomePage;

