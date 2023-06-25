import { Navbar as MantineNavbar, Stack, Title, NavLink } from "@mantine/core"
import { useFetchGenres } from "../../hooks/fetchMovies"
import { useStyles } from "./styles"
import { useStore } from "../../store"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FC } from "react"
import { LoggedInUser } from "../User"

const Navbar: FC = () => {
  const { isError, data } = useFetchGenres()
  const { classes } = useStyles()
  const open = useStore(state => state.isNavOpen)
  const [active, setActive] = useState("")
  const navigate = useNavigate()
  const user = useStore(state => state.user)
  const toggleNav = useStore(state => state.toggleNav)
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
    <MantineNavbar fixed withBorder={false} width={{ base: 250 }} hidden={!open} hiddenBreakpoint="md">
      <MantineNavbar.Section>
        <Title pl="2rem" py="md" order={3}>Genres</Title>
      </MantineNavbar.Section>
      <MantineNavbar.Section grow className={classes.stack}>
        <Stack w="100%" mt="lg" pl="2rem" pb="sm">
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
      </MantineNavbar.Section>
      <MantineNavbar.Section>
        <LoggedInUser user={user}/>
      </MantineNavbar.Section>
    </MantineNavbar>
  )
}

export default Navbar