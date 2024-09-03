import React from 'react'
import { useQuery } from '@tanstack/react-query'
import "../css/UpcomingMovies.css"
import { GetUpcomingMovies } from '../services/ApiClient'


const UpcomingMovies = () => {

    const {data, error, isLoading} = useQuery({
        queryKey : ["upcoming"],
        queryFn : GetUpcomingMovies
    })

  return (
    <>

    <h1 className='upcoming-tittle'>Upcoming Movies</h1>
    {data ? (
        <div className='upcoming-container'>
            {data.slice(0,12).map( e => (
                <div className='upcoming-info'>
                    <img src={"https://image.tmdb.org/t/p/w500"+e.poster_path} />
                    
                </div>
            ))}
        </div>

    ) : <></>} 
    
    </>
  )
}

export default UpcomingMovies
