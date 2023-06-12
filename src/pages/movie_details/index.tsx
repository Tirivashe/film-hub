import { FC } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useFetchMovieById, useFetchMoviesByGenres } from '../../hooks/fetchMovies';
import { Avatar, BackgroundImage, Badge, Breadcrumbs, Button, Grid, Group, Image, Loader, Space, Stack, Text, Title, Tooltip } from '@mantine/core';
import { useStyles } from './styles';
import { addMovieImage, getReleaseYear } from '../../utils/util';
import { IconStarFilled } from '@tabler/icons-react';
import { Carousel } from '@mantine/carousel';
import MovieList from '../../components/MovieList';
import ReactPlayer from "react-player/youtube"

const MovieDetailsPage: FC = () => {
  const { id } = useParams()
  const { isLoading, isFetching, isError, data: movie } = useFetchMovieById(Number(id))
  const randomGenre = movie ? Math.floor(Math.random() * movie.genres.length) : 0
  const { data } = useFetchMoviesByGenres(movie ? movie.genres[randomGenre].id : "80")
  const { classes } = useStyles()
  const similarGenreMovies = data ? addMovieImage(data.pages.map(group=> group.results)[0]) : []

  const movieSubInfo = [
    { title:
      <Group spacing="xs">
        <IconStarFilled style={{ color: "gold" }} size="1rem"/>
        <Text>{movie?.vote_average.toFixed(1)}</Text>
      </Group>
    },
    { title: `${movie?.runtime}m` },
    { title: getReleaseYear(movie) }
  ]

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
    <Stack m="lg" className={classes.root} pos="relative">
      <BackgroundImage src={movie ? movie?.backdrop_path : ""} className={classes.bgImg}>
        <Grid gutter="sm" p="lg" w="100%" className={classes.grid}>
          <Grid.Col lg={4} md={12}>
            <Image 
              src={movie?.poster_path}
              radius="lg" 
              alt="poster"
              height="400"
              width="300"
              pos="sticky"
              top={40}
              />
          </Grid.Col>
          <Grid.Col lg={8} md={12}>
            <Stack spacing="md">
              <Group align='center'>
                <Title>{movie?.title}</Title>
                <Badge radius="md" color="primary">{movie?.status}</Badge>
              </Group>
              <Breadcrumbs separator="•">
                {movieSubInfo.map(item => (
                  <Text>{item.title}</Text>
                ))}
              </Breadcrumbs>
              <Text>
                {movie?.genres.map(genre => genre.name).join(", ")}
              </Text>
              <Text w="70%">{movie?.overview}</Text>
              <Group>
                <Title order={4}>Available in:</Title>
                <Text>{movie?.spoken_languages.map(language => language.english_name).join(", ")}</Text>
              </Group>
              <Stack>
                <Title order={4}>Cast</Title>
                <Tooltip.Group>
                  <Avatar.Group spacing="sm" sx={{ flexWrap: "wrap", width: "80%" }}>
                    {movie?.credits?.cast.map(member =>(
                      <Tooltip key={member.id} label={member.name} color='purple.3'>
                        <Avatar src={`https://image.tmdb.org/t/p/w92${member.profile_path}`} radius="xl"/>
                      </Tooltip>
                    ))}
                  </Avatar.Group>
                </Tooltip.Group>
              </Stack>
              {movie?.videos && movie?.videos?.results.length > 0 && (
                <>
                  <Title mt={"lg"} order={3}>Trailers and Clips</Title>
                  <Carousel
                    height={250}
                    slideSize="50%"
                    slideGap="sm"
                    align="center"
                    containScroll='trimSnaps'
                    pos="relative"
                    breakpoints={[
                      { maxWidth: 'lg', slideSize: "33.3333333333%" },
                      { maxWidth: 'md', slideSize: "50%" },
                      { maxWidth: 'xs', slideSize: "100%" }
                    ]}
                  >
                    {movie?.videos?.results?.map(video => (
                      <Carousel.Slide key={video.id}>
                        <ReactPlayer 
                          width="100%" 
                          height="100%" 
                          url={`https://www.youtube.com/watch?v=${video.key}`} 
                          controls
                        />
                      </Carousel.Slide>
                    ))}
                  </Carousel>
                </>
              )}
            </Stack>
          </Grid.Col>
        </Grid>
      </BackgroundImage>
      <Space mt={"xl"}/>
      <MovieList title='You May Also Like' movies={similarGenreMovies}/>
      <Group align='center' position='center'>
        <Button component={Link} to="/" mt="xl" color="primary">Back Home</Button>
      </Group>
    </Stack>
  )
}

export default MovieDetailsPage