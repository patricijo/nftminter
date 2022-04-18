// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
export const theme = extendTheme({
  colors: {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
    primary: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
    secondary: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
  fonts: {},
  styles: {
    global: () => ({
      body: {
        bgGradient: "linear(346deg, rgba(80,25,108,1), rgba(21,14,42,1) )",
        h: "calc(100vh)",
      },
    }),
  },
  components: {},
});