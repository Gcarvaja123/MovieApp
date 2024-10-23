import React, { useEffect } from 'react'
import { GetMovies, SearchMovie } from '../services/ApiClient'
import { useQuery} from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import '../css/SearchBar.css'

const SearchBar = () => {

    const movieinput = useRef("")
    const resultContainerRef = useRef(null);
    const [query, setQuery] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [typeselected, setTypeselected] = useState('Movie');

    const navigate = useNavigate()
    
    const { data, error, isLoading } = useQuery({
        queryKey: ['search', query, typeselected], 
        queryFn: () => SearchMovie(query, typeselected  ), 
        enabled: !!query, 
    });

    const Searching = () =>{
        setQuery(movieinput.current.value);
    }

    const handleClickOutside = (event) => {
        if (
            resultContainerRef.current &&
            !resultContainerRef.current.contains(event.target) &&
            movieinput.current &&
            !movieinput.current.contains(event.target) 
        ) {
            setIsVisible(false); 
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleTypeChange = (e) => {
        setTypeselected(e.target.value)
    } 

    const GotoMovie = (idmovie) =>{
        navigate(`/movies/${idmovie}`)
    }


  return (
    <div className='search-bar'>
        <div className='search-type'>
            <select className='select-type' value={typeselected}  onChange={handleTypeChange}>
                <option value="Movie">Movie</option>
                <option value="Serie">Serie</option>
            </select>
            <input className="search-input" type='text' ref={movieinput} onChange={() => Searching()} onFocus={() => setIsVisible(true)}/>
        </div>
        
        <div className='cards' ref={resultContainerRef} >
            {isVisible && data ? (
                    data.slice(0, 5).map(e => (
                        <div key={e.id} className='movie-card' ref={resultContainerRef} onClick={() => GotoMovie( e.id)}>
                            <div className='image-card' >
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
