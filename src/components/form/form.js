import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
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
  const initialState = {
    title: "",
    description: "",
    file: null,
    quantity: 1,
    chain: null,
  };
  const [formValues, setFormValues] = useState(initialState);

  const [openModal, setOpenModal] = useState(false);

  const [collapseHandler, setCollapseHandler] = useState(false);

  const setNFTData = useMinterStore((state) => state.setNFTData);

  const { chains, clear, toggleClear, toggleMint } = useStore();

  const onClickMint = () => {
    if (formValues.chain) {
      setNFTData({
        title: formValues.title,
        description: formValues.description,
        file: formValues.file,
        quantity: formValues.quantity,

        chain: formValues.chain,
        ipfs: "",
        filename: "",
      });
      toggleMint();
    } else {
      setOpenModal(true);
    }
  };

  useEffect(() => {
    if (formValues.file) {
      setCollapseHandler(false);
      setTimeout(async () => setCollapseHandler(true), 200);
    } else {
      setCollapseHandler(false);
    }
  }, [formValues.file]);

  useEffect(() => {
    if (clear === true) {
      setFormValues(initialState);
      toggleClear();
    }
  }, [clear]);

  return (
    <>
      <Stack spacing={2}>
        <FileInput setFormValues={setFormValues} />

        <Collapse in={collapseHandler}>
          <Box m={2} mt={0}>
            {formValues.file && (
              <Stack spacing={4}>
                <ImgPreview file={formValues.file} />
                e.target.value
                <Input
                  onChange={(e) => {
                    setFormValues((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }));
                  }}
                  bg={"transparentcolor"}
                  borderColor={"#333"}
                  placeholder="Choose your title"
                />
                <Textarea
                  bg={"transparentcolor"}
                  onChange={(e) => {
                    setFormValues((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  }}
                  placeholder="Description..."
                  borderColor={"#333"}
                />
                <Stack direction={"row"} spacing={4}>
                  <Box bg={"transparentcolor"} borderRadius={"lg"}>
                    <NumberInput
                      size="md"
                      minW={20}
                      maxW={40}
                      defaultValue={1}
                      min={1}
                      onChange={(e) => {
                        setFormValues((prev) => ({
                          ...prev,
                          quantity: e,
                        }));
                      }}
                      borderColor={"#333"}
                    >
                      <NumberInputField />
                      <NumberInputStepper borderColor={"#333"}>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>

                  <SelectChain
                    setFormValues={setFormValues}
                    chain={formValues.chain}
                    openModal={openModal}
                  />
                </Stack>
                {formValues.chain && (
                  <>
                    <Stack direction={"row"} color="#fff">
                      <Text fontSize="lg">Price:</Text>
                      <Spacer />
                      <Box align="right">
                        <Text fontSize="lg">
                          {chains[formValues.chain].price * formValues.quantity}{" "}
                          {formValues.chain}*{" "}
                        </Text>
                        <Text fontSize="sm">
                          *not including transaction fees
                        </Text>
                      </Box>
                    </Stack>
                    <Divider />
                  </>
                )}
                <Text fontSize="xs">
                  Once your NFT is minted on the blockchain, you will not be
                  able to edit or update any of its information.
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
