import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { Planetas } from './pages/Planetas';
import { Personajes } from './pages/Personajes';
import { Peliculas } from './pages/Peliculas';



const App = () => {
  const [user, setUser] = useState(null);

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
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/planetas" element={<Planetas/>}/>
        <Route path="/peliculas" element={<Peliculas/>}/>
        <Route path="/personajes" element={<Personajes/>}/>
      </Routes>
    </Router>
  );
};

export default App;
