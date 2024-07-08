import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarComponent } from '../components/NavbarComponent';
import Planeta from '../pages/Planeta';
import Swal from 'sweetalert2';

const Planetas = ({ favoritePlanets, setFavoritePlanets }) => {
    const [loading, setLoading] = useState(true);
    const [planetas, setPlanetas] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        fetch('https://swapi.dev/api/planets/')
            .then(response => response.json())
            .then(data => {
                setPlanetas(data.results);
                setNextPage(data.next);
                setPreviousPage(data.previous);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching planets:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        // Guardar planetas favoritos en el localStorage
        if (favoritePlanets.length > 0) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                localStorage.setItem(`favoritePlanets_${currentUser.uid}`, JSON.stringify(favoritePlanets));
            
            }
        }
    }, [favoritePlanets]);

    const fetchPage = (pageUrl) => {
        setLoading(true);

        fetch(pageUrl)
            .then(response => response.json())
            .then(data => {
                setPlanetas(data.results);
                setNextPage(data.next);
                setPreviousPage(data.previous);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching planets:', error);
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

    const handleAddFavorite = (planeta) => {
        if (!favoritePlanets.some(fav => fav.name === planeta.name)) {
            setFavoritePlanets([...favoritePlanets, planeta]);
            //console.log('Planeta agregado a favoritos:', planeta);
            Swal.fire({
                    
                icon: "success",
                title: "Se a agregado correctamente a tus favoritos",
                showConfirmButton: false,
                timer: 1500
              });
        }
    };

    const handleRemoveFavorite = (planeta) => {
        setFavoritePlanets(favoritePlanets.filter(fav => fav.name !== planeta.name));
        //console.log('Planeta removido de favoritos:', planeta);
        Swal.fire({
                    
            icon: "error",
            title: "Se a eliminado correctamente de tus favoritos",
            showConfirmButton: false,
            timer: 1500
          });
    };

    const isFavorite = (planeta) => {
        return favoritePlanets.some(fav => fav.name === planeta.name);
    };

    const handleViewFavorites = () => {
        navigate('/favorite-planets');
    };

    const filteredPlanetas = planetas.filter(planeta =>
        planeta.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="text-center mt-4">Cargando...</div>;
    }

    return (
        <div>
            <NavbarComponent />
            <div className="container mt-4">
                <h1>Planetas</h1>
                <button className="btn btn-primary mb-4" onClick={handleViewFavorites}>Ver Planetas Favoritos</button>
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
                    {filteredPlanetas.map(planeta => (
                        <Planeta
                            key={planeta.name}
                            planeta={planeta}
                            isFavorite={isFavorite(planeta)}
                            handleAddFavorite={handleAddFavorite}
                            handleRemoveFavorite={handleRemoveFavorite}
                        />
                    ))}
                    {filteredPlanetas.length === 0 && (
                        <div className="col-12 mt-4">
                            <p>No se encontraron planetas con ese nombre.</p>
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

export default Planetas;





