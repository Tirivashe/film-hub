import { Carousel } from '@mantine/carousel'
import { Stack, Title } from '@mantine/core'
import { FC } from 'react'
import MovieCard from '../MovieCard'

type Props = {
  title: string,
  movies: Movie[] | undefined
}

const MovieList: FC<Props> = ({ title, movies }) => {

  return (
    <Stack spacing="md" mt="sm">
      <Title order={2}>{title}</Title>
      <Carousel
        draggable
        dragFree
        height="100%"
        withControls={false}
        slideSize="20%"
        slideGap="md"
        containScroll='trimSnaps'
        slidesToScroll={1}
      >
        {movies?.map(movie => (
          <Carousel.Slide key={movie.id}>
            <MovieCard movie={movie}/>
          </Carousel.Slide>
        ))}
    </Carousel>
    </Stack>
  )
}

export default MovieList