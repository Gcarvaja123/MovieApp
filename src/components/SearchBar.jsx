import React, { useEffect } from 'react'
import { GetMovies, SearchMovie } from '../services/ApiClient'
import { useQuery} from '@tanstack/react-query'
import { useRef, useState } from 'react'

import '../css/SearchBar.css'

const SearchBar = () => {
    const movieinput = useRef("")
    const resultContainerRef = useRef(null);
    const [query, setQuery] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    /*
    
    const {data, error, isLoading} = useQuery({
        queryKey : ['todos'],
        queryFn : GetMovies
    })
    if (isLoading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;*/

    
    
    const { data, error, isLoading } = useQuery({
        queryKey: ['search', query], // Incluir la búsqueda en la queryKey
        queryFn: () => SearchMovie(query), // Pasar la función de búsqueda
        enabled: !!query, // Ejecutar solo si hay un término de búsqueda
    });

    const Searching = () =>{
        setQuery(movieinput.current.value);
    }

    const handleClickOutside = (event) => {
        if (
            resultContainerRef.current &&
            !resultContainerRef.current.contains(event.target) &&
            movieinput.current &&
            !movieinput.current.contains(event.target) // Verifica si el clic no ocurrió en el input
        ) {
            setIsVisible(false); // Oculta los resultados
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    console.log(data)

    

  return (
    <div className='search-bar'>
        <input className="search-input" type='text' ref={movieinput} onChange={() => Searching()} onFocus={() => setIsVisible(true)}/>
        <div className='cards' ref={resultContainerRef} style={{display:"flex"}}>
        {isVisible && data ? (
                data.slice(0, 5).map(e => (
                    <div
                        key={e.id}
                        className='movie-card'
                        ref={resultContainerRef}
                        style={{ display: 'grid' }}
                    >
                        <div className='image-card'>
                            <img src={"https://image.tmdb.org/t/p/w500" + e.poster_path} alt={e.title} />
                        </div>
                        <div className='content-card'>
                            {e.title}
                        </div>
                    </div>
                ))
            ) : null}
        </div>
    </div>
  )
}

export default SearchBar
