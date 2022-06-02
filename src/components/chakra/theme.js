// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  colors: {
    brand: {},
    primary: {
      100: "rgba(80,25,108,1)",
      200: "rgba(21,14,42,1)",
    },
    transparentcolor: "rgba(0,0,0,0.3)",
  },
  fonts: {},
  styles: {
    global: () => ({
      body: {
        bgGradient: "linear(346deg, primary.100, primary.200 )",
        minH: "calc(100vh)",
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        bg: "gray.50",
        color: "#333",
        _hover: {
          bg: "gray.300",
        },
      },
      defaultProps: {
        // Then here we set the base variant as the default
        variant: "base",
      },
    },
  },
});

export default theme;
