import { Carousel } from '@mantine/carousel'
import { Badge, Group, Image, Stack, Text, Title } from '@mantine/core'
import { FC } from 'react'
import { getReleaseYear } from '../../utils/util'
import { IconStarFilled } from '@tabler/icons-react'
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
      >
        {movies?.map(movie => (
          <Carousel.Slide key={movie.id} style={{ cursor: "pointer" }} onClick={() => goToDetails(movie)}>
            <Image 
              src={movie.poster_path} 
              width="100%"
              radius="lg" 
              alt='image' 
              fit="cover" 
            />
            <Stack w="100%" spacing="xs">
              <Title lineClamp={1} order={5} mt="xs">{movie.title}</Title>
              <Group position='apart'>
                <Group spacing={"xs"}>
                  <IconStarFilled style={{ color: "gold" }} size="1rem"/>
                  <Text size="sm">{movie.vote_average.toFixed(1)}</Text>
                </Group>
                <Badge size="lg" radius="sm" color='purple.1'>{getReleaseYear(movie)}</Badge>
              </Group>
            </Stack>
          </Carousel.Slide>
        ))}
    </Carousel>
    </Stack>
  )
}

export default MovieList