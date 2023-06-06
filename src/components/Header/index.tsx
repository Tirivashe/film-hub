import { Group, Header as MantineHeader, TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useStyles } from "./styles"
import { useStore } from "../../store"
//import Logo from "../Logo"

const Header = () => {
  const { classes } = useStyles()
  const resetGenre = useStore(state => state.closeGenres)
  const closeGenres = useStore(state => state.closeGenres)

  const showDashboard = () => {
    resetGenre()
    closeGenres()
  }

  return (
    <MantineHeader height={60} withBorder={false} fixed>
      <Group position="apart" align="center" px={30} sx={{ height: "100%" }}>
        <div onClick={showDashboard}>Logo</div>
        <TextInput
          w="30%"
          placeholder="Search any movies..."
          variant="filled"
          icon={<IconSearch size="0.8rem"/>}
          classNames={{ input: classes.input }}
        />
      </Group>
    </MantineHeader>
  )
}

export default Header