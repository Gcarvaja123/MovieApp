import React, { useEffect } from 'react'
import { GetMovies, SearchMovie } from '../services/ApiClient'
import { useQuery} from '@tanstack/react-query'
import { useRef, useState } from 'react'
import Header from '../components/Header'
import Carousela from '../components/Carousela'
import Popular from '../components/Popular'
import Toprated from '../components/Toprated'
import UpcomingMovies from '../components/UpcomingMovies'

const Home = () => {
    

    

  return (
    <>
        <Header/>
        <Carousela/>
        <Popular/>
        <Toprated/>
        <UpcomingMovies/>
        
    </>
  )
}

export default Home
