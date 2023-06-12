import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios"
import { fetchMovies, fetchMovieGenres, fetchMoviesByGenre, fetchTrendingMovies, fetchMovieById } from "../api";

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


export function useFetchMoviesByGenres(genre: string | undefined) {
  const { isLoading, isFetching, data, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<ResultRootObject, AxiosError>({ 
    queryKey: ['movies', genre], 
    queryFn: ({ pageParam = 1 }) => fetchMoviesByGenre(genre, pageParam),
    getNextPageParam: (result) => result.page < result.total_pages ? result.page + 1 : undefined,
    keepPreviousData: true,
    enabled: !!genre
  })

  return { isLoading, isError, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage, data }
}

export function useFetchMovieById(movieId: number) {
  const { isLoading, isFetching, data, isError, isSuccess } = useQuery<MovieDetails, AxiosError>({ 
    queryKey: ['movie', movieId], 
    queryFn: () => fetchMovieById(movieId)
  })

  return { isLoading, isError, isFetching, data, isSuccess }
}