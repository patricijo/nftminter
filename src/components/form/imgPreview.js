import React, { memo, useRef } from "react";
import { Box, Center, Flex, Image, Spacer, Stack } from "@chakra-ui/react";
import { bytesToSize } from "../../helpers/helper";

const ImgPreview = ({ file }) => {
  const imageSRC = URL.createObjectURL(file);

  return (
    <>
      <Box borderRadius="lg" overflow="hidden" bg="#fff">
        <Center>
          <Flex borderRadius="lg" overflow="hidden" m={2}>
            <Image src={imageSRC} />
          </Flex>
        </Center>

        <Box bg="#fff" p={2} pt={0}>
          <Stack direction="ros">
            <Box>{file.name}</Box>
            <Spacer />
            <Box>{bytesToSize(file.size)}</Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default ImgPreview;
