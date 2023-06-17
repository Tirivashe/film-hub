import { MantineTheme, createStyles } from "@mantine/core"

export const useStyles = createStyles((theme: MantineTheme) => ({
  root: {
    overflow: "scroll",
    "::-webkit-scrollbar": {
      display: "none",
    },
  }
}))