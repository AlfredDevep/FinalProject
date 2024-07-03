import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { NavbarComponent } from '../components/NavbarComponent';

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
            <button onClick={handleGoHome}>Ir a la página de inicio</button>
            <h1>Películas de Star Wars</h1>
            <div className="row">
                {peliculas.map(pelicula => (
                    <div style={{width:'18rem', height:'20rem'}}>
                    <div className="card" key={pelicula.episode_id}>
                        <img src={getImageUrl(pelicula.episode_id)} alt={pelicula.title} width="50%"  onError={(e) => {e.target.onerror = null; e.target.src="https://starwars-visualguide.com/assets/img/placeholder.jpg";}} />
                        
                        <p>{pelicula.title}</p>
                        <p>Director: {pelicula.director}</p>
                        <p>Fecha de lanzamiento: {pelicula.release_date}</p>
                        
                    </div>
                    </div>
                ))}
            </div>
            <div className='Footer'>
            <button onClick={handlePreviousPage} disabled={!previousPage}>Página anterior</button>
            <button onClick={handleNextPage} disabled={!nextPage}>Siguiente página</button>
            </div>
        </div>
    );
};

