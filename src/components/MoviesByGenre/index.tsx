import { useFetchMoviesByGenres } from '../../hooks/fetchMovies'
import { Button, Group, Loader, SimpleGrid, Stack, Title } from '@mantine/core'
import MovieCard from '../MovieCard'
import { addMovieImage } from '../../utils/util'
import { FC } from 'react'

type Props = {
  genreId: string | undefined,
  genre: string
}

const MoviesByGenre: FC<Props> = ({ genreId, genre }) => {
  const { isLoading, isError, isFetching, fetchNextPage, hasNextPage, data, isFetchingNextPage } = useFetchMoviesByGenres(genreId)
  
  if((isLoading || isFetching) && !isFetchingNextPage) {
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
      <SimpleGrid 
        cols={5} 
        spacing="md" 
        verticalSpacing="3rem"
        breakpoints={[
          { maxWidth: "lg", cols: 3 },
          { maxWidth: "md", cols: 2, verticalSpacing: "xl" },
          { maxWidth: "xs", cols: 1, verticalSpacing: "lg" },
        ]}
      >
        { data?.pages?.map(page => page.results.map(movie => (
          <MovieCard movie={addMovieImage(movie)}/>
        ))) }
      </SimpleGrid>
      <Group position='center'>
        <Button loading={isFetchingNextPage} mt="xl" onClick={() => fetchNextPage()} >{ hasNextPage ?  "Load More" : "Back To Top" }</Button>
      </Group>
    </Stack>
  )
}

export default MoviesByGenre