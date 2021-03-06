import React, { useRef } from "react";
import { Button } from "@chakra-ui/react";

const FileInput = (props) => {
  const fileInputField = useRef();

  const selectImage = () => {
    fileInputField.current.click();
    console.log();
  };

  return (
    <>
      <Button onClick={selectImage} m={2}>
        Choose Image
      </Button>
      <input
        type="file"
        ref={fileInputField}
        onChange={(e) => {
          props.setFormValues((prev) => ({
            ...prev,
            file: e.target.files[0],
          }));
        }}
        hidden
        accept="image/*"
      ></input>
    </>
  );
};

export default FileInput;
