import React, { useEffect, useState } from 'react'
import { Carousel } from 'primereact/carousel';

import { useQuery } from '@tanstack/react-query';
import { GetTrendingMovies } from '../services/ApiClient';

import "../css/Carousel.css"


const carouselTemplate = (items) => {
    //console.log(items)
    return (
        <div >
            <div className='info-container'>
                <div className='image-container'>
                    <img src={"https://image.tmdb.org/t/p/original"+items.backdrop_path} alt={items.title} className="product-image" />
                    <div className='text-container'>{items.title}</div>              
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
        {data ?  (<div>
            <Carousel className="carousel" autoplayInterval={3000} value={data.slice(0,5)} itemTemplate={carouselTemplate} numVisible={1} numScroll={1}  />
        </div>) : <p> No data avaiable </p>}
        
    </>
  )

}
export default Carousela
