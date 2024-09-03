import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { GetPopularMovies } from '../services/ApiClient'

import "../css/Popular.css"


const Popular = () => {

    const {data, error, isLoading} = useQuery({
        queryKey : ["Popular"],
        queryFn : GetPopularMovies
    })

    //console.log(data)

  return (
    <>

    <h1 className='popular-tittle'>Popular Movies</h1>
    {data ? (
        <div className='popular-container'>
            {data.slice(0,12).map( e => (
                <div className='popular-info'>
                    <img src={"https://image.tmdb.org/t/p/w500"+e.poster_path} />
                    
                </div>
            ))}
        </div>

    ) : <></>} 
    
    </>
  )
}

export default Popular
