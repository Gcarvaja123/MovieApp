const movie_api = process.env.REACT_APP_API_KEY
console.log("movie ap : " ,movie_api)
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${movie_api}`
    }
};





export const GetMovies = async () =>{
    const rest = fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
        .then(response => response.json())
    return rest
}

export const SearchMovie = async(name, type) =>{
    if (type =="Movie"){
        const rest = await fetch(`https://api.themoviedb.org/3/search/movie?query=${name}&language=en-US&page=1`, options)
                .then(response => response.json())
                .then(response => response.results)
        return rest
    }
    
}

export const GetTrendingMovies = async() => {
    const rest = fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
                .then(response => response.json())
                .then(response => response.results)
    return rest
}

export const GetPopularMovies = async() =>{
    const rest = fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
                .then(response => response.json())
                .then(response => response.results)
    return rest
}

export const GetTopRatedMovies = async() =>{
    const rest = fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
                .then(response => response.json())
                .then(response => response.results)
    return rest
}

export const GetUpcomingMovies = async() =>{
    const rest = fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1", options)
                .then(response => response.json())
                .then(response => response.results)
    return rest
}

export const GetMovieGenres = async() => {
    const rest = fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
                .then(response => response.json())
                .then(response => response.genres)
    return rest
}

export const GetMoviesByGenre = async(genres) =>{

    if (genres.length == 1){
        const rest = fetch(`https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genres[0]}`, options)
                .then(response => response.json())
                .then(response => response.results)
        return rest
    }
    else if (genres.length >1){
        const rest = fetch(`https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genres}`, options)
                .then(response => response.json())
                .then(response => response.results)
        return rest
    }
    else{
        const rest = fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
                    .then(response => response.json())
                    .then(response => response.results)
        return rest
    }
}

export const GetMovieDetail = async(movieid) => {
    /* const rest = fetch('https://api.themoviedb.org/3/movie/'+movieid+'?language=en-US', options)
                .then(response => response.json())

    
    return rest */

    const [detailsResponse, videosResponse, reviewsResponse] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${movieid}?language=en-US`, options),
        fetch(`https://api.themoviedb.org/3/movie/${movieid}/videos?language=en-US`, options),
        fetch(`https://api.themoviedb.org/3/movie/${movieid}/reviews`, options)
    ]);

    const details = await detailsResponse.json();
    const videos = await videosResponse.json();
    const reviews = await reviewsResponse.json();

    const trailer = videos.results.find(video => video.type === "Trailer");

    return {
        ...details,
        trailer,
        reviews
    };
}

export const GetMoviesByFilters = async(filters, npage) =>{

    const baseURL = 'https://api.themoviedb.org/3';
    const genresParam = filters.genres.length > 0 ? `&with_genres=${filters.genres.join(',')}` : '';
    const valorationParam = `&vote_average.gte=${filters.valoration[0]}&vote_average.lte=${filters.valoration[1]}`;
    const dates = filters.date1!== filters.date2 ? `&primary_release_date.gte=${filters.date1}&primary_release_date.lte=${filters.date2}`: ""
    const endpoint = filters.popularity == 'desc' ? 'discover/movie?language=en-US&sort_by=vote_average.desc&vote_count.gte=1000' : 'discover/movie?language=en-US&sort_by=vote_average.asc&vote_count.gte=1000';
    const page = `&page=${npage}`

    
    
    const url = `${baseURL}/${endpoint}?${genresParam}${valorationParam}${dates}${page}`;
    

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}