// components/Planeta.jsx
import React from 'react';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';

const Planeta = ({ planeta, isFavorite, handleAddFavorite, handleRemoveFavorite }) => {
    const getPlanetId = (url) => {
        const match = url.match(/\/(\d+)\/$/);
        return match ? match[1] : null;
    };

    const planetId = getPlanetId(planeta.url);
    const planetName = getPlanetId(planeta.name);

    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100">
                <img
                    src={`https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg`}
                    className="card-img-top"
                    alt={planeta.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"; }}
                />
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        {isFavorite ? (
                            <StarIcon onClick={() => handleRemoveFavorite(planeta)} style={{ cursor: 'pointer' }} />
                        ) : (
                            <StarOutlineIcon onClick={() => handleAddFavorite(planeta)} style={{ cursor: 'pointer' }} />
                        )}
                        {isFavorite ? (
                            <button className="btn btn-danger" onClick={() => handleRemoveFavorite(planeta)}>Remover de Favoritos</button>
                        ) : (
                            <button className="btn btn-primary" onClick={() => handleAddFavorite(planeta)}>Agregar a Favoritos</button>
                        )}
                    </div>
                    <p><strong>Name:</strong> {planeta.name}</p>
                    <p><strong>Climate:</strong> {planeta.climate}</p>
                    <p><strong>Gravity:</strong> {planeta.gravity}</p>
                    <p><strong>Orbital Period:</strong> {planeta.orbital_period}</p>
                    <p><strong>Rotation Period:</strong> {planeta.rotation_period}</p>
                    <p><strong>Surface Water:</strong> {planeta.surface_water}</p>
                    <p><strong>Terrain:</strong> {planeta.terrain}</p>
                    <p><strong>Diameter:</strong> {planeta.diameter}</p>
                    <p><strong>Population:</strong> {planeta.population}</p>
                </div>
            </div>
        </div>
    );
};

export default Planeta;





