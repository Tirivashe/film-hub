import { MantineTheme, createStyles } from "@mantine/core"

export const useStyles = createStyles((theme: MantineTheme) => ({
  root: {
    backgroundColor: theme.colors.dark[6],
    borderRadius: theme.radius.lg
  }
}))