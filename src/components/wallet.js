import React, { useEffect, useState } from "react";
import { Box, Button, Center, Circle, Stack, Text } from "@chakra-ui/react";
import Blockies from "react-blockies";

const Wallet = (props) => {
  const [account, setAccount] = useState(null);

  const requestAccount = async () => {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    return account;
  };

  const truncate = (fullStr, strLen, separator) => {
    if (fullStr.length <= strLen) return fullStr;

    separator = separator || "...";

    var sepLen = separator.length,
      charsToShow = strLen - sepLen,
      frontChars = Math.ceil(charsToShow / 2),
      backChars = Math.floor(charsToShow / 2);

    return (
      fullStr.substr(0, frontChars) +
      separator +
      fullStr.substr(fullStr.length - backChars)
    );
  };
  useEffect(() => {
    requestAccount().then((res) => setAccount(res[0]));
  }, []);

  return (
    <>
      <Box>
        <Button size="sm" bg="#fff" borderRadius="full" m={2.5}>
          {!account ? (
            "Connect Wallet"
          ) : (
            <Stack direction={"row"}>
              <Circle overflow="hidden" ml="-2">
                <Blockies seed={account} size="6" />
              </Circle>
              <Center>
                <Text>{truncate(account, 14, " ... ")}</Text>
              </Center>
            </Stack>
          )}
        </Button>
      </Box>
    </>
  );
};

export default Wallet;
