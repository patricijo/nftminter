import {
  Container,
  Stack,
  Center,
  Box,
  Collapse,
  Spacer,
} from "@chakra-ui/react";
import Form from "./components/form/form";
import Logo from "./components/logo";
import Minter from "./components/minter/minter";
import { useMinterStore } from "./components/minter/minterStore";

function App() {
  const NFTData = useMinterStore((state) => state.NFTData);
  return (
    <>
      <Center minH={"100vh"} paddingY={4}>
        <Container centerContent maxW="lg">
          <Stack spacing={4} w="100%" align="stretch">
            <Stack direction={"row"}>
              <Logo />
            </Stack>
            <Box
              bg="transparentcolor"
              w="100%"
              color={"#999"}
              maxW="lg"
              borderRadius="2xl"
              p={4}
            >
              <Collapse in={!NFTData}>
                <Form />
              </Collapse>
              <Collapse in={NFTData}>
                <Minter />
              </Collapse>
            </Box>
          </Stack>
        </Container>
      </Center>
    </>
  );
}

export default App;
