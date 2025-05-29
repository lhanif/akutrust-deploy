"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const hoverEffect = {
  scale: 1.05,
  transition: { duration: 0.3 },
};

export function FeaturesSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="px-6 md:px-20 py-12 bg-white text-center"
    >
      <h3 className="text-black font-inter text-base uppercase font-semibold">
        Our Features and Services
      </h3>
      <h2 className="text-2xl md:text-3xl font-semibold text-black opacity-60 mt-2">
        Transforming Public Fund Management with <span className="text-[#1877AA]">AI-Powered Transparency & Efficiency</span>
      </h2>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <motion.div
          className="bg-white border-[1px] border-black border-opacity-50 rounded-lg shadow-md p-6"
          variants={fadeInUp}
          whileHover={hoverEffect}
        >
          <Image src="/feature1.svg" alt="Real Time Fund Monitoring" width={300} height={200} className="w-full rounded" />
          <h3 className="text-blue-600 font-bold text-lg mt-4">Real Time Fund Monitoring</h3>
          <p className="text-gray-600 text-sm mt-2">Pantau setiap transaksi dan penggunaan dana secara langsung & transparan</p>
        </motion.div>
        {/* Feature 2 */}
        <motion.div
          className="bg-white border-[1px] border-black border-opacity-50 rounded-lg shadow-md p-6"
          variants={fadeInUp}
          whileHover={hoverEffect}
        >
          <Image src="/feature2.svg" alt="BudgetAI" width={300} height={200} className="w-full rounded" />
          <h3 className="text-blue-600 font-bold text-lg mt-4">BudgetAI – Smart Financial Planning</h3>
          <p className="text-gray-600 text-sm mt-2">AI membantu menyusun rencana keuangan yang efisien & akurat berbasis data pasar terkini</p>
        </motion.div>
        {/* Feature 3 */}
        <motion.div
          className="bg-white border-[1px] border-black border-opacity-50 rounded-lg shadow-md p-6"
          variants={fadeInUp}
          whileHover={hoverEffect}
        >
          <Image src="/feature3.svg" alt="Public Transparency Reports" width={300} height={200} className="w-full rounded" />
          <h3 className="text-blue-600 font-bold text-lg mt-4">Public Transparency Reports</h3>
          <p className="text-gray-600 text-sm mt-2">Masyarakat dapat mengakses laporan dan grafik keuangan yang tertampil pada dashboard</p>
        </motion.div>
      </div>
    </motion.section>
  );
}