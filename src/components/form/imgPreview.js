import { Box, Center, Flex, Image } from "@chakra-ui/react";

const ImgPreview = ({ file }) => {
  const imageSRC = URL.createObjectURL(file);

  return (
    <>
      <Box
        borderRadius="lg"
        overflow="hidden"
        bg="secondary"
        border="1px solid #333"
      >
        <Center>
          <Flex borderRadius="lg" overflow="hidden" m={2}>
            <Image src={imageSRC} />
          </Flex>
        </Center>
      </Box>
    </>
  );
};

export default ImgPreview;
