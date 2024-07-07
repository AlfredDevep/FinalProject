import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { NavbarComponent } from '../components/NavbarComponent';
import StarOutline from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';

export const Peliculas = ({ favoriteMovie, setFavoriteMovie }) => {
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
        if (!favoriteMovie.includes(pelicula)) {
            setFavoriteMovie([...favoriteMovie, pelicula]);
        }
    };

    const handleRemoveFavorite = (pelicula) => {
        setFavoriteMovie(favoriteMovie.filter(fav => fav.episode_id !== pelicula.episode_id));
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
                                        {favoriteMovie.includes(pelicula) ? (
                                            <StarIcon onClick={() => handleRemoveFavorite(pelicula)} style={{ cursor: 'pointer' }} />
                                        ) : (
                                            <StarOutline onClick={() => handleAddFavorite(pelicula)} style={{ cursor: 'pointer' }} />
                                        )}
                                        <button className="btn btn-primary" onClick={() => handleAddFavorite(pelicula)}>Agregar a Favoritos</button>
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
