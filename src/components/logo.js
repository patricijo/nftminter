import { Box, Heading } from "@chakra-ui/react";

const Logo = (props) => {
  return (
    <>
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
    </>
  );
};

export default Logo;
