import { FC, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useFetchMovieById, useFetchMoviesByGenres } from '../../hooks/fetchMovies';
import { Avatar, BackgroundImage, Badge, Box, Breadcrumbs, Button, Grid, Group, Image, Loader, Skeleton, Space, Stack, Text, Title, Tooltip } from '@mantine/core';
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
  const similarGenreMovies = data ? addMovieImage(data.pages.map(group=> group.results)[0].filter(movie => movie.id.toString() !== id)) : []
  const { classes } = useStyles()

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

  useEffect(() => {
    window.scrollTo(0,0)
  })

  if(isLoading || isFetching) {
    return (
    <Stack justify='center' align='center' w="100%" h="100vh">
      <LoadingSkeleton />
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
            <Stack spacing="xl">
              <Group align='center'>
                <Title>{movie?.title}</Title>
                <Badge radius="md" color="primary">{movie?.status}</Badge>
                { movie && movie.adult && <Badge radius="md" size='lg' color="red.2">R</Badge>}
              </Group>
              <Breadcrumbs separator="•">
                {movieSubInfo.map((item, idx) => (
                  <Text key={idx}>{item.title}</Text>
                ))}
              </Breadcrumbs>
              <Text>
                {movie?.genres.map(genre => genre.name).join(", ")}
              </Text>
              <Text w="70%">{movie?.overview}</Text>
              { movie && !!movie.budget && !!movie.revenue && (
                <Group>
                  <Title order={4}>Budget / Revenue</Title>
                  <Badge radius="md" color="gray.3">${movie.budget.toLocaleString()}</Badge>
                  <Badge radius="md" color={ movie.budget > movie.revenue ? "red.7" : "green.4" }>${movie.revenue.toLocaleString()}</Badge>
                </Group>
              ) }
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
      { similarGenreMovies.length > 0 ? 
        <MovieList title='You May Also Like' movies={similarGenreMovies}/> 
        :
        <Group position='center'>
          <Loader variant='dots' />
        </Group> 
      }
      <Group align='center' position='center'>
        <Button component={Link} to="/" mt="xl" color="primary">Back Home</Button>
      </Group>
    </Stack>
  )
}

const LoadingSkeleton = () => {
  const { classes } = useStyles()
  return (
    <Stack m="lg" className={classes.root} w="100%" h="100vh" pos="relative" p="sm">
      <Box className={classes.bgImg}>
        <Grid gutter="sm" p="lg" w="100%" h="auto" className={classes.grid}>
          <Grid.Col lg={4} md={12}>
            <Skeleton height={400} width={300} radius="lg" />
          </Grid.Col>
          <Grid.Col lg={8} md={12}>
            <Stack spacing="2rem">
              <Group align='center'>
                <Skeleton height={20} radius="xl" />
                <Skeleton height={8} radius="xl" />
              </Group>
              <Skeleton height={8} radius="xl" />
              <Skeleton height={8} radius="xl" />
              <Stack>
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} radius="xl" />
              </Stack>
              <Group>
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} radius="xl" />
              </Group>
              <Stack>
                <Skeleton height={15} radius="xl" />
                <Group spacing="xs">
                  <Skeleton height={30} circle radius="xl" />
                  <Skeleton height={30} circle radius="xl" />
                  <Skeleton height={30} circle radius="xl" />
                  <Skeleton height={30} circle radius="xl" />
                  <Skeleton height={30} circle radius="xl" />
                  <Skeleton height={30} circle radius="xl" />
                  <Skeleton height={30} circle radius="xl" />
                  <Skeleton height={30} circle radius="xl" />
                  <Skeleton height={30} circle radius="xl" />
                  <Skeleton height={30} circle radius="xl" />
                </Group>
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>
      </Box>
    </Stack>
  );
}

export default MovieDetailsPage