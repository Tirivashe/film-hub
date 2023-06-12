import { useEffect } from 'react'
import { useFetchGenres, useFetchMovies } from '../../hooks/fetchMovies'
import { BackgroundImage, Badge, Button, Group, Image, Loader, Stack, Text, Title } from '@mantine/core'
import { useState } from 'react'
import { Carousel } from '@mantine/carousel';
import { getGenreNames, getReleaseYear } from '../../utils/util';
import { useStyles } from './styles';
import { IconInfoCircle } from '@tabler/icons-react';
import { Link } from "react-router-dom"

const Hero = () => {
  const { isLoading, isFetching, data: movies, isError, isSuccess } = useFetchMovies("now_playing")
  const { data: allGenres } = useFetchGenres()
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>()
  const { classes } = useStyles()
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if(isSuccess && movies?.length) {
      setSelectedMovie(movies[0])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const releaseYear = getReleaseYear(selectedMovie)
  const genres = getGenreNames(allGenres, selectedMovie?.genre_ids)

  const handleImageClick = (movie: Movie) => {
    setFadeOut(true);
    setTimeout(() => {
      setSelectedMovie(movie);
      setFadeOut(false);
    }, 150);
  };


  if(isLoading || isFetching) {
    return (
    <Stack justify='center' align='center' w="100%" h="100vh">
      <Loader />
    </Stack>
    )
  }
  if(isError) {
    return (
      <Stack justify='center' align='center' w="100%" h="100vh">
        <Title>Oops, there has been an error</Title>
      </Stack>
    )
  }

  return (
    <BackgroundImage src={`${selectedMovie ? selectedMovie?.backdrop_path : ""}`} className={`${classes.root} ${fadeOut ? classes.fadeOut : classes.fadeIn}`}>
      <Stack 
        spacing="lg" 
        pos="relative" 
        m="4rem"
        className={`${classes.titleContainer} ${fadeOut ? classes.fadeOut : classes.fadeIn}`}
        >
        <Title order={1}>{selectedMovie?.title}</Title>
        <Group spacing="sm">
          <Text>{releaseYear}</Text>
          <Badge size="lg" radius="sm" color='purple.1'>{selectedMovie?.vote_average}</Badge>
        </Group>
        <Group>
          { genres?.join(", ")}
        </Group>
        <Text lineClamp={2}>{selectedMovie?.overview}</Text>
        <Group align='center'>
          <Button 
            component={Link} 
            to={`/movie/${selectedMovie?.id}`} 
            state={selectedMovie} 
            radius="md" 
            leftIcon={<IconInfoCircle />} 
            color="primary"
            >
              More Info
          </Button>
        </Group>
      </Stack>
      <Carousel
        className={classes.carousel}
        draggable
        dragFree
        withControls={false}
        height={180}
        slideSize="33%"
        slideGap="sm"
        align="center"
        slidesToScroll={1}
      >
        {movies?.map(movie => (
          <Carousel.Slide key={movie.id} onClick={() => handleImageClick(movie)}>
            <Image 
              src={movie.poster_path} 
              className={ selectedMovie?.id === movie.id ? classes.imgSelected : classes.img} 
              height="150" 
              width="100%" 
              radius="lg" 
              alt='image' 
              fit="cover" 
              />
          </Carousel.Slide>
        ))}
      </Carousel>
    </BackgroundImage>
  )
}

export default Hero