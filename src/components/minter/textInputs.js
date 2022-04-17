import React from "react";
import {
  Box,
  Button,
  Circle,
  Flex,
  HStack,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const TextInputs = (props) => {
  return (
    <>
      <Input
        bg="#fff"
        onChange={(e) => props.setTitle(e.target.value)}
        placeholder="Choose your title"
      />
      <Textarea
        bg="#fff"
        onChange={(e) => props.setDescription(e.target.value)}
        placeholder="Description..."
      />
      <Text fontSize="xs" color="#999">
        Once your NFT is minted on the Polygon blockchain, you will not be able
        to edit or update any of its information.
        <br /> <br />
        You agree that any information uploaded to the NFT Minter will not
        contain material subject to copyright or other proprietary rights,
        unless you have necessary permission or are otherwise legally entitled
        to post the material.
      </Text>
      <Flex>
        <Spacer />
        <HStack>
          <Box
            cursor="pointer"
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
            _checked={{
              bg: "teal.600",
              color: "white",
              borderColor: "teal.600",
            }}
            _focus={{
              boxShadow: "outline",
            }}
            px={5}
            py={3}
          >
            jkhnuio
          </Box>
          <Box
            cursor="pointer"
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
            _checked={{
              bg: "teal.600",
              color: "white",
              borderColor: "teal.600",
            }}
            _focus={{
              boxShadow: "outline",
            }}
            px={5}
            py={3}
          >
            jkhnuio
          </Box>
          <Box
            cursor="pointer"
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
            _checked={{
              bg: "teal.600",
              color: "white",
              borderColor: "teal.600",
            }}
            _focus={{
              boxShadow: "outline",
            }}
            px={5}
            py={3}
          >
            jkhnuio
          </Box>
        </HStack>
      </Flex>
    </>
  );
};

export default TextInputs;
