import { MantineTheme, createStyles } from "@mantine/core"

export const useStyles = createStyles((theme: MantineTheme) => ({
  stack: {
    overflowY: "scroll",
    "::-webkit-scrollbar": {
      display: "none",
      width: 5,
    },

    "&:hover": {
      "::-webkit-scrollbar": {
        display: "inline-block",
      },
    },

    "::-webkit-scrollbar-thumb": {
      background: `linear-gradient(100deg, ${theme.primaryColor}, ${theme.colors["purple"][3]})`,
      borderRadius: "10px",
    }
  },

  text: {
    transition: "all 0.1s ease",
    "&:hover": {
      cursor: "pointer",
      color: theme.colors["purple"]["3"]
    }
  }
}))