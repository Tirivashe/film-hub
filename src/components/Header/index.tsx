import { Burger, Group, Header as MantineHeader, MediaQuery, TextInput, Title } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useStyles } from "./styles"
import { useStore } from "../../store"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

const Header = () => {
  const { classes } = useStyles()
  const isNavOpen = useStore(state => state.isNavOpen)
  const toggleNav = useStore(state => state.toggleNav)
  const query = useStore(state => state.query)
  const queryChange = useStore(state => state.queryChange)
  const clearQuery = useStore(state => state.clearQuery)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const showDashboard = () => {
    clearQuery()
    navigate('/')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    queryClient.cancelQueries({ queryKey: ['movies', "search", query] })
    queryChange(e.target.value)
  }

  return (
    <MantineHeader height={60} withBorder={false} fixed>
      <Group position="apart" align="center" px={30} sx={{ height: "100%" }}>
        <MediaQuery largerThan="md" styles={{ display: "none" }}>
          <Burger
            opened={isNavOpen}
            onClick={() => toggleNav()}
            size="sm"
            mr="xl"
          />
        </MediaQuery>
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Title
            order={2}
            variant="gradient"
            gradient={{ from: 'purple.8', to: 'purple.4', deg: 55 }}
            sx={{ cursor: "pointer" }}
            onClick={showDashboard}
          >
            Film Hub
          </Title>
        </MediaQuery>
        <TextInput
          value={query}
          onChange={handleChange}
          placeholder="Search any movies..."
          variant="filled"
          icon={<IconSearch size="0.8rem"/>}
          classNames={{ input: classes.input, root: classes.root }}
        />
      </Group>
    </MantineHeader>
  )
}

export default Header