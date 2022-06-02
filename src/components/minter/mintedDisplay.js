import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useMinterStore } from "./minterStore";

const MintedDisplay = ({ chains, cancelMint }) => {
  const { NFTData } = useMinterStore();
  if (NFTData !== null) {
    return (
      <>
        <Stack spacing={4}>
          <Heading color={"#fff"} textAlign="center">
            Congratulations your NFT is Ready!
          </Heading>

          <Center>
            <Box borderRadius="lg" overflow="hidden" bg="#fff">
              <Flex borderRadius="lg" overflow="hidden" m={2}>
                <Image
                  src={
                    "https://" +
                    NFTData.ipfs +
                    ".ipfs.dweb.link/" +
                    NFTData.filename
                  }
                />
              </Flex>
            </Box>
          </Center>

          <Stack direction={"row"}>
            <Button onClick={cancelMint}>Back</Button>
            <Spacer />
            <a
              href={
                chains[NFTData.chain].marketLink +
                "/" +
                chains[NFTData.chain].contract +
                "/" +
                NFTData.tokenId
              }
              target="_blank"
              rel="noreferrer"
            >
              <Button>View on {chains[NFTData.chain].marketName}</Button>
            </a>
          </Stack>
        </Stack>
      </>
    );
  }
};

export default MintedDisplay;
