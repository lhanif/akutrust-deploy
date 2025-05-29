"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const hoverEffect = {
  scale: 1.1,
  transition: { duration: 0.3 },
};

export function PartnershipSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="h-[80vh] w-full flex flex-col items-center justify-center px-4 md:px-0"
    >
      <h1 className="font-inter font-semibold text-[10px] md:text-base text-black opacity-65 text-center">
        Our Partnership & Commitment <span className="text-[#1877AA]">to Transparency</span>
      </h1>
      <div className="flex items-center justify-center space-x-4 md:space-x-40 mt-10">
        <motion.div className="w-20 md:w-32" variants={fadeInUp} whileHover={hoverEffect}>
          <Image
            src="/photo1.svg"
            alt="Partners"
            width={124}
            height={124}
            layout="responsive"
          />
        </motion.div>
        <motion.div className="w-24 md:w-40" variants={fadeInUp} whileHover={hoverEffect}>
          <Image
            src="/photo2.svg"
            alt="Partners"
            width={161}
            height={112}
            layout="responsive"
          />
        </motion.div>
        <motion.div className="w-28 md:w-52" variants={fadeInUp} whileHover={hoverEffect}>
          <Image
            src="/photo3.svg"
            alt="Partners"
            width={212}
            height={83}
            layout="responsive"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}