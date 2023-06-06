import { Navbar as MantineNavbar, Stack, Title, Loader, Text } from "@mantine/core"
import { useFetchGenres } from "../../hooks/fetchMovies"
import { useStyles } from "./styles"
import { useStore } from "../../store"
const Navbar = () => {
  const { isLoading, isFetching, isError, data } = useFetchGenres()
  const { classes } = useStyles()
  const setGenre = useStore(state => state.setGenre)
  const openGenres = useStore(state => state.openGenres)

  const showMoviesInGenre = (genreId: string, genre: string) => {
    setGenre(genreId, genre)
    openGenres()
  } 


  if(isLoading || isFetching) {
    return (
    <Stack justify='center' align='center' w="100%" h="100vh">
      <Loader />
    </Stack>
    )
  }
  if(isError) {
    return (
      <Title>Oops, there has been an error</Title>
    )
  }
  return (
    <MantineNavbar fixed withBorder={false} width={{ base: 200 }}>
      <Stack w="100%" mt="lg" pl="2rem" pb="sm" className={classes.stack}>
        <Title order={3}>Genres</Title>
        {data?.map(({ id, name }) => (
          <Text key={id} onClick={() => showMoviesInGenre(id, name)} className={classes.text}>{name}</Text>
        ))}
      </Stack>
    </MantineNavbar>
  )
}

export default Navbar