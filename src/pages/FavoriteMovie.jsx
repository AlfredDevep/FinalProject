import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarComponent } from '../components/NavbarComponent';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

const FavoriteMovie = ({ user, favoriteMovies, setFavoriteMovies }) => {
    const navigate = useNavigate();

    const handleRemoveFavorite = (pelicula) => {
        const updatedFavorites = favoriteMovies.filter(fav => fav.episode_id !== pelicula.episode_id);
        setFavoriteMovies(updatedFavorites);
        if (user) {
            localStorage.setItem(`favoriteMovies_${user.uid}`, JSON.stringify(updatedFavorites));
            Swal.fire({
                    
                icon: "error",
                title: "Se elimino correctamente de tus favoritos",
                showConfirmButton: false,
                timer: 1500
              });
        }
    };

    const getImageUrl = (episode_id) => {
        return `https://starwars-visualguide.com/assets/img/films/${episode_id}.jpg`;
    };

    return (
        <div>
            <NavbarComponent />
            <div className="container">
                <h1>Películas Favoritas</h1>
                <button className="btn btn-primary mb-4" onClick={() => navigate('/peliculas')}>Volver a Películas</button>
                <div className="row">
                    {favoriteMovies.map(pelicula => (
                        <div className="col-md-4 mb-4" key={pelicula.episode_id}>
                            <div className="card" style={{ height: '100%' }}>
                                <img
                                    src={getImageUrl(pelicula.episode_id)}
                                    alt={pelicula.title}
                                    className="card-img-top"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"; }}
                                />
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <StarIcon onClick={() => handleRemoveFavorite(pelicula)} style={{ cursor: 'pointer' }} />
                                        <button onClick={() => handleRemoveFavorite(pelicula)} className="btn btn-danger btn-sm">
                                            <DeleteIcon /> Eliminar
                                        </button>
                                    </div>
                                    <h5 className="card-title">{pelicula.title}</h5>
                                    <p className="card-text">Director: {pelicula.director}</p>
                                    <p className="card-text">Productor: {pelicula.producer}</p>
                                    <p className="card-text">Fecha de lanzamiento: {pelicula.release_date}</p>
                                    <p className="card-text">Episodio: {pelicula.episode_id}</p>
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



