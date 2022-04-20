import React, { memo, useEffect, useState } from "react";
import { Flex, Collapse } from "@chakra-ui/react";
import { motion } from "framer-motion";

const AnimatedFlex = ({ children }) => {
  const [load, setLoad] = useState(false);
  const MotionCollapse = motion(Flex);
  useEffect(() => {
    setLoad(false);
    setTimeout(async () => {
      setLoad(true);
    }, 200);
  }, []);

  return (
    <Collapse in={load !== false}>
      <div>{children}</div>
    </Collapse>
  );
};

export default AnimatedFlex;
