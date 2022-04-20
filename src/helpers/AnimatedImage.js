import React, { memo, useEffect, useState } from "react";
import {} from "@chakra-ui/react";
import { motion } from "framer-motion";

const AnimatedImage = memo(
  ({ src }) => {
    const [loaded, setLoaded] = useState(false);
    const [maxH, setMaxH] = useState(false);
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setLoaded(true);
      setMaxH(img.height);
    };

    const variants = {
      open: {
        opacity: 1,

        height: "auto",
      },
      collapsed: { opacity: 0, height: 0 },
    };

    return (
      <motion.img
        style={{
          maxHeight: maxH,
        }}
        key={src}
        src={src}
        exit={{ height: 0, opacity: 0 }}
        animate={loaded !== false ? "open" : "collapsed"}
        variants={variants}
      ></motion.img>
    );
  },
  (prev, next) => prev.src === next.src
);

export default AnimatedImage;
