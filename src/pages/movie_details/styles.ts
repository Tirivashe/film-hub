import { MantineTheme, createStyles } from "@mantine/core"

export const useStyles = createStyles((theme: MantineTheme) => ({
  root: {
    background: theme.colors.dark[7],
    borderRadius: theme.radius.lg
  },
  bgImg: {
    position: "relative",
    borderRadius: theme.radius.lg,
    "&::before": {
      content: '""',
      position:"absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.black,
      opacity: 0.9,
      borderRadius: theme.radius.lg
    }
  },
  grid: {
    position: "relative",
  }
}))