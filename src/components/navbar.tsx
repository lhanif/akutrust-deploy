"use client"

import React, { useState, useEffect } from 'react';
import  Link  from 'next/link';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Partner', path: '/partnership', sectionId: 'partner-section' },
    { name: 'Features & Services', path: '/features', sectionId: 'features-section' },
  ];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      setIsMenuOpen(false);
      const navHeight = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav
        className={clsx(
          'font-gilroy',
          'fixed left-0 top-0 z-30 w-full',
          'transition-all duration-300',
          isScrolled ? 'bg-black/30 backdrop-blur-md' : 'lg:bg-transparent',
          'flex items-center justify-between px-6 py-4 lg:px-12',
        )}
      >
        {/* Logo */}
        <motion.div 
          className={`transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
          initial={{ scale: 1 }}
          whileHover={{
            scale: 1.1,
            transition: {
              type: 'spring',
              stiffness: 400,
              damping: 10,
            },
          }}
          animate={{
            y: [0, -2, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          <Image src="/logo.svg" alt="logo" width={300} height={89} sizes="250px" priority className="h-11 w-auto" />
        </motion.div>

        {/* Hamburger menu button */}
        <div className={`flex items-center transition-opacity duration-300 lg:hidden ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-white focus:outline-none" aria-label="Menu Button">
            <Menu className="h-8 w-8" />
          </button>
        </div>

        {/* Desktop Menu Items */}
        <div className="hidden items-center space-x-5 lg:flex">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => scrollToSection(item.sectionId)}
              className="cursor-pointer text-sm font-medium text-white hover:text-[#1877AA]"
            >
              {item.name}
            </button>
          ))}
          <div className="flex gap-5">
            <div>
              <Link href="/login">
                <Button className="h-11 rounded-lg bg-[#1877AA] py-2 px-8 text-white hover:bg-[#155d8a]">
                  Login
                </Button>
              </Link>
            </div>
        
            <div>
              <Link href="/register">
                <Button className="flex h-11 items-center space-x-2 rounded-xl border border-[#FFFFFF] py-2 px-8 bg-transparent text-sm text-white hover:bg-[#FFFFFF] hover:text-[#1877AA]">
                  <span>Sign Up</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div
          className={clsx(
            'fixed inset-0 z-40 min-h-screen w-full',
            'flex flex-col items-center justify-start',
            'bg-black bg-opacity-30 backdrop-blur-md',
            'overflow-y-auto px-4 pt-20',
          )}
        >
          <button className="z-60 absolute right-6 top-6 text-white" onClick={() => setIsMenuOpen(false)} aria-label="Close Button">
            <X className="h-7 w-7" />
          </button>

          {/* Mobile Menu Items */}
          <div className="flex w-full flex-col items-center space-y-6">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.sectionId)}
                className="text-lg font-medium text-white hover:text-[#1877AA]"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Action Buttons */}
          <div className="flex w-full flex-col items-center space-y-4 px-8 pt-8">
            <Link href="/login" className="w-full flex justify-center">
              <Button
                className="h-12 w-2/4 rounded-lg bg-[#1877AA] text-white hover:bg-[#155d8a]"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Button>
            </Link>

            <Link href="/register" className="w-full flex justify-center">
              <Button
                className="flex h-12 w-2/4 items-center space-x-2 rounded-xl border-2 border-[#1877AA] bg-transparent px-4 py-2 text-sm text-white hover:bg-[#1877AA] hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Sign Up</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;