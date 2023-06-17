import { MantineTheme, createStyles } from "@mantine/core"

export const useStyles = createStyles((theme: MantineTheme) => ({
  root: {
    padding: `0 ${theme.spacing.sm}`,
    overflow: "scroll",
    "::-webkit-scrollbar": {
      display: "none",
      height: 10,
    },
  }
}))