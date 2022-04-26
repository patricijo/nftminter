import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
  primary: {
    900: "#160922",
    800: "#200d31",
    700: "#381451",
  },
  secondary: "rgba(0,0,0,0.3)",
  white: "#fff",
};

const styles = {
  global: () => ({
    body: {
      bgGradient: "linear(346deg, rgba(80,25,108,1), rgba(21,14,42,1) )",
      minH: "calc(100vh)",
    },
  }),
};

const components = {
  Button: {
    baseStyle: {
      bg: "gray.50",
      _hover: {
        bg: "gray.300",
      },
    },
    variants: {
      mintButton: {
        bgGradient:
          "linear(346deg, rgba(60,53,165,1) 0%, rgba(89,83,162,1) 100%)",
        color: "white",
        size: "lg",
        _hover: {
          bgGradient:
            "linear(346deg, rgba(60,53,165,1) 0%, rgba(89,83,162,0.6244813278008299) 100%)",
        },
      },
    },
    defaultProps: {
      // Then here we set the base variant as the default
      variant: "base",
    },
  },
  Alert: {
    defaultProps: {
      // Then here we set the base variant as the default
      variant: "base",
    },
  },
};

// 3. extend the theme
const theme = extendTheme({ config, colors, styles, components });

export default theme;
