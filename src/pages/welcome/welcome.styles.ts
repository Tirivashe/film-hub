import { MantineTheme, createStyles } from "@mantine/core"

export const useStyles = createStyles((theme: MantineTheme) => ({
  bgImg: {
    color: "white",
    display: "flex",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.colors.dark[9],
      opacity: 0.7,
    }
  },
  moviePreview: {
    color: "white",
    borderRadius: theme.radius.lg,
    width: "100%",
    height: "30rem",
    position: "relative",
    transition: "all 0.2s ease",
    "&:before": {
      content: '""',
      position: "absolute",
      borderRadius: theme.radius.lg,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.colors.dark[9],
      opacity: 0.3,
    },
    "&:hover": {
      cursor: "pointer",
      outline: `4px solid ${theme.colors.purple[6]}`,
      outlineOffset: "0.3rem",
      "&:before": {
        content: '""',
        position: "absolute",
        borderRadius: theme.radius.lg,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.colors.dark[9],
        opacity: 0.7,
      },
    }
  }
}))