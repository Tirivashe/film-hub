import { MantineTheme, createStyles } from "@mantine/core"

export const useStyles = createStyles((theme: MantineTheme) => ({
  root: {
    position: "relative",
    borderRadius: theme.radius.lg,
    height: "80vh",
    objectFit: "cover",
    "&::before": {
      content: '""',
      position:"absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.black,
      opacity: 0.7,
      borderRadius: theme.radius.lg
    }
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
    transition: 'opacity .15s ease-in-out'
  },
  fadeOut: {
    opacity: 0,
  },
  fadeIn: {
    opacity: 1,
  },

  titleContainer: {
    position: "relative",
    opacity: 0,
    transition: 'opacity .15s ease-in-out',
    width: "40%",
    [theme.fn.smallerThan('sm')]: {
      width: "50%",
    },

    [theme.fn.smallerThan('xs')]: {
      width: "70%",
    },
  },

  carousel: {
    position: "absolute",
    zIndex: 1,
    right: 0,
    bottom: 10,
    width: "30%",

    [theme.fn.smallerThan('md')]: {
      width: "50%",
      bottom: 0
    },
    [theme.fn.smallerThan('sm')]: {
      width: "80%",
      bottom: 0
    },
    [theme.fn.smallerThan('xs')]: {
      width: "100%",
      bottom: 0
    },
  },
  slide: {
    borderRadius: theme.radius.md
  }
}))