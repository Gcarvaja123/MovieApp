import React, { useState } from 'react'
import Header from '../components/Header'
import '../css/movies.css'
import Filter from '../components/Filter'
import { useFilter } from '../states/filterstate'
import { useQuery } from '@tanstack/react-query'
import { GetMovieGenres, GetMoviesByGenre, GetMoviesByFilters } from '../services/ApiClient'
import { useNavigate } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Movies = () => {
  const {addGenre, ispopular, istoprated, filters} = useFilter();
  

  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [previousData, setPreviousData] = useState(null);

  const {data, error, isLoading} = useQuery({
      queryKey : ['genres', filters, page],
      queryFn : () => GetMoviesByFilters(filters, page)
  })

  
  const handleChange = (event, value) => {
    setPage(value);
  };

  const moviedetails = (id) =>{
    navigate('/movies/'+id)
  }

  const displayedData = isLoading && previousData ? previousData : data;
  console.log(displayedData?.total_pages)
  

  

  return (
    <>
        <Header/>
        <div className='movies-content'>
            <Filter/>
            {data ? (
            <div className='movie-box'>
              <Stack spacing={2} className='pagination'>
                <Pagination count={displayedData?.total_pages} page={page} onChange={handleChange} sx={{
                  '& .MuiPaginationItem-root': {
                    color: 'white', 
                    '&.Mui-selected': {
                      backgroundColor: '#4e5150', 
                      color: 'white', 
                    },
                  },
                }}/>
              </Stack>
              <div className='movies-container' >
                    {data.results.map( e => (
                      <div key={e.id} className='movie-details' onClick={() => moviedetails(e.id)}>
                        <img src={"https://image.tmdb.org/t/p/w500"+e.poster_path}/>
                        <div className='rating-value-movie'>{parseFloat(e.vote_average).toFixed(e.vote_average % 1 === 0 ? 0 : 1)}</div>
                      </div>
                    ))}
              </div>
              <Stack spacing={2} className='pagination'>
                <Pagination count={data.total_pages} page={page} onChange={handleChange} sx={{
                  '& .MuiPaginationItem-root': {
                    color: 'white', 
                    '&.Mui-selected': {
                      backgroundColor: '#4e5150', 
                      color: 'white', 
                    },
                  },
                }}/>
              </Stack>
            </div>
            ) : <></>}
        </div>
    
    
    </>
  )
}

export default Movies
