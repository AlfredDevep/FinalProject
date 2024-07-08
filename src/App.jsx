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
import FavoriteMovie from './pages/FavoriteMovie';

const App = () => {
  const [user, setUser] = useState(null);

  const [favorites, setFavorites] = useState([]);
  const [favoritePlanets, setFavoritePlanets] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Cargar películas favoritas desde el local storage al iniciar
        const storedFavoriteMovies = localStorage.getItem(`favoriteMovies_${currentUser.uid}`);
        if (storedFavoriteMovies) {
          setFavoriteMovies(JSON.parse(storedFavoriteMovies));
        }

        // Cargar planetas favoritos desde el local storage al iniciar
        const storedFavoritePlanets = localStorage.getItem(`favoritePlanets_${currentUser.uid}`);
        if (storedFavoritePlanets) {
          setFavoritePlanets(JSON.parse(storedFavoritePlanets));
        }
      } else {
        setFavoriteMovies([]);
        setFavoritePlanets([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Guardar películas favoritas en el local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`favoriteMovies_${user.uid}`, JSON.stringify(favoriteMovies));
    }
  }, [favoriteMovies, user]);

  // Guardar planetas favoritos en el local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`favoritePlanets_${user.uid}`, JSON.stringify(favoritePlanets));
    }
  }, [favoritePlanets, user]);

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
        <Route path="/peliculas" element={<Peliculas user={user} favoriteMovies={favoriteMovies} setFavoriteMovies={setFavoriteMovies} />} />
        <Route path="/favorite-movie" element={<FavoriteMovie user={user} favoriteMovies={favoriteMovies} setFavoriteMovies={setFavoriteMovies} />} />
      </Routes>
    </Router>

  );
};

export default App;

