import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios"
import { fetchMovies, fetchMovieGenres, fetchMoviesByGenre, fetchTrendingMovies } from "../api";

export function useFetchMovies(param: string) {
  const { isLoading, isFetching, data, isError, isSuccess } = useQuery<Movie[], AxiosError>({ 
    queryKey: ['movies', param], 
    queryFn: () => fetchMovies(param) 
  })

  return { isLoading, isError, isFetching, isSuccess, data }
}

export function useFetchTrendingMovies() {
  const { isLoading, isFetching, data, isError } = useQuery<Movie[], AxiosError>({ 
    queryKey: ['movies', 'trending'], 
    queryFn: () => fetchTrendingMovies() 
  })

  return { isLoading, isError, isFetching, data }
}

export function useFetchGenres() {
  const { isLoading, isFetching, data, isError } = useQuery<Genre[], AxiosError>({ 
    queryKey: ['genres'], 
    queryFn: () => fetchMovieGenres()
  })

  return { isLoading, isError, isFetching, data }
}


export function useFetchMoviesByGenres(genre: string, page = 1) {
  const { isLoading, isFetching, data, isError } = useQuery<Movie[], AxiosError>({ 
    queryKey: ['movies', genre], 
    queryFn: () => fetchMoviesByGenre(genre, page)
  })

  return { isLoading, isError, isFetching, data }
}