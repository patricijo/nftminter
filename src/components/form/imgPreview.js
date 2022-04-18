import React, { useRef } from "react";
import { Box, Button, Center, Image, Spacer, Stack } from "@chakra-ui/react";
import { bytesToSize } from "../../helpers/helper";

const ImgPreview = (props) => {
  return (
    <>
      <Box borderRadius="lg" overflow="hidden" bg="#fff">
        <Center>
          <Box borderRadius="lg" overflow="hidden" m={2}>
            <Image src={URL.createObjectURL(props.file)} />
          </Box>
        </Center>

        <Box bg="#fff" p={2} pt={0}>
          <Stack direction="ros">
            <Box>{props.file.name}</Box>
            <Spacer />
            <Box>{bytesToSize(props.file.size)}</Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default ImgPreview;
