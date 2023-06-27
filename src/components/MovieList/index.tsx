import { Carousel } from '@mantine/carousel'
import { Stack, Title } from '@mantine/core'
import { FC } from 'react'
import MovieCard from '../MovieCard'
import { useNavigate } from 'react-router-dom'

type Props = {
  title: string,
  movies: Movie[] | undefined
}

const MovieList: FC<Props> = ({ title, movies }) => {
  const navigate = useNavigate()
  const goToDetails = (movie: Movie) => {
    navigate(`/movie/${movie.id}`, { state: movie })
  }
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
        breakpoints={[
          { maxWidth: 'lg', slideSize: '25%' },
          { maxWidth: 'md', slideSize: '33.33333333333%' },
          { maxWidth: '42rem', slideSize: '50%'},
          { maxWidth: '23rem', slideSize: '100%'},
        ]}
      >
        {movies?.map(movie => (
          <Carousel.Slide key={movie.id} onClick={() => goToDetails(movie)}>
            <MovieCard movie={movie} disableClick={true}/>
          </Carousel.Slide>
        ))}
    </Carousel>
    </Stack>
  )
}

export default MovieList