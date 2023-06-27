import { Badge, Group, Image, Stack, Text, Title, Tooltip } from '@mantine/core'
import { IconStarFilled } from '@tabler/icons-react'
import { FC } from 'react'
import { getReleaseYear } from '../../utils/util'
import { useNavigate } from 'react-router-dom'

type Props = {
  movie: Movie,
  disableClick?: boolean
}

const MovieCard: FC<Props> = ({ movie, disableClick = false }) => {
  const navigate = useNavigate()
  const goToDetails = (movie: Movie) => {
    !disableClick && navigate(`/movie/${movie.id}`)
  }
  return (
    <Stack spacing="0" style={{ cursor: "pointer" }} onClick={() => goToDetails(movie)}>
      <Image 
        src={movie.poster_path} 
        width="100%"
        mih="10rem"
        radius="lg" 
        alt='image' 
        fit="cover"
        withPlaceholder 
      />
      <Stack w="100%" spacing="xs" px="xs">
        <Tooltip label={movie.title} color='purple.6' openDelay={500} closeDelay={200}>
          <Title lineClamp={1} order={4} mt="xs">{movie.title}</Title>
        </Tooltip>
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