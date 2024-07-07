import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { NavbarComponent } from '../components/NavbarComponent';
import StarOutline from '@mui/icons-material/StarOutline';

const Personajes = ({ favorites, setFavorites }) => {
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
                setNextPage(data.next);
                setPreviousPage(data.previous);
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
                setNextPage(data.next);
                setPreviousPage(data.previous);
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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleAddFavorite = (personaje) => {
        if (favorites && !favorites.includes(personaje)) {
            setFavorites([...favorites, personaje]);
            console.log('Personaje agregado a favoritos:', personaje);
        }
    };

    const handleViewFavorites = () => {
        navigate('/favorites');
    };

    const handleBackToPersonajes = () => {
        navigate('/personajes');
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
                <button className="btn btn-primary mb-4" onClick={handleViewFavorites}>Ver Favoritos</button>
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
                    {filteredPersonajes.map((personaje, index) => (
                        <div className="col-md-4 mb-4" key={personaje.name}>
                            <div className="card h-100">
                                <img
                                    src={`https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`}
                                    className="card-img-top"
                                    alt={personaje.name}
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"; }}
                                />
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <StarOutline onClick={() => handleAddFavorite(personaje)} style={{ cursor: 'pointer' }} />
                                        <button className="btn btn-primary" onClick={() => handleAddFavorite(personaje)}>Agregar a Favoritos</button>
                                    </div>
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

export default Personajes;

