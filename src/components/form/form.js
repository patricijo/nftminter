import React, { useEffect } from "react";
import { Button, Collapse, Input, Text, Textarea } from "@chakra-ui/react";

const Form = (props) => {
  return (
    <>
      <Collapse in={true}>
        <Collapse in={true}>
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
            Once your NFT is minted on the Polygon blockchain, you will not be
            able to edit or update any of its information.
            <br /> <br />
            You agree that any information uploaded to the NFT Minter will not
            contain material subject to copyright or other proprietary rights,
            unless you have necessary permission or are otherwise legally
            entitled to post the material.
          </Text>
          <Button
            bgGradient="linear(346deg, rgba(60,53,165,1) 0%, rgba(89,83,162,1) 100%)"
            color="#fff"
            size="lg"
            _hover={{
              bgGradient:
                "linear(346deg, rgba(60,53,165,1) 0%, rgba(89,83,162,0.6244813278008299) 100%)",
            }}
          >
            MINT NFT
          </Button>
        </Collapse>
      </Collapse>
    </>
  );
};

export default Form;
