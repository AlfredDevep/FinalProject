import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { NavbarComponent } from '../components/NavbarComponent';

export const Personajes = () => {
    const [personajes, setPersonajes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        fetch('https://swapi.dev/api/people/')
            .then(response => response.json())
            .then(data => {
                setPersonajes(data.results);
                setNextPage(data.next); // Save the URL of the next page
                setPreviousPage(data.previous); // Save the URL of the previous page
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching characters:', error);
                setLoading(false);
            });
    }, []);

    const fetchPage = (pageUrl) => {
        setLoading(true);

        fetch(pageUrl)
            .then(response => response.json())
            .then(data => {
                setPersonajes(data.results);
                setNextPage(data.next); // Update the URL of the next page
                setPreviousPage(data.previous); // Update the URL of the previous page
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching characters:', error);
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
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPersonajes = personajes.filter(personaje =>
        personaje.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="text-center mt-4">Cargando...</div>;
    }

    return (
        <div>
            <NavbarComponent />
            <div className="container mt-4">
                <h1>Personajes</h1>
                <button className="btn btn-primary mb-4" onClick={handleGoHome}>Ir a la página de inicio</button>
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por nombre..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="row">
                    {filteredPersonajes.map((personaje, key) => (
                        <div className="col-md-4 mb-4" key={personaje.name}>
                            <div className="card h-100">
                                <img src={`https://starwars-visualguide.com/assets/img/characters/${key + 1}.jpg`} className="card-img-top" alt={personaje.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{personaje.name}</h5>
                                    <p className="card-text">Name: {personaje.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredPersonajes.length === 0 && (
                        <div className="col-12 mt-4">
                            <p>No se encontraron personajes con ese nombre.</p>
                        </div>
                    )}
                </div>
                <div className="d-flex justify-content-between mt-4 mb-4">
                    <button onClick={handlePreviousPage} disabled={!previousPage} className="btn btn-secondary">
                        Página anterior
                    </button>
                    <button onClick={handleNextPage} disabled={!nextPage} className="btn btn-secondary">
                        Siguiente página
                    </button>
                </div>
            </div>
        </div>
    );
};