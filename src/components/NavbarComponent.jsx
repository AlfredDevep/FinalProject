import React from 'react';
import { Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import StarOutline from '@mui/icons-material/StarOutline';
import '../styles/NavbarComponent.css';
import { useNavigate } from 'react-router';


export const NavbarComponent = ({ favorites }) => {

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home');
}

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid navbar-container">
     
          <button className='btn btn-primary' onClick={handleGoHome}>Go Home</button>
        
        <div className="navbar-section search-section">
          <SearchIcon />
          <input type="text" className="form-control search-input" placeholder="Search..." />
        </div>
        <div className="navbar-section icons-section">
          <AccountCircle />
          <StarOutline />
        </div>
      </div>
    </nav>
  );
};




