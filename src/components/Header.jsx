import React from 'react'

import '../css/Header.css'
import SearchBar from './SearchBar'
import {NavLink} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'



const Header = () => {

  const navigate = useNavigate()

  return (
    <>
        <div className='Header-Bar'>
            <div className='Title' onClick={() => navigate('/')}>
                <p> Movie App </p>
            </div>
            <nav className='navigation-bar'>
              <NavLink className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')} to="/movies">Movies</NavLink>
              <NavLink className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')} to="/series">Series</NavLink>
            </nav>
            <div className='search-container'>
              <SearchBar/>
            </div>
        </div>
    </>
  )
}

export default Header
