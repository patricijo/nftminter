import { CheckIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Center,
  Circle,
  CircularProgress,
  Heading,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import React from "react";

const StatusCard = ({ state }) => {
  return (
    <>
      <Box bg="#fff" borderRadius="lg" overflow="hidden" spacing={4} p={2}>
        <Stack direction="row">
          <Heading as="h6" size="xs" color="#666" p={2}>
            {state.text}
          </Heading>

          <Spacer />
          <Center>
            {state.state === "loading" ? (
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
    </>
  );
};

const ErrorCard = ({ state }) => {
  return (
    <>
      <Alert status="error" variant="left-accent" borderRadius={"lg"}>
        <AlertIcon />
        {state.text}
      </Alert>
    </>
  );
};

const Status = ({ status }) => {
  console.log(status);
  return Object.keys(status).map((key, index) => {
    if (status[key].state !== "error") {
      return <StatusCard state={status[key]} key={index}></StatusCard>;
    } else {
      return <ErrorCard state={status[key]} key={index}></ErrorCard>;
    }
  });
};

export default Status;
