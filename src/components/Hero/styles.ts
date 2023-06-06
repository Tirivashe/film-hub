import { MantineTheme, createStyles } from "@mantine/core"

export const useStyles = createStyles((theme: MantineTheme) => ({
  root: {
    borderRadius: theme.radius.lg,
    position: "relative"
  },
  img: {
    cursor: "pointer",
    filter: "brightness(40%)",
  },

  imgSelected: {
    transition: "all 0.4s ease",
    filter: "brightness(100%)", 
  },
  heroImg: {
    filter: "brightness(50%)",
    opacity: 0,
    transition: 'opacity .2s ease-in-out'
  },
  fadeOut: {
    opacity: 0,
  },
  fadeIn: {
    opacity: 1,
  },

  titleContainer: {
    opacity: 0,
    transition: 'opacity .2s ease-in-out'
  },

  carousel: {
    position: "absolute",
    zIndex: 1,
    right: 0,
    bottom: 10,
    width: "30%",
  },
  slide: {
    borderRadius: theme.radius.md
  }
}))