import {
  Container,
  Stack,
  Center,
  Box,
  Collapse,
  Flex,
} from "@chakra-ui/react";
import Form from "./components/form/form";
import Logo from "./components/logo";
import useStore from "./store";
import Minter from "./components/minter/minter";

function App() {
  const NFTData = useStore((state) => state.NFTData);
  console.log("run app.js");
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
              <Collapse in={!NFTData}>
                <Form />
              </Collapse>
              <Collapse in={NFTData}>
                {NFTData ? <Minter NFTData={NFTData} /> : null}
              </Collapse>
            </Box>
          </Stack>
        </Container>
      </Center>
    </>
  );
}

export default App;
