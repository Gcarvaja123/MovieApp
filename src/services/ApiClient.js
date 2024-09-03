const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTFlNjAzZjNhYTdmOGU0YzY0NTA4NjhiZDRhNTExYyIsIm5iZiI6MTcyNTAzMjUwNy44OTQ4OTcsInN1YiI6IjY2ZDE0YTBjMDkwOTY5OTQ2MWI1ZWNhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lyhv1Xs0hOFhlUdmXcOYt_sJX2FzN57GX3IO5YkiiYM'
    }
};



export const GetMovies = async () =>{
    const rest = fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
        .then(response => response.json())
    return rest
}

export const SearchMovie = async(name) =>{
    const rest = await fetch(`https://api.themoviedb.org/3/search/movie?query=${name}&language=en-US&page=1`, options)
                .then(response => response.json())
                .then(response => response.results)
    return rest
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