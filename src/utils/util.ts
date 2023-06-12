
export const addMovieImage = <T extends Movie[] | Movie | MovieDetails | undefined>(movie: T): T => {
  if(Array.isArray(movie)) {

    const movies: Movie[] = movie.map(x => ({...x, 
      backdrop_path: `https://image.tmdb.org/t/p/w1280${x.backdrop_path}`,
      poster_path: `https://image.tmdb.org/t/p/w500${x.poster_path}`
    }))
    
    return movies as T
  } else if(typeof movie !== "undefined") {
    const modifiedMovie: Movie | MovieDetails = {
      ...movie, 
      backdrop_path: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
      poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    }

    return modifiedMovie as T
  }

  return undefined as T
  
}

export const getReleaseYear = (movie: Movie | MovieDetails | undefined) => {
  return movie && movie.release_date.split("-")[0]
}

export const getGenreNames = (allGenres: Genre[] | undefined, movieGenreIds: number[] | undefined) => {
  return allGenres && movieGenreIds && allGenres.filter(({id}) => movieGenreIds.includes(Number(id))).map(({name}) => name);
}