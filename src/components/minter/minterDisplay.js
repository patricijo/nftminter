import { CheckIcon } from "@chakra-ui/icons";
import {
  Alert,
  Box,
  Button,
  Center,
  Circle,
  CircularProgress,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { memo } from "react";
import { useMinterStore } from "./minterStore";
const StatusIcon = ({ index }) => {
  const status = useMinterStore((state) => state.minterStates[index].state);

  if (status === "loading") {
    return (
      <CircularProgress isIndeterminate color="purple.300" size="25px" mr={2} />
    );
  }

  if (status === "checked") {
    return (
      <Circle size="25px" bg={"green.300"} color="white" mr={2}>
        <CheckIcon w={3} h={3} />
      </Circle>
    );
  }

  if (status === "err") {
    return (
      <Circle size="25px" bg={"red.300"} color="white" mr={2}>
        <b>!</b>
      </Circle>
    );
  }

  return;
};

const StatusCard = memo(
  ({ state, index }) => {
    const MotionFlex = motion(Box);
    return (
      <>
        <MotionFlex
          initial={{ height: 0, opacity: 1 }}
          animate={{
            height: "auto",
            opacity: 1,

            transition: { duration: 0.6 },
          }}
          exit={{ height: 0, opacity: 1 }}
        >
          <Box bg="#fff" borderRadius="lg" overflow="hidden" spacing={4} p={2}>
            <Stack direction="row">
              <Heading as="h6" size="xs" color="#666" p={2}>
                {state.text}
              </Heading>

              <Spacer />
              <Center>
                <StatusIcon index={index} />
              </Center>
            </Stack>
          </Box>
        </MotionFlex>
      </>
    );
  },
  (prev, next) => prev.state.id === next.state.id
);

const ErrorCard = memo(
  ({ state, resetMint, cancelMint }) => {
    const MotionFlex = motion(Box);
    return (
      <>
        <MotionFlex
          initial={{ height: 0, opacity: 1 }}
          animate={{
            height: "auto",
            opacity: 1,

            transition: { duration: 0.6 },
          }}
          exit={{ height: 0, opacity: 1 }}
          layout
        >
          <Alert
            status="error"
            variant="left-accent"
            borderRadius="lg"
            overflow="hidden"
          >
            <Stack spacing={0}>
              <b>{state.id}</b>
              <Text>{state.text}</Text>
            </Stack>
          </Alert>

          <Stack direction={"row"} pt={2}>
            <Button onClick={cancelMint}>Cancel</Button>
            <Spacer />
            <Button onClick={resetMint}>Try again</Button>
          </Stack>
        </MotionFlex>
      </>
    );
  },
  (prev, next) => prev.state.id === next.state.id
);
const MinterDisplay = ({ cancelMint, resetMint }) => {
  const { minterStates } = useMinterStore();

  return minterStates.map((state, index) => {
    if (state.state !== "error") {
      return (
        <AnimatePresence key={index}>
          <StatusCard state={state} index={index}></StatusCard>
        </AnimatePresence>
      );
    } else {
      return (
        <>
          <AnimatePresence key={index}>
            <ErrorCard
              state={state}
              index={index}
              cancelMint={cancelMint}
              resetMint={resetMint}
            ></ErrorCard>
          </AnimatePresence>
        </>
      );
    }
  });
};

export default MinterDisplay;
