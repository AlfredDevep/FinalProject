import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import Planetas from './pages/Planetas';
import { Peliculas } from './pages/Peliculas';
import Favorites from './pages/Favorites';
import Personajes from './pages/Personajes';
import FavoritePlanetsPage from './pages/FavoritePlanetsPage';
import  FavoriteMovie  from './pages/FavoriteMovie';


const App = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favoritePlanets, setFavoritePlanets] = useState([]);
  const [favoriteMovie, setFavoriteMovie] = useState([]);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/register" element={user ? <Navigate to="/home" /> : <RegisterForm />} />
        <Route path="/login" element={user ? <Navigate to="/home" /> : <LoginForm />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
        <Route path="/personajes" element={<Personajes favorites={favorites} setFavorites={setFavorites} />} />
        <Route path="/favorites" element={<Favorites favorites={favorites} setFavorites={setFavorites} />} />
        <Route path="/planetas" element={<Planetas favoritePlanets={favoritePlanets} setFavoritePlanets={setFavoritePlanets} />} />
        <Route path="/favorite-planets" element={<FavoritePlanetsPage favoritePlanets={favoritePlanets} setFavoritePlanets={setFavoritePlanets} />} />
        <Route path="/peliculas" element={<Peliculas favoriteMovie={favoriteMovie} setFavoriteMovie={setFavoriteMovie} />} />
        <Route path="/favorite-movie" element={<FavoriteMovie favoriteMovie={favoriteMovie} setFavoriteMovie={setFavoriteMovie} />} />
      </Routes>
    </Router>

  );
};

export default App;
