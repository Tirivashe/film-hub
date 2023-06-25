import { BackgroundImage, Button, Group, Image, SimpleGrid, Stack, Text, Title } from "@mantine/core"
import { FC } from "react"
import { useStyles } from "./welcome.styles"
import { IconArrowRight } from "@tabler/icons-react"
import { useFetchMovies, useFetchTrendingMovies } from "../../hooks/fetchMovies"
import { Link } from "react-router-dom"


export const WelcomePage: FC = () => {
  const { classes } = useStyles()
  const { data: upcomingMovies, isError: isUpcomingError } = useFetchMovies("upcoming")
  const { data: popularMovies, isError: isPopularError } = useFetchMovies("popular")
  const { data: topRatedMovies, isError: isTopRatedError } = useFetchMovies("top_rated")
  const { data: trendingMovies, isError: isTrendingError } = useFetchTrendingMovies()

  const isError = isUpcomingError || isPopularError || isTopRatedError || isTrendingError
  const popularMovie = popularMovies?.[5]
  const topRatedMovie = topRatedMovies?.[2]
  const upcomingMovie = upcomingMovies?.[7]
  const trendingMovie = trendingMovies?.[4]

  return (
      <>
        <BackgroundImage src="/images/move_wallpaper.jpg" w="100%" h="100vh" className={classes.bgImg}>
          <Group pos="absolute" top={0} left={0} w="100%" p="lg" mt="sm" position="apart">
           {/* <Logo /> */}
           <Title
            order={2} 
            variant="gradient"
            gradient={{ from: 'purple.8', to: 'purple.4', deg: 55 }}
            >
            Film Hub
          </Title>
            <Group spacing="xl">
              <Button component={Link} to="/login" size="md" color="purple.2" variant="outline">Log In</Button>
              <Button component={Link} to="/signup" size="md">Sign Up</Button>
            </Group>
          </Group>
          <Stack pos="relative" align="center" justify="center" spacing="sm">
            <Title align="center" order={3} variant="gradient" gradient={{ from: "purple.1", to: "purple.8", deg: 65 }}>The Film Hub</Title>
            <Title align="center" order={1}>
              Discover, watch, and enjoy your favorite movies.
            </Title>
            <Title align="center" order={4}>Ready to watch? Discover your favorite movies and start browsing right now!</Title>
            <Button
              component={Link} 
              to="/login" 
              rightIcon={<IconArrowRight />} 
              color="purple.5" 
              mt="lg" 
              uppercase
              sx={theme => ({
                fontSize: theme.fontSizes.lg,
                width: "38%",
                height: "2.8rem",
              })}
            >
              Get Started
            </Button>
          </Stack>
        </BackgroundImage>
        <Stack py="6rem" justify="center" align="center" spacing="lg" sx={{ color: "white", borderBottom: "8px solid #232323" }}>
          <Title align="center" order={4} color="purple.5">All In One Spot</Title>
          <Title align="center" sx={{ fontSize: "3.5rem" }}>All The Movies You Love</Title>
          <Text size="lg" align="center">
            Discover most of your loved movies from all types of genres and dates. From kids, horror, 
            family movies and more
          </Text>
        </Stack>
        <SimpleGrid
          sx={{ color: "white", borderBottom: "8px solid #232323" }} 
          cols={2} 
          py="13rem" 
          px="lg" 
          breakpoints={[
            { maxWidth: "md", cols: 1 }
          ]}>
          <Stack align="center" justify="center">
            <Title align="center" order={1}>The Best Place To Find, Rent, Buy And Enjoy Your Movies Hassle Free</Title>
            <Text align="center">Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more</Text>
          </Stack>
          <Group position="center">
            <Image src="/images/couple.jpg" maw="500px" mah="300px"/>
          </Group>
        </SimpleGrid>
        { !isError && (
          <>
            <Stack py="6rem" justify="center" align="center" spacing="lg" sx={{ color: "white" }}>
              <Title align="center" order={4} color="purple.5">All In One Spot</Title>
              <Title align="center" sx={{ fontSize: "3.5rem" }}>The Film Hub Has It All</Title>
              <Text size="lg" align="center">
                Engage with more of your loved movies from all types of genres
              </Text>
            </Stack>
            <SimpleGrid 
              cols={4}
              spacing="xl"
              px="sm"
              pb="3rem"
              sx={{ borderBottom: "8px solid #232323" }}
              breakpoints={[
                { maxWidth: "xs", cols: 1 },
                { maxWidth: "md", cols: 2 },
              ]}>
                <BackgroundImage src={`${upcomingMovie?.poster_path}`} className={classes.moviePreview} component={Link} to="/login">
                  <Stack pos="relative" sx={{ color: "white" }} mt="xl" ml="md" spacing="0.2rem">
                    <Text size="sm">Rising Stars</Text>
                    <Text size="1.4rem">Upcoming</Text>
                  </Stack>
                </BackgroundImage>
                <BackgroundImage src={`${popularMovie?.poster_path}`} className={classes.moviePreview} component={Link} to="/login">
                  <Stack pos="relative" sx={{ color: "white" }} mt="xl" ml="md" spacing="0.2rem">
                    <Text size="sm">Made Their Name</Text>
                    <Text size="1.4rem">Popular</Text>
                  </Stack>
                </BackgroundImage>
                <BackgroundImage src={`${trendingMovie?.poster_path}`} className={classes.moviePreview} component={Link} to="/login">
                  <Stack pos="relative" sx={{ color: "white" }} mt="xl" ml="md" spacing="0.2rem">
                    <Text size="sm">Making the rounds</Text>
                    <Text size="1.4rem">Trending</Text>
                  </Stack>
                </BackgroundImage>
                <BackgroundImage src={`${topRatedMovie?.poster_path}`} className={classes.moviePreview} component={Link} to="/login">
                  <Stack pos="relative" sx={{ color: "white" }} mt="xl" ml="md" spacing="0.2rem">
                    <Text size="sm">The Classics</Text>
                    <Text size="1.4rem">Top Rated</Text>
                  </Stack>
                </BackgroundImage>
            </SimpleGrid>
          </>
        )}
        <SimpleGrid
          sx={{ color: "white" }} 
          cols={2} 
          py="8rem" 
          px="lg" 
          breakpoints={[
            { maxWidth: "md", cols: 1 }
          ]}>
          <Group position="center">
            <Image src="/ethereum.svg" maw="100px" mah="200px"/>
          </Group>
          <Stack align="center" justify="center">
            <Title align="center" order={1}>Buy Or Rent The Movie You Love</Title>
            <Text align="center">Enjoy your favorite movies with ethereum, the secure and decentralized way to pay</Text>
          </Stack>
        </SimpleGrid>
        <Stack justify="center" align="center" py="10rem" px="lg" sx={{ color: "white" }}>
          <Title align="center">Ready To Get Started?</Title>
          <Text align="center">Start watching your favorite movies now!</Text>
          <Button component={Link} to="/login" rightIcon={<IconArrowRight />}>Get Started</Button>
        </Stack>
      </>
  )
}