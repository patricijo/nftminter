import "./App.css";
import { Container, Stack, Center, Box } from "@chakra-ui/react";
import Form from "./components/form/form";
import Logo from "./components/logo";

function App() {
  return (
    <>
      <Center minH={"100vh"}>
        <Container centerContent maxW="lg">
          <Stack spacing={4} w="100%" align="stretch">
            <Stack direction={"row"}>
              <Logo />
            </Stack>
            <Box
              bg="rgba(0,0,0,0.5)"
              w="100%"
              color="black"
              maxW="lg"
              borderRadius="2xl"
              p={8}
            >
              <Form />
            </Box>
          </Stack>
        </Container>
      </Center>
    </>
  );
}

export default App;
