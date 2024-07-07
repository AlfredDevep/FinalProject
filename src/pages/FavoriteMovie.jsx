import React from 'react';
import { useNavigate } from 'react-router';
import { NavbarComponent } from '../components/NavbarComponent';
import StarIcon from '@mui/icons-material/Star';

const FavoriteMovie = ({ favoriteMovie, setFavoriteMovie }) => {
    const navigate = useNavigate();

    const handleRemoveFavorite = (movie) => {
        setFavoriteMovie(favoriteMovie.filter(fav => fav.episode_id !== movie.episode_id));
    };

    console.log("Favorite Movies:", favoriteMovie); // Imprimir los datos de favoriteMovie

    return (
        <div>
            <NavbarComponent />
            <div className="container">
                <h1>Películas Favoritas de Star Wars</h1>
                <button className="btn btn-secondary mb-4" onClick={() => navigate('/peliculas')}>Ver Todas las Películas</button>
                <div className="row">
                    {favoriteMovie.map(movie => (
                        <div className="col-md-4 mb-4" key={movie.episode_id}>
                            <div className="card" style={{ height: '100%' }}>
                                <img
                                    src={`https://starwars-visualguide.com/assets/img/films/${movie.episode_id}.jpg`}
                                    alt={movie.title}
                                    className="card-img-top"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"; }}
                                />
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <StarIcon onClick={() => handleRemoveFavorite(movie)} style={{ cursor: 'pointer' }} />
                                        <button className="btn btn-primary" onClick={() => handleRemoveFavorite(movie)}>Eliminar de Favoritos</button>
                                    </div>
                                    <h5 className="card-title">{movie.title}</h5>
                                    <p className="card-text">Director: {movie.director}</p>
                                    <p className="card-text">Productor: {movie.producer}</p>
                                    <p className="card-text">Fecha de lanzamiento: {movie.release_date}</p>
                                    <p className="card-text">Episodio: {movie.episode_id}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FavoriteMovie;

