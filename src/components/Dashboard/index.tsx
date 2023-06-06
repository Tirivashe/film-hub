import { Loader, Stack, Title } from '@mantine/core'
import { useFetchMovies, useFetchTrendingMovies } from '../../hooks/fetchMovies'
import Hero from '../Hero'
import MovieList from '../MovieList'
import { useStyles } from './styles'


const Dashboard = () => {
  const { classes } = useStyles()
  const { isLoading: isUpcomingLoading, isFetching: isUpcomingFetching, data: upcomingMovies, isError: isUpcomingError } = useFetchMovies("upcoming")
  const { isLoading: isPopularLoading, isFetching: isPopularFetching, data: popularMovies, isError: isPopularError } = useFetchMovies("popular")
  const { isLoading: isTopRatedLoading, isFetching: isTopRatedFetching, data: topRatedMovies, isError: isTopRatedError } = useFetchMovies("top_rated")
  const { isLoading: isTrendingLoading, isFetching: isTrendingFetching, data: trendingMovies, isError: isTrendingError } = useFetchTrendingMovies()

  const loading = 
    isUpcomingLoading ||
    isUpcomingFetching ||
    isPopularLoading ||
    isPopularFetching ||
    isTopRatedLoading ||
    isTopRatedFetching ||
    isTrendingLoading ||
    isTrendingFetching

  const error =
    isUpcomingError ||
    isTopRatedError ||
    isPopularError ||
    isTrendingError


  if(loading) {
    return (
    <Stack justify='center' align='center' w="100%" h="100vh">
      <Loader />
    </Stack>
    )
  }
  if(error) {
    return (
      <Stack justify='center' align='center' w="100%" h="100vh">
        <Title>Oops, there has been an error</Title>
      </Stack>
    )
  }
  return (
    <Stack w="100%" spacing="xl" p="md" className={classes.root}>
      <Hero />
      <MovieList title="Weekly Trending Movies" movies={trendingMovies}/>
      <MovieList title="Popular Movies" movies={popularMovies}/>
      <MovieList title="Upcoming Movies" movies={upcomingMovies}/>
      <MovieList title="Top Rated Movies" movies={topRatedMovies}/>
    </Stack>
  )
}

export default Dashboard