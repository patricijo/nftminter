import { Alert, AlertIcon } from "@chakra-ui/react";
import React, { memo, useEffect, useState } from "react";

const Error = ({ error }) => {
  if (error) {
    return (
      <>
        <Alert status="error" variant="left-accent" borderRadius={"lg"}>
          <AlertIcon />
          {error.text}
          <br />
          {error.id}
          <br />
          {error.code}
        </Alert>
      </>
    );
  }
};

export default Error;
