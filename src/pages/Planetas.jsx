import React, { useState, useEffect } from 'react';
import { NavbarComponent } from '../components/NavbarComponent';
import StarOutline from '@mui/icons-material/StarOutline';


export const Planetas = () => {
    const [planetas, setPlanetas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);

    useEffect(() => {
        setLoading(true);

        fetch('https://swapi.dev/api/planets/')
            .then(response => response.json())
            .then(data => {
                setPlanetas(data.results);
                setNextPage(data.next); // Save the URL of the next page
                setPreviousPage(data.previous); // Save the URL of the previous page
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching planets:', error);
                setLoading(false);
            });
    }, []);

    const fetchPage = (pageUrl) => {
        setLoading(true);

        fetch(pageUrl)
            .then(response => response.json())
            .then(data => {
                setPlanetas(data.results);
                setNextPage(data.next); // Update the URL of the next page
                setPreviousPage(data.previous); // Update the URL of the previous page
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


    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <NavbarComponent />
            <div className="container mt-4">
                <h1 >Planetas</h1>
                <div className="row">
                    {planetas.map((planeta, key) => (
                        <div className="col-md-4 mb-4" key={key}>
                            <div className="card h-100">
                                <img
                                    src={`https://starwars-visualguide.com/assets/img/planets/${key + 2}.jpg`}
                                    className="card-img-top"
                                    alt={planeta.name}
                                />
                                <div className="card-body">
                                    <StarOutline/>
                                    <p>Name : {planeta.name}</p>
                                    <p>Climate : {planeta.climate}</p>
                                    <p>Gravity : {planeta.gravity}</p>
                                    <p>Orbital Period : {planeta.orbital_period}</p>
                                    <p>Rotation Period : {planeta.rotation_period}</p>
                                    <p>Surface Water : {planeta.surface_water}</p>
                                    <p>Terrain : {planeta.terrain}</p>
                                    <p>Diameter : {planeta.diameter}</p>
                                    <p>Population : {planeta.population}</p>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-between m-7 ">
                    <button onClick={handlePreviousPage} disabled={!previousPage} className="btn btn-primary">
                        Página anterior
                    </button>
                    <button onClick={handleNextPage} disabled={!nextPage} className="btn btn-primary">
                        Siguiente página
                    </button>
                </div>
            </div>
        </div>
    );
};
