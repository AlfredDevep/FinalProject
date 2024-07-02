import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export const Planetas = () => {
    const [planetas, setPlanetas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);

    const navigate = useNavigate();

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

    const handleGoHome = () => {
        navigate('/home');
    }


    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <button onClick={handleGoHome}>Ir a la página de inicio</button>
            <h1>Planetas</h1>
            <ul>
                {planetas.map((planeta, key) => (
                    <li key={planeta.name}>
                        <img src={"https://starwars-visualguide.com/assets/img/planets/" + (key + 2) + ".jpg"} />
                        <p>{planeta.name}</p>

                    </li>
                ))}
            </ul>
            <button onClick={handlePreviousPage} disabled={!previousPage}>Página anterior</button>
            <button onClick={handleNextPage} disabled={!nextPage}>Siguiente página</button>
        </div>
    );
};
