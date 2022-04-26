import { Container, Stack, Center, Box, Collapse } from "@chakra-ui/react";
import Form from "./components/form/form";
import Logo from "./components/logo";
import Minter from "./components/minter/minter";
import { useMinterStore } from "./components/minter/minterStore";

function App() {
  const NFTData = useMinterStore((state) => state.NFTData);
  return (
    <>
      <Center minH={"100vh"}>
        <Container centerContent maxW="lg">
          <Stack spacing={4} w="100%" align="stretch">
            <Stack direction={"row"}>
              <Logo />
            </Stack>
            <Box
              bg="secondary"
              w="100%"
              color="black"
              maxW="lg"
              borderRadius="2xl"
              p={4}
            >
              <Collapse in={!NFTData}>
                <Form />
              </Collapse>
              <Collapse in={NFTData}>
                <Minter NFTData={NFTData} />
              </Collapse>
            </Box>
          </Stack>
        </Container>
      </Center>
    </>
  );
}

export default App;
