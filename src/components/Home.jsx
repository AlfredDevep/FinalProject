

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';


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
      <div className="d-flex flex-column align-items-center vh-100">
        <h1>Bienvenido a la página de inicio</h1>
        <button onClick={handleLogout} className="btn btn-danger">Cerrar sesión</button>
        <nav>
          <ul>
            <li><Link to="/planetas">Planetas</Link></li>
            <li><Link to="/peliculas">Peliculas</Link></li>
            <li><Link to="/personajes">Personajes</Link></li>
          </ul>
        </nav>

      </div>

  );
};

export default Home;


