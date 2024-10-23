import React, { useEffect, useState } from 'react'
import { Carousel } from 'primereact/carousel';

import { useQuery } from '@tanstack/react-query';
import { GetTrendingMovies } from '../services/ApiClient';
import Rating from '@mui/material/Rating';

import "../css/Carousel.css"


const carouselTemplate = (items) => {
    console.log(items)
    return (
        <div >
            <div className='info-container'>
                <div className='image-container'>
                    <img src={"https://image.tmdb.org/t/p/original"+items.backdrop_path} alt={items.title} className="product-image" />
                    <div className='text-container'>
                        <div>
                            {items.title}
                        </div>
                        <div>
                            <Rating name="read-only" value={items.vote_average} precision={0.1} max={10} readOnly />
                            <p>Rating : {items.vote_average} from {items.vote_count} users</p>
                            <p>{items.overview}</p>
                        </div>
                    </div>
                                  
                </div>
                
            </div>
        </div>
    );
};


const Carousela = () => {

    

    const { data, error, isLoading } = useQuery({
        queryKey: ['search'], // Incluir la búsqueda en la queryKey
        queryFn: GetTrendingMovies, // Pasar la función de búsqueda
        
    });

  return (
    <>
        {data ?  (<div >
            <Carousel className="carousel"  value={data.slice(0,5)} itemTemplate={carouselTemplate} numVisible={1} numScroll={1}  circular/>
        </div>) : <p> No data avaiable </p>}
        
    </>
  )

}
export default Carousela
