import { MantineTheme, createStyles } from "@mantine/core"

export const useStyles = createStyles((theme: MantineTheme) => ({
  img: {
    clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)",
    opacity: 0.3,
  },
  form: {
    background: theme.colors.dark[6],
  }
}))