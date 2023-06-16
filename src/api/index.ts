import { axiosInstance } from "../constants"
import { addMovieImage } from "../utils/util"

export const fetchMovies = async (param = "popular") => {
  return axiosInstance.get<ResultRootObject>(`/movie/${param}?language=en-US&page=1`)
  .then(res => addMovieImage(res.data.results))
}

export const fetchMovieGenres = async () => {
  return axiosInstance.get<GenreRootObject>("/genre/movie/list?language=en")
  .then(res => res.data.genres)
}

export const fetchMoviesByGenre = async (genre: string | undefined, page = 1) => {
  return axiosInstance.get<ResultRootObject>(`/discover/movie?language=en-US&page=${page}&with_genres=${genre}`)
  .then(res => res.data)
}

export const fetchTrendingMovies = async () => {
  return axiosInstance.get<ResultRootObject>('/trending/movie/week?language=en-US')
  .then(res => addMovieImage(res.data.results))
}

export const fetchMovieById = async (movieId: number) => {
  return axiosInstance.get<MovieDetails>(`/movie/${movieId}?append_to_response=credits%2Cvideos&language=en-US`)
  .then(res => addMovieImage(res.data))
}

export const fetchMoviesBySearch = async (query: string | undefined, page = 1, signal: AbortSignal | undefined) => {
  return axiosInstance.get<ResultRootObject>(`/search/movie?query=${query}&language=en-US&page=${page}`, {
    signal
  })
  .then(res => res.data)
}