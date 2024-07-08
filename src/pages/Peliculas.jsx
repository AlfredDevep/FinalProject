import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarComponent } from '../components/NavbarComponent';
import StarOutline from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

export const Peliculas = ({ user, favoriteMovies, setFavoriteMovies }) => {
    const [peliculas, setPeliculas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        fetch('https://swapi.dev/api/films/')
            .then(response => response.json())
            .then(data => {
                setPeliculas(data.results);
                setNextPage(data.next);
                setPreviousPage(data.previous);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching films:', error);
                setLoading(false);
            });
    }, []);

    const fetchPage = (pageUrl) => {
        setLoading(true);

        fetch(pageUrl)
            .then(response => response.json())
            .then(data => {
                setPeliculas(data.results);
                setNextPage(data.next);
                setPreviousPage(data.previous);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching films:', error);
                setLoading(false);
            });
    };

    const handleNextPage = () => {
        if (nextPage) {
            fetchPage(nextPage);
        }
    };

    const handlePreviousPage = () => {
        if (previousPage) {
            fetchPage(previousPage);
        }
    };

    const getImageUrl = (episode_id) => {
        return `https://starwars-visualguide.com/assets/img/films/${episode_id}.jpg`;
    };

    const handleAddFavorite = (pelicula) => {
        if (!favoriteMovies.some(fav => fav.episode_id === pelicula.episode_id)) {
            const updatedFavorites = [...favoriteMovies, pelicula];
            setFavoriteMovies(updatedFavorites);
            
            // Guardar en localStorage
            if (user) {
                localStorage.setItem(`favoriteMovies_${user.uid}`, JSON.stringify(updatedFavorites));
                Swal.fire({
                    
                    icon: "success",
                    title: "Se a agregado correctamente a tus favoritos",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
    };

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

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <NavbarComponent />
            <div className="container">
                <h1>Películas de Star Wars</h1>
                <button className="btn btn-primary mb-4" onClick={() => navigate('/favorite-movie')}>Ver Películas Favoritas</button>
                <div className="row">
                    {peliculas.map(pelicula => (
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
                                        {favoriteMovies.some(fav => fav.episode_id === pelicula.episode_id) ? (
                                            <>
                                                <StarIcon onClick={() => handleRemoveFavorite(pelicula)} style={{ cursor: 'pointer' }} />
                                                <button onClick={() => handleRemoveFavorite(pelicula)} className="btn btn-danger btn-sm">
                                                    <DeleteIcon /> Eliminar
                                                </button>
                                            </>
                                        ) : (
                                            <button onClick={() => handleAddFavorite(pelicula)} className="btn btn-primary btn-sm">
                                                <StarOutline /> Agregar a Favoritos
                                            </button>
                                        )}
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
                <div className="d-flex justify-content-between my-3">
                    <button className="btn btn-secondary" onClick={handlePreviousPage} disabled={!previousPage}>Página anterior</button>
                    <button className="btn btn-secondary" onClick={handleNextPage} disabled={!nextPage}>Siguiente página</button>
                </div>
            </div>
        </div>
    );
};

export default Peliculas;





