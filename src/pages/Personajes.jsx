import React, { useState, useEffect } from 'react';

export const Personajes = () => {
    const [personajes, setPersonajes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);

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

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <h1>Personajes</h1>
                    
                    
                    {personajes.map((personaje, key) => (
                        <div className='card' style={{width:'18rem', height:'20rem'}}>
                        <div className='card-body'>
                        <div className='col-md-6 col-sm-12 col-lg-4 g-2' >
                                <img src={"https://starwars-visualguide.com/assets/img/characters/" + (key + 1) + ".jpg"} width={'100%'} />
                                <div>
                                <h5 className='card-title'>{personaje.name}</h5>       
                                </div>
                                <p className='card-text'>Name:{personaje.name}</p>
                            </div>
                        </div>
                        </div>
                ))}
                
                    
                    
                <div>
            <button onClick={handlePreviousPage} disabled={!previousPage}>Página anterior</button>
            <button onClick={handleNextPage} disabled={!nextPage}>Siguiente página</button>
            </div>
        </>
    );
};
