import React from "react";
import { Alert, AlertIcon, Button, Spacer, Stack } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const ErrorDisplay = (props) => {
  switch (props.minterError) {
    case "Please use the polygone chain":
      return (
        <>
          <Alert status="error" borderRadius="lg">
            <AlertIcon />
            {props.minterError}
          </Alert>
          <Stack direction="row" pt="4">
            <Button
              leftIcon={<ArrowBackIcon />}
              colorScheme="teal"
              size="sm"
              onClick={props.backButtonClick}
            >
              Back
            </Button>
            <Spacer></Spacer>

            <Button
              rightIcon={<ArrowForwardIcon />}
              size="sm"
              onClick={props.selectNetwork}
            >
              Switch to Polygon Network
            </Button>
          </Stack>
        </>
      );

    case "Please connect your MetaMask wallet":
      return (
        <>
          <Alert status="error" borderRadius="lg">
            <AlertIcon />
            {props.minterError}
          </Alert>
          <Stack direction="row" pt="4">
            <Button
              leftIcon={<ArrowBackIcon />}
              colorScheme="teal"
              size="sm"
              onClick={props.backButtonClick}
            >
              Cancel
            </Button>
            <Spacer></Spacer>

            <Button
              rightIcon={<ArrowForwardIcon />}
              size="sm"
              // onClick={selectNetwork}
            >
              More Information
            </Button>
          </Stack>
        </>
      );
    case 4001:
      return (
        <>
          <Alert status="error" borderRadius="lg" mt={4}>
            <AlertIcon />
            Transaction signature denied by User.
          </Alert>
          <Stack direction="row" pt="4">
            <Button
              leftIcon={<ArrowBackIcon />}
              colorScheme="teal"
              size="sm"
              onClick={props.backButtonClick}
            >
              Cancel
            </Button>
            <Spacer></Spacer>

            <Button
              rightIcon={<ArrowForwardIcon />}
              size="sm"
              onClick={props.startMint}
            >
              Try Again
            </Button>
          </Stack>
        </>
      );
    case "Cherries":
      console.log("Cherries are $3.00 a pound.");
      break;
    case "Mangoes":
    case "Papayas":
      console.log("Mangoes and papayas are $2.79 a pound.");
      break;
    default:
  }
};

export default ErrorDisplay;
