import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { GetTopRatedMovies } from '../services/ApiClient'
import "../css/Toprated.css"
import { useNavigate } from 'react-router-dom'


const Toprated = () => {

    const navigate = useNavigate()

    const {data, error, isLoading} = useQuery({
        queryKey : ["rated"],
        queryFn : GetTopRatedMovies
    })

    console.log("Data : ", data)
    const GotoMovie = (idmovie) =>{
        navigate(`/movies/${idmovie}`)
    }

  return (
    <>
    <h1 className='rated-title'>Top Rated Movies</h1>
    {data ? ( 
        <div className='rated-container'>
            {data.slice(0,8).map(e => (
                <div className='rated-info' onClick={() => GotoMovie(e.id)}>
                    <img src={"https://image.tmdb.org/t/p/w500"+e.poster_path}/>
                    <div className='rating-value'>{e.vote_average.toString().split('.')[0] + '.' + e.vote_average.toString().split('.')[1].substring(0, 2)}</div>    
                </div>

            ))}    
            
            
         </div>
        

    ): <></>}
    
    
    
    
    </>
  )
}

export default Toprated
