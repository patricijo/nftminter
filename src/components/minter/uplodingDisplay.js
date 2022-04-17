import React from "react";
import {
  Box,
  Button,
  Center,
  Circle,
  CircularProgress,
  Collapse,
  Heading,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, CheckIcon } from "@chakra-ui/icons";

const UploadingDisplay = (props) => {
  return (
    <>
      <Collapse in={props.minterState <= 4}>
        <Stack spacing={4}>
          <Collapse in={props.minterState >= 1}>
            <Box
              bg="#fff"
              borderRadius="lg"
              overflow="hidden"
              spacing={4}
              p={2}
            >
              <Stack direction="row">
                <Heading as="h6" size="xs" color="#666" p={2}>
                  Connect your Wallet...
                </Heading>

                <Spacer />
                <Center>
                  {props.minterState === 1 ? (
                    <CircularProgress
                      isIndeterminate
                      color="purple.300"
                      size="25px"
                      mr={2}
                    />
                  ) : (
                    <Circle size="25px" bg={"green.300"} color="white" mr={2}>
                      <CheckIcon w={3} h={3} />
                    </Circle>
                  )}
                </Center>
              </Stack>
            </Box>
          </Collapse>

          <Collapse in={props.minterState >= 2}>
            <Box
              bg="#fff"
              borderRadius="lg"
              overflow="hidden"
              spacing={4}
              p={2}
            >
              <Stack direction="row">
                <Heading as="h6" size="xs" color="#666" p={2}>
                  Uplading Image...
                </Heading>

                <Spacer />
                <Center>
                  {props.minterState === 2 ? (
                    <CircularProgress
                      isIndeterminate
                      color="purple.300"
                      size="25px"
                      mr={2}
                    />
                  ) : (
                    <Circle size="25px" bg={"green.300"} color="white" mr={2}>
                      <CheckIcon w={3} h={3} />
                    </Circle>
                  )}
                </Center>
              </Stack>
            </Box>
          </Collapse>

          <Collapse in={props.minterState >= 3}>
            <Box
              bg="#fff"
              borderRadius="lg"
              overflow="hidden"
              spacing={4}
              p={2}
            >
              <Stack direction="row">
                <Heading as="h6" size="xs" color="#666" p={2}>
                  Please sign the transaction...
                </Heading>

                <Spacer />
                <Center>
                  {props.minterState === 3 ? (
                    props.minterError === null ? (
                      <CircularProgress
                        isIndeterminate
                        color="purple.300"
                        size="25px"
                        mr={2}
                      />
                    ) : (
                      <Circle size="25px" bg={"red.400"} color="white" mr={2}>
                        !
                      </Circle>
                    )
                  ) : (
                    <Circle size="25px" bg={"green.400"} color="white" mr={2}>
                      <CheckIcon w={3} h={3} />
                    </Circle>
                  )}
                </Center>
              </Stack>
            </Box>
          </Collapse>

          <Collapse in={props.minterState >= 4}>
            <Box
              bg="#fff"
              borderRadius="lg"
              overflow="hidden"
              spacing={4}
              p={2}
            >
              <Stack direction="row">
                <Heading as="h6" size="xs" color="#666" p={2}>
                  Smart Contract is working...
                </Heading>

                <Spacer />
                <Center>
                  {props.minterState === 4 ? (
                    <CircularProgress
                      isIndeterminate
                      color="purple.300"
                      size="25px"
                      mr={2}
                    />
                  ) : (
                    <Circle size="25px" bg={"green.400"} color="white" mr={2}>
                      <CheckIcon w={3} h={3} />
                    </Circle>
                  )}
                </Center>
              </Stack>
            </Box>
          </Collapse>
        </Stack>
      </Collapse>
      <Collapse in={props.minterState >= 5}>
        <Center>
          <Heading as="h2" size="lg" color="#fff" p={2}>
            Congratulation NFT is ready!
          </Heading>
        </Center>
        <Stack direction="row" pt="4">
          <Button
            leftIcon={<ArrowBackIcon />}
            size="sm"
            onClick={props.backButtonClick}
          >
            Create Another one
          </Button>
          <Spacer></Spacer>

          <Button
            rightIcon={<ArrowForwardIcon />}
            size="sm"
            colorScheme="teal"
            onClick={props.startMint}
          >
            View on Opensea.io
          </Button>
        </Stack>
      </Collapse>
    </>
  );
};

export default UploadingDisplay;
