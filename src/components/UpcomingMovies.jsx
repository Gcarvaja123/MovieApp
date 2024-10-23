import React from 'react'
import { useQuery } from '@tanstack/react-query'
import "../css/UpcomingMovies.css"
import { GetUpcomingMovies } from '../services/ApiClient'
import { useNavigate } from 'react-router-dom'

const UpcomingMovies = () => {


    const navigate = useNavigate()

    const {data, error, isLoading} = useQuery({
        queryKey : ["upcoming"],
        queryFn : GetUpcomingMovies
    })

    const GotoMovie = (idmovie) =>{
        navigate(`/movies/${idmovie}`)
    }

  return (
    <>
    <h1 className='upcoming-tittle'>Upcoming Movies</h1>
    {data ? (
        <div className='upcoming-container'>
            {data.slice(0,8).map( e => (
                <div className='upcoming-info' onClick={() => GotoMovie(e.id)}>
                    <img src={"https://image.tmdb.org/t/p/w500"+e.poster_path} />
                    
                </div>
            ))}
        </div>

    ) : <></>} 
    
    </>
  )
}

export default UpcomingMovies
