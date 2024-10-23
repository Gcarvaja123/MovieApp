import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { GetPopularMovies } from '../services/ApiClient'
import { useNavigate } from 'react-router-dom'

import "../css/Popular.css"


const Popular = () => {

    const {data, error, isLoading} = useQuery({
        queryKey : ["Popular"],
        queryFn : GetPopularMovies
    })

    const navigate = useNavigate();
    const GotoMovie = (idmovie) =>{
        navigate(`/movies/${idmovie}`)
    }
    //console.log(data)

  return (
    <>

    <h1 className='popular-tittle'>Popular Movies</h1>
    {data ? (
        <div className='popular-container'>
            {data.slice(0,8).map( e => (
                <div className='popular-info' onClick={ () => GotoMovie(e.id)}>
                    <img src={"https://image.tmdb.org/t/p/w500"+e.poster_path} />
                    
                </div>
            ))}
        </div>

    ) : <></>} 
    
    </>
  )
}

export default Popular
