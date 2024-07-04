

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { NavbarComponent } from './NavbarComponent';
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
    <div  style={{backgroundImage: 'url(https://m.media-amazon.com/images/I/A11fIxcmFtL._AC_UF894,1000_QL80_.jpg)', backgroundSize:'cover'}}>
      <NavbarComponent />
      <div className="d-flex flex-column align-items-center vh-100">
        
        <h1 className='text-warning'>Bienvenido a la página de inicio </h1>
        
        
          <div className='row'>
            <div style={{width:'18rem', height:'20rem'}}>
            <div className="card">
            <img src='https://img.freepik.com/fotos-premium/fondo-pantalla-planeta-estrellas-nubes-llamado-star-wars_910135-9709.jpg'></img>
            <Link to="/planetas">Planetas</Link>
            </div>
            </div>
            <div style={{width:'18rem', height:'20rem'}}>
            <div className="card">
            <img src='https://helios-i.mashable.com/imagery/articles/02L3cw891csfQCB2r6fqMUk/hero-image.fill.size_1248x702.v1628645714.jpg' />
            <Link to="/peliculas">Peliculas</Link>
            </div>
            </div>
            <div style={{width:'18rem', height:'20rem'}}>
            <div className="card">
            <img src='https://lacuevadelguampa.com/cdn/shop/articles/star_wars_personajes.jpg?v=1616087475&width=2000' />
            <Link to="/personajes">Personajes</Link>
            </div>
            </div>
            
            </div>
        
        <button onClick={handleLogout} className="btn btn-danger">Cerrar sesión</button>
      </div>
    </div>
  );
};

export default Home;


