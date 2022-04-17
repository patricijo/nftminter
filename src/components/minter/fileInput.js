import React, { useState } from "react";
import { Button, Box, Image, Stack, Spacer, Center } from "@chakra-ui/react";

export const bytesToSize = (bytes) => {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
};

const FileInput = (props) => {
  const [imgSRC, setImgSRC] = useState();

  const selectImage = () => {
    document.getElementById("input_file").click();
  };

  const onChangeImage = (value) => {
    props.setFile(value.files[0]);
    setImgSRC(URL.createObjectURL(value.files[0]));
  };

  const ImgPreview = () => {
    if (props.file) {
      return (
        <>
          <Box borderRadius="lg" overflow="hidden" bg="#fff">
            <Center>
              <Box borderRadius="lg" overflow="hidden" m={2}>
                <Image src={imgSRC} />
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
    }
  };

  return (
    <>
      <Button onClick={selectImage}>
        {props.file ? <>Change image</> : <>Select your image</>}
      </Button>
      <input
        type="file"
        id="input_file"
        onChange={(e) => onChangeImage(e.target)}
        hidden
        accept="image/*"
      ></input>
      <ImgPreview />
    </>
  );
};

export default FileInput;
