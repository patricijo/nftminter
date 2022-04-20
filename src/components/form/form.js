import React, { useEffect, useState } from "react";
import {
  Button,
  Collapse,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import FileInput from "./fileInput";
import ImgPreview from "./imgPreview";
import useStore from "../../store";

const Form = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [collapseHandler, setCollapseHandler] = useState(false);

  const setNFTData = useStore((state) => state.setNFTData);

  const onClickMint = () => {
    setNFTData({
      title: title,
      description: description,
      file: file,
    });
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
          {file && (
            <Stack spacing={4}>
              <ImgPreview file={file} />

              <Input
                bg="#fff"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Choose your title"
              />

              <Textarea
                bg="#fff"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description..."
              />
              <Text fontSize="xs" color="#999">
                Once your NFT is minted on the Polygon blockchain, you will not
                be able to edit or update any of its information.
                <br /> <br />
                You agree that any information uploaded to the NFT Minter will
                not contain material subject to copyright or other proprietary
                rights, unless you have necessary permission or are otherwise
                legally entitled to post the material.
              </Text>
              <Button
                bgGradient="linear(346deg, rgba(60,53,165,1) 0%, rgba(89,83,162,1) 100%)"
                color="#fff"
                size="lg"
                _hover={{
                  bgGradient:
                    "linear(346deg, rgba(60,53,165,1) 0%, rgba(89,83,162,0.6244813278008299) 100%)",
                }}
                onClick={onClickMint}
              >
                MINT NFT
              </Button>
            </Stack>
          )}
        </Collapse>
      </Stack>
    </>
  );
};

export default Form;
