import "./App.css";
import {
  Container,
  Box,
  VStack,
  Heading,
  Spacer,
  Flex,
  Stack,
  Button,
  Circle,
  Text,
} from "@chakra-ui/react";

import Form from "./components/minter/formWrapper";

function App() {
  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bgGradient="linear(346deg, rgba(80,25,108,1), rgba(21,14,42,1) )"
      >
        <Container centerContent maxW="lg">
          <VStack spacing={4} w="100%" align="stretch">
            <Stack direction={"row"}>
              <Box>
                <Heading as="h1" size="2xl" color="#fff">
                  MINT
                </Heading>
                <Heading as="h1" size="md" color="#fff" ml={1} mb={-3} mt={-1}>
                  YOUR
                </Heading>
                <Heading as="h1" size="3xl" color="#fff">
                  NFT
                </Heading>
              </Box>
              <Spacer />
              <Box>
                <Text color="#fff">Networks:</Text>
                <Button size="sm">BNB</Button>
                <Button size="sm">ETH</Button>{" "}
                <Button size="sm" bg="#4f196b" color="#fff">
                  <Circle overflow={"hidden"} ml="-1" mr="1">
                    <img
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png"
                      height="24"
                      width="24"
                      alt="MATIC"
                    />
                  </Circle>
                  MATIC
                </Button>
              </Box>
            </Stack>
            <Form />
          </VStack>
        </Container>
      </Flex>
    </>
  );
}

export default App;
