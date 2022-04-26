import { Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";

import { useStore } from "../../store";

const SelectChain = ({ setChain, chain, openModal }) => {
  const { chains } = useStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (openModal === true) {
      onOpen();
    }
  }, [openModal, onOpen]);

  const ChainList = () => {
    return Object.keys(chains).map(function (key, index) {
      return (
        <div key={index}>
          <Box
            minH="48px"
            onClick={() => {
              setChain(key);
              onClose();
            }}
            _hover={{
              bg: "secondary",
            }}
            p={4}
            cursor="pointer"
          >
            <Stack direction={"row"} spacing={4}>
              <Center>
                <Icon as={chains[key].icon} w={6} h={6} />
              </Center>

              <span>
                {chains[key].name}
                <br />
                <Text fontSize={"xs"}>Testnet</Text>
              </span>
              <Spacer />
            </Stack>
          </Box>
        </div>
      );
    });
  };

  return (
    <>
      <Button onClick={onOpen} w="100%" justifyContent="flex-start">
        {chain ? (
          <>
            <Stack direction={"row"}>
              <Icon as={chains[chain].icon} w={6} h={6} />{" "}
              <Text>{chains[chain].name}</Text>
            </Stack>
          </>
        ) : (
          <>Choose a chain</>
        )}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="primary.800" borderRadius={"lg"} overflow={"hidden"}>
          <ModalHeader>Choose a Chain.</ModalHeader>
          <ModalCloseButton />

          <ChainList />
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectChain;
