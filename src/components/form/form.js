import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import FileInput from "./fileInput";
import ImgPreview from "./imgPreview";

import SelectChain from "./selectChain";
import { useMinterStore } from "../minter/minterStore";
import { useStore } from "../../store";

const Form = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [chain, setChain] = useState();
  const [openModal, setOpenModal] = useState(false);

  const [collapseHandler, setCollapseHandler] = useState(false);
  const setNFTData = useMinterStore((state) => state.setNFTData);
  const { chains } = useStore();

  const onClickMint = () => {
    if (chain) {
      setNFTData({
        title: title,
        description: description,
        file: file,
        quantity: quantity,
        chain: chain,
        ipfs: "",
        filename: "",
      });
    } else {
      setOpenModal(true);
    }
  };

  useEffect(() => {
    if (file) {
      setCollapseHandler(false);
      setTimeout(async () => setCollapseHandler(true), 200);
    } else {
      setCollapseHandler(false);
    }
  }, [file]);

  return (
    <>
      <Stack spacing={4}>
        <FileInput setFile={setFile} />

        <Collapse in={collapseHandler}>
          <Box p={2}>
            {file && (
              <Stack spacing={4}>
                <ImgPreview file={file} />

                <Input
                  onChange={(e) => setTitle(e.target.value)}
                  bg={"primary.900"}
                  color={"#999"}
                  placeholder="Choose your title"
                />

                <Textarea
                  bg={"primary.900"}
                  color={"#999"}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description..."
                />
                <Stack direction={"row"} spacing={4}>
                  <Box
                    bg={"primary.900"}
                    color={"#999"}
                    borderRadius={"lg"}
                    overflow="hidden"
                  >
                    <NumberInput
                      size="md"
                      minW={20}
                      maxW={40}
                      defaultValue={1}
                      min={1}
                      onChange={(e) => setQuantity(e)}
                    >
                      <NumberInputField />
                      <NumberInputStepper borderColor={"#333"}>
                        <NumberIncrementStepper borderColor={"#333"} />
                        <NumberDecrementStepper borderColor={"#333"} />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>

                  <SelectChain
                    setChain={setChain}
                    chain={chain}
                    openModal={openModal}
                  />
                </Stack>

                {chain && (
                  <>
                    <Stack direction={"row"} color="#999">
                      <Heading>Costs:</Heading>
                      <Spacer />
                      <Heading>{chains[chain].price * quantity}</Heading>
                    </Stack>
                  </>
                )}

                <Text fontSize="xs" color="#999">
                  Once your NFT is minted on the Polygon blockchain, you will
                  not be able to edit or update any of its information.
                  <br /> <br />
                  You agree that any information uploaded to the NFT Minter will
                  not contain material subject to copyright or other proprietary
                  rights, unless you have necessary permission or are otherwise
                  legally entitled to post the material.
                </Text>
                <Button variant={"mintButton"} onClick={onClickMint}>
                  MINT NFT
                </Button>
              </Stack>
            )}
          </Box>
        </Collapse>
      </Stack>
    </>
  );
};

export default Form;
