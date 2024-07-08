import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarComponent } from '../components/NavbarComponent';
import Swal from 'sweetalert2';
Swal
const Favorites = ({ favorites, setFavorites }) => {
    const navigate = useNavigate();

    const handleRemoveFavorite = (personaje) => {
        setFavorites(favorites.filter(fav => fav.name !== personaje.name));
        //console.log('Personaje removido de favoritos:', personaje);
        Swal.fire({
                    
            icon: "error",
            title: "Se elimino correctamente de tus favoritos",
            showConfirmButton: false,
            timer: 1500
          });
    };

    const handleBackToPersonajes = () => {
        navigate('/personajes');
    };

    return (
        <div>
            <NavbarComponent />
            <div className="container mt-4">
                <h1>Favoritos</h1>
                <button className="btn btn-primary mb-4" onClick={handleBackToPersonajes}>Regresar a Personajes</button>
                <div className="row">
                    {favorites.map((personaje) => (
                        <div className="col-md-4 mb-4" key={personaje.name}>
                            <div className="card h-100">
                                <img
                                    src={`https://starwars-visualguide.com/assets/img/characters/${personaje.url.split('/').slice(-2, -1)}.jpg`}
                                    className="card-img-top"
                                    alt={personaje.name}
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"; }}
                                />
                                <div className="card-body">
                                    <button className="btn btn-danger mb-2" onClick={() => handleRemoveFavorite(personaje)}>Eliminar de Favoritos</button>
                                    <p className="card-text">Name: {personaje.name}</p>
                                    <p className="card-text">Height: {personaje.height}</p>
                                    <p className="card-text">Mass: {personaje.mass}</p>
                                    <p className="card-text">Hair color: {personaje.hair_color}</p>
                                    <p className="card-text">Eye color: {personaje.eye_color}</p>
                                    <p className="card-text">Skin color: {personaje.skin_color}</p>
                                    <p className="card-text">Birth year: {personaje.birth_year}</p>
                                    <p className="card-text text-muted">Created: {personaje.created}</p>
                                    <p className="card-text text-muted">Edited: {personaje.edited}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {favorites.length === 0 && (
                        <div className="col-12 mt-4">
                            <p>No hay personajes favoritos.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Favorites;





