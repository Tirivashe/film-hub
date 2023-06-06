import React from 'react'
import { useFetchMoviesByGenres } from '../../hooks/fetchMovies'
import { useStore } from '../../store'
import { Loader, Stack, Title } from '@mantine/core'

const MoviesByGenre = () => {
  const genreId = useStore(state => state.genreId)
  const genre = useStore(state => state.genre)
  const { isLoading, isFetching, isError, data } = useFetchMoviesByGenres(genreId)

  if(isLoading || isFetching) {
    return (
    <Stack justify='center' align='center' w="100%" h="100vh">
      <Loader />
    </Stack>
    )
  }
  if(isError) {
    return (
      <Title>Oops, there has been an error</Title>
    )
  }

  return (
    <Stack>
      <Title>All {genre} Movies</Title>
      {data?.map(movie => (
        <p>{movie.title}</p>
      )) }
    </Stack>
  )
}

export default MoviesByGenre