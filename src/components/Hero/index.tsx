import React, { useEffect } from 'react'
import { useFetchMovies } from '../../hooks/fetchMovies'
import { Box, Image, Loader, Stack, Title } from '@mantine/core'
import { useState } from 'react'
import { Carousel } from '@mantine/carousel';
import { addMovieImage } from '../../utils/util';
import MovieCard from '../MovieCard';
import { useStyles } from './styles';

const Hero = () => {
  const { isLoading, isFetching, data, isError, isSuccess } = useFetchMovies("now_playing")
  const movies = data ? addMovieImage(data) : []
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>()
  const { classes } = useStyles()

  useEffect(() => {
    if(isSuccess && movies?.length) {
      setSelectedMovie(movies[0])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const [fadeOut, setFadeOut] = useState(false);

  const handleImageClick = (movie: Movie) => {
    setFadeOut(true);
    setTimeout(() => {
      setSelectedMovie(movie);
      setFadeOut(false);
    }, 200);
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