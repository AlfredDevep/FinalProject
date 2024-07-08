import React from 'react'
import { NavbarComponent } from '../components/NavbarComponent'
import FavoritePlanetsPage from './FavoritePlanetsPage'
import FavoriteMovie from './FavoriteMovie'
import Favorites from './Favorites'

const Favoritos = () => {
  return (
    <>
    <NavbarComponent />

      <FavoritePlanetsPage />
      <br/>
      <FavoriteMovie />
      <br />
      <Favorites />
    </>
  )
}

export default Favoritos
