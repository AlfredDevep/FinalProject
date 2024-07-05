import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { NavbarComponent } from '../components/NavbarComponent';
import StarOutline from '@mui/icons-material/StarOutline';

export const Peliculas = () => {
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
                setNextPage(data.next); // Save the URL of the next page
                setPreviousPage(data.previous); // Save the URL of the previous page
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
                setNextPage(data.next); // Update the URL of the next page
                setPreviousPage(data.previous); // Update the URL of the previous page
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

    const handleGoHome = () => {
        navigate('/home');
    }

    if (loading) {
        return <div>Cargando...</div>;
    }

    const getImageUrl = (episode_id) => {
        // Genera la URL de la imagen basada en el ID del episodio
        return `https://starwars-visualguide.com/assets/img/films/${episode_id}.jpg`;
    };

    return (

        <div>
            <NavbarComponent />
            <div className="container">
                <button className="btn btn-primary my-3" onClick={handleGoHome}>Ir a la página de inicio</button>
                <h1>Películas de Star Wars</h1>
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
                                    <StarOutline />
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

