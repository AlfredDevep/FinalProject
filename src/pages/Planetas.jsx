import React, { useState, useEffect } from 'react';

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

    const getImageUrl = (name) => {
        // Genera la URL de la imagen basada en el nombre del planeta
        return `https://starwars-visualguide.com/assets/img/planets/${name.replace(/ /g, '-').toLowerCase()}.jpg`;
    };

    return (
        <div>
            <h1>Planetas</h1>
            <ul>
                {planetas.map(planeta => (
                    <li key={planeta.name}>
                        <img src={getImageUrl(planeta.name)} alt={planeta.name} width="100" onError={(e) => {e.target.onerror = null; e.target.src="https://starwars-visualguide.com/assets/img/placeholder.jpg";}} />
                        <p>{planeta.name}</p>
                    </li>
                ))}
            </ul>
            <button onClick={handlePreviousPage} disabled={!previousPage}>Página anterior</button>
            <button onClick={handleNextPage} disabled={!nextPage}>Siguiente página</button>
        </div>
    );
};
