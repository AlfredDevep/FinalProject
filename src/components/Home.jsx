

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
//import { LoginForm } from './LoginForm';


const Home = () => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='banner'>
      <div className="d-flex flex-column align-items-center vh-100" style={{ backgroundImage:"(https://img.freepik.com/foto-gratis/fondo-hiperespacial-3d-efecto-tunel-urdimbre_1048-12526.jpg)"}}>
        
        <h1 className='text-warning'>Bienvenido a la página de inicio</h1>
        <button onClick={handleLogout} className="btn btn-danger">Cerrar sesión</button>
        <nav>
          <ul>
            <li><Link to="/planetas">Planetas</Link></li>
            <li><Link to="/peliculas">Peliculas</Link></li>
            <li><Link to="/personajes">Personajes</Link></li>
            <li><Link to="../firebase/session">Datos</Link></li>
            </ul>
        </nav>

      </div>
    </div>
  );
};

export default Home;


