import { MantineTheme, createStyles } from "@mantine/core"

export const useStyles = createStyles((theme: MantineTheme) => ({
  input: {
    "&:focus": {
      border: `1px solid ${theme.colors["purple"][3]}`
    }
  }
}))