import { Navbar as MantineNavbar, Stack, Title, NavLink } from "@mantine/core"
import { useFetchGenres } from "../../hooks/fetchMovies"
import { useStyles } from "./styles"
import { useStore } from "../../store"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const Navbar = () => {
  const { isError, data } = useFetchGenres()
  const { classes } = useStyles()
  const toggleNav = useStore(state => state.toggleNav)
  const open = useStore(state => state.isNavOpen)
  const [active, setActive] = useState("")
  const navigate = useNavigate()
  const clearQuery = useStore(state => state.clearQuery)


  const showMoviesInGenre = (genreId: string, genreName: string) => {
    clearQuery()
    setActive(genreId)
    toggleNav()
    navigate(`/genres/${genreId}`, { state: { genre: genreName }})
    window.scrollTo(0, 0)
  } 
  if(isError) {
    return (
      <Title>Oops, there has been an error</Title>
    )
  }
  return (
    <MantineNavbar fixed withBorder={false} width={{ base: 200 }} hidden={!open} hiddenBreakpoint="md">
      <Stack w="100%" mt="lg" pl="2rem" pb="sm" className={classes.stack}>
        <Title order={3}>Genres</Title>
        {data?.map(({ id, name }) => (
          <NavLink
            key={id}
            label={name}
            color="purple.3"
            active={id === active}
            variant="subtle"
            onClick={() => showMoviesInGenre(id, name)}
            className={classes.text}
           />
        ))}
      </Stack>
    </MantineNavbar>
  )
}

export default Navbar