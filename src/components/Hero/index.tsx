import { useEffect } from 'react'
import { useFetchGenres, useFetchMovies } from '../../hooks/fetchMovies'
import { Badge, Box, Button, Group, Image, Loader, Stack, Text, Title } from '@mantine/core'
import { useState } from 'react'
import { Carousel } from '@mantine/carousel';
import { addMovieImage, getReleaseYear } from '../../utils/util';
import { useStyles } from './styles';
import { IconPlayerPlay } from '@tabler/icons-react';
import { Link } from "react-router-dom"

const Hero = () => {
  const { isLoading, isFetching, data, isError, isSuccess } = useFetchMovies("now_playing")
  const { data: allGenres } = useFetchGenres()
  const movies = data ? addMovieImage(data) : []
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

  const handleImageClick = (movie: Movie) => {
    setFadeOut(true);
    setTimeout(() => {
      setSelectedMovie(movie);
      setFadeOut(false);
    }, 150);
  };

  function getGenreNames(allGenres: Genre[] | undefined, movieGenreIds: number[] | undefined) {
    return allGenres && movieGenreIds && allGenres.filter(({id}) => movieGenreIds.includes(Number(id))).map(({name}) => name);
  }

  const genres = getGenreNames(allGenres, selectedMovie?.genre_ids)

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
    <Box className={classes.root}>
      <Image
        className={`${classes.heroImg} ${fadeOut ? classes.fadeOut : classes.fadeIn}`} 
        src={selectedMovie?.backdrop_path} 
        alt="image" 
        fit="cover" 
        withPlaceholder 
        height="500" 
        radius="lg"
      />
      <Stack 
        spacing="lg" 
        pos="absolute" 
        top="0" 
        left="50" 
        mt="4rem"
        w="40%"
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
        <Button 
          component={Link} 
          to={`/movie/${selectedMovie?.id}`} 
          state={selectedMovie} 
          radius="md" 
          w="50%" 
          leftIcon={<IconPlayerPlay />} 
          color="primary"
          >
            Watch Now
        </Button>
      </Stack>
      <Carousel
        className={classes.carousel}
        draggable
        dragFree
        withControls={false}
        height={150}
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
              height="120" 
              width="100%" 
              radius="lg" 
              alt='image' 
              fit="cover" 
              />
          </Carousel.Slide>
        ))}
    </Carousel>
    </Box>
  )
}

export default Hero