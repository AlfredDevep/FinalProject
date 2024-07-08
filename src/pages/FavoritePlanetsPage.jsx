import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarComponent } from '../components/NavbarComponent';
import Swal from 'sweetalert2';

const FavoritePlanetsPage = ({ favoritePlanets, setFavoritePlanets }) => {
    const navigate = useNavigate();

    const handleRemoveFavorite = (planet) => {
        const updatedFavorites = favoritePlanets.filter(fav => fav !== planet);
        setFavoritePlanets(updatedFavorites);
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            
            localStorage.setItem(`favoritePlanets_${currentUser.uid}`, JSON.stringify(updatedFavorites));
           
               
        }
        //console.log('Planeta removido de favoritos:', planet);
        Swal.fire({
                    
            icon: "error",
            title: "Se elimino correctamente de tus favoritos",
            showConfirmButton: false,
            timer: 1500
          });
    };

    const handleBackToPlanetas = () => {
        navigate('/planetas');
    };

    return (
        <div>
            <NavbarComponent />
            <div className="container mt-4">
                <h1>Planetas Favoritos</h1>
                <button className="btn btn-primary mb-4" onClick={handleBackToPlanetas}>Regresar a Planetas</button>
                <div className="row">
                    {favoritePlanets.map((planet, index) => (
                        <div className="col-md-4 mb-4" key={planet.name}>
                            <div className="card h-100">
                                <img
                                    src={`https://starwars-visualguide.com/assets/img/planets/${index + 2}.jpg`}
                                    className="card-img-top"
                                    alt={planet.name}
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"; }}
                                />
                                <div className="card-body">
                                    <button className="btn btn-danger mb-2" onClick={() => handleRemoveFavorite(planet)}>Eliminar de Favoritos</button>
                                    <p className="card-text">Name: {planet.name}</p>
                                    <p className="card-text">Climate: {planet.climate}</p>
                                    <p className="card-text">Gravity: {planet.gravity}</p>
                                    <p className="card-text">Orbital Period: {planet.orbital_period}</p>
                                    <p className="card-text">Rotation Period: {planet.rotation_period}</p>
                                    <p className="card-text">Surface Water: {planet.surface_water}</p>
                                    <p className="card-text">Terrain: {planet.terrain}</p>
                                    <p className="card-text">Diameter: {planet.diameter}</p>
                                    <p className="card-text">Population: {planet.population}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {favoritePlanets.length === 0 && (
                        <div className="col-12 mt-4">
                            <p>No hay planetas favoritos.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FavoritePlanetsPage;



