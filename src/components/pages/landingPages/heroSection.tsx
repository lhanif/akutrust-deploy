"use client";

import React from 'react';
import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 2 } },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0,
    },
  },
};

const hoverEffect = {
  scale: 1.05,
  transition: { duration: 0.3 },
};

const cardVariants = {
  initial: { y: 0, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" },
  hover: { 
    y: -8, 
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const checkIconVariants = {
  initial: { scale: 1, color: "#0C3C55" },
  hover: { 
    scale: 1.25, 
    color: "#2563EB",
    transition: { duration: 0.2, ease: "easeInOut" }
  }
};

const textVariants = {
  initial: { color: "#000000" },
  hover: { 
    color: "#2563EB",
    transition: { duration: 0.2 }
  }
};

export function HeroSection() {
  const router = useRouter();
  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="h-auto md:min-h-screen flex flex-col md:flex-row md:px-10 bg-white font-inter pt-16 md:pt-0 relative"
      >
        <div className="w-11/12 md:w-2/5 h-[650px] md:h-[597px] rounded-bl-[70px] md:rounded-bl-[55px] rounded-br-[120px] bg-[#0C3C5599] opacity-70 absolute top-0 right-4 md:right-5"></div>

        {/* Left Section */}
        <motion.div
          variants={fadeInUp}
          className="w-full md:w-8/12 flex flex-col justify-center items-center text-center md:items-start md:text-start p-5 z-10"
        >
          <motion.div whileHover={hoverEffect}>
            <h1 className="text-xl md:text-4xl font-normal text-white md:text-gray-900">
              Creating a Culture of <span className="text-white md:text-blue-600 font-bold">Trust</span> — One Connection, One Platform, One AI-Powered,
            </h1>
            <h2 className="text-xl md:text-4xl font-bold text-white md:text-blue-600 mt-2">
              Transparent & Accountable Financial Management
              <span className="text-white md:text-gray-900 font-normal"> at a Time.</span>
            </h2>
          </motion.div>
          <motion.p
            className="text-xs md:text-base mt-4 text-white text-opacity-70 md:text-gray-600 max-w-lg"
            whileHover={hoverEffect}
          >
            Revolutionizing financial management for the public sector with AI-driven transparency and accountability. Empowering institutions, ensuring integrity.
          </motion.p>
          <motion.button
            className="w-40 mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-blue-700 transition"
            whileHover={hoverEffect}
            onClick={() => router.push('/homePage')} 
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Right Section */}
        <motion.div
          variants={fadeInUp}
          className="w-full md:w-7/12 relative flex items-center justify-start md:justify-end"
        >
            <div className="w-4/5 md:w-full mr-20 flex justify-start md:justify-start">
              <div className="relative overflow-hidden rounded-lg">
                <Image 
                  src="/people.svg" 
                  alt="Business People" 
                  width={500} 
                  height={800} 
                  className="relative z-10" 
                />
              </div>
            </div>
            
            <motion.div 
              className="absolute top-2/4 right-6 w-[200px] bg-white p-4 rounded-lg z-20"
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
            >
              <ul className="text-black text-xs font-inter font-semibold">
                <motion.li className="mb-2 flex justify-between items-center" whileHover="hover" initial="initial">
                  <motion.span variants={textVariants}>Real Time Fund</motion.span> 
                  <motion.div variants={checkIconVariants}>
                    <FaCheckCircle />
                  </motion.div>
                </motion.li>
                
                <motion.li className="mb-2 flex justify-between items-center" whileHover="hover" initial="initial">
                  <motion.span variants={textVariants}>AI Powered</motion.span> 
                  <motion.div variants={checkIconVariants}>
                    <FaCheckCircle />
                  </motion.div>
                </motion.li>
                
                <motion.li className="flex justify-between items-center" whileHover="hover" initial="initial">
                  <motion.span variants={textVariants}>Transparency Report</motion.span> 
                  <motion.div variants={checkIconVariants}>
                    <FaCheckCircle />
                  </motion.div>
                </motion.li>
              </ul>
            </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}