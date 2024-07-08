

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { NavbarComponent } from './NavbarComponent';
import Swal from 'sweetalert2';


const Home = () => {
  const navigate = useNavigate();
  
  const confirmacion = (handleLogout) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          
        });
        
      }
    });
  }
  
  const handleLogout = async () => {  

    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div style={{ backgroundImage: 'url(https://m.media-amazon.com/images/I/A11fIxcmFtL._AC_UF894,1000_QL80_.jpg)', backgroundSize: 'cover' }}>
      <NavbarComponent />
      <div className="d-flex flex-column align-items-center vh-100 justify-content-center text-center">
      <button onClick={handleLogout} className="btn btn-danger mt-4">Cerrar sesión</button>
        <h1 className='text-warning mb-4'>Welcome to Star Wars</h1>
        <div className='row justify-content-center'>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <img src='https://img.freepik.com/fotos-premium/fondo-pantalla-planeta-estrellas-nubes-llamado-star-wars_910135-9709.jpg' className="card-img-top" alt="Planetas" />
              <div className="card-body">
                <Link to="/planetas" className="btn btn-primary w-100">Planetas</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <img src='https://helios-i.mashable.com/imagery/articles/02L3cw891csfQCB2r6fqMUk/hero-image.fill.size_1248x702.v1628645714.jpg' className="card-img-top" alt="Peliculas" />
              <div className="card-body">
                <Link to="/peliculas" className="btn btn-primary w-100">Peliculas</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <img src='https://lacuevadelguampa.com/cdn/shop/articles/star_wars_personajes.jpg?v=1616087475&width=2000' className="card-img-top" alt="Personajes" />
              <div className="card-body">
                <Link to="/personajes" className="btn btn-primary w-100">Personajes</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


