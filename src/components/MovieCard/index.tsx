import { Badge, Group, Image, Stack, Text, Title } from '@mantine/core'
import { IconStarFilled } from '@tabler/icons-react'
import { FC } from 'react'
import { getReleaseYear } from '../../utils/util'
import { useNavigate } from 'react-router-dom'

type Props = {
  movie: Movie
}

const MovieCard: FC<Props> = ({ movie }) => {
  const navigate = useNavigate()
  const goToDetails = (movie: Movie) => {
    navigate(`/movie/${movie.id}`, { state: movie })
  }
  return (
    <Stack spacing="0" style={{ cursor: "pointer" }} onClick={() => goToDetails(movie)}>
      <Image 
        src={movie.poster_path} 
        width="100%"
        radius="lg" 
        alt='image' 
        fit="cover"
        onLoad={() =>console.log(`${movie.title} image loaded`)}
      />
      <Stack w="100%" spacing="xs" px="xs">
        <Title lineClamp={1} order={5} mt="xs">{movie.title}</Title>
        <Group position='apart'>
          <Group spacing={"xs"}>
            <IconStarFilled style={{ color: "gold" }} size="1rem"/>
            <Text size="sm">{movie.vote_average.toFixed(1)}</Text>
          </Group>
          <Badge size="lg" radius="sm" color='purple.1'>{getReleaseYear(movie)}</Badge>
        </Group>
      </Stack>
    </Stack>
  )
}

export default MovieCard