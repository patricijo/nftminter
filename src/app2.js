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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import Form from "./components/minter/formWrapper";
import { ChevronDownIcon } from "@chakra-ui/icons";

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
                <Menu>
                  <MenuButton
                    size="sm"
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    pr={1}
                    pl={0}
                  >
                    <Stack direction="row" size="sm" p={1} borderRadius="md">
                      <Circle overflow={"hidden"}>
                        <img
                          src="https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png"
                          height="15"
                          width="15"
                          alt="MATIC"
                        />
                      </Circle>
                      <Text fontSize={"xs"}>POLYGON</Text>
                    </Stack>
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Download</MenuItem>
                    <MenuItem>Create a Copy</MenuItem>
                    <MenuItem>Mark as Draft</MenuItem>
                    <MenuItem>Delete</MenuItem>
                    <MenuItem>Attend a Workshop</MenuItem>
                  </MenuList>
                </Menu>
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
