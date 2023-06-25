import { createStyles } from "@mantine/core"

export const useStyles = createStyles(() => ({
  root: {
    overflow: "scroll",
    "::-webkit-scrollbar": {
      display: "none",
    },
  }
}))