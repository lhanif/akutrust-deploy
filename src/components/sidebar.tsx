'use client';

import React from 'react';
import Image from 'next/image';
import { Home, DollarSign, FileText, Package, HelpCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobile: boolean;
}

export const Sidebar = ({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }: SidebarProps) => {
  const router = useRouter();

  const handleHomeClick = () => {
    setActiveTab('home');
    router.push('/homePage');
  };

  const handleSpendClick = () => {
    setActiveTab('spend');
    router.push('/spendPage');
  };

  const handleBudgetClick = () => {
    setActiveTab('budget');
    router.push('/budgetAI');
  };

  const handleLogoutClick = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
      credentials: "include", // Agar cookie dikirim
    });

    const data = await res.json();
    if (data.success) {
      // Arahkan pengguna ke landing page setelah logout berhasil
      router.push('/landingPage');
    } else {
      alert("Logout gagal, coba lagi.");
    }
  };

  
  return (
    <div className={`fixed top-0 right-0 h-full bg-white border-l border-gray-200 w-60 z-40 transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 md:left-0 md:w-48 md:z-10`}>
      <div className="flex justify-between items-center p-4 border-b border-gray-200 md:border-b-0">
        <div className="flex items-center">
          <Image src="/logo.svg" width={100} height={100} alt="Logo" className="rounded-md" />
        </div>
        <button className="p-1 md:hidden" onClick={() => setSidebarOpen(false)}>
          <X size={18} />
        </button>
      </div>

      <div className="p-2 text-sm font-medium">Menu</div>

      <div className="flex-1">
        {/* Home */}
        <div className="px-4 py-2 flex items-center cursor-pointer" onClick={handleHomeClick}>
          <div className={`w-[99%] py-2 pl-2 flex items-center cursor-pointer ${activeTab === 'home' ? 'bg-[#1877AA] text-white rounded-md' : 'hover:bg-gray-100'}`}>
            <Home size={18} className={`mr-2 ${activeTab === 'home' ? 'text-white' : 'text-gray-400'}`} />
            <span className='font-inter font-medium text-xs'>Home</span>
          </div>
        </div>

        {/* Spend */}
        <div className="px-4 py-2 flex items-center cursor-pointer" onClick={handleSpendClick}>
          <div className={`w-[99%] py-2 pl-2 flex items-center cursor-pointer ${activeTab === 'spend' ? 'bg-[#1877AA] text-white rounded-md' : 'hover:bg-gray-100'}`}>
            <DollarSign size={18} className={`mr-2 ${activeTab === 'spend' ? 'text-white' : 'text-gray-400'}`} />
            <span className='font-inter font-medium text-xs'>Spend</span>
          </div>
        </div>

        {/* BudgetAI */}
        <div className="px-4 py-2 flex items-center cursor-pointer" onClick={handleBudgetClick}>
          <div className={`w-[99%] py-2 pl-2 flex items-center cursor-pointer ${activeTab === 'budget' ? 'bg-[#1877AA] text-white rounded-md' : 'hover:bg-gray-100'}`}>
            <FileText size={18} className={`mr-2 ${activeTab === 'budget' ? 'text-white' : 'text-gray-400'}`} />
            <span className='font-inter font-medium text-xs'>BudgetAI</span>
          </div>
        </div>

        {/* General */}
        <div className="p-2 text-sm font-medium mt-4">General</div>

        {/* Package */}
        <div className="px-4 py-2 flex items-center cursor-pointer" onClick={() => setActiveTab('package')}>
          <div className={`w-[99%] py-2 pl-2 flex items-center cursor-pointer ${activeTab === 'package' ? 'bg-[#1877AA] text-white rounded-md' : 'hover:bg-gray-100'}`}>
            <Package size={18} className={`mr-2 ${activeTab === 'package' ? 'text-white' : 'text-gray-400'}`} />
            <span className='font-inter font-medium text-xs'>Package Price</span>
          </div>
        </div>

        {/* Help */}
        <div className="px-4 py-2 flex items-center cursor-pointer" onClick={() => setActiveTab('help')}>
          <div className={`w-[99%] py-2 pl-2 flex items-center cursor-pointer ${activeTab === 'help' ? 'bg-[#1877AA] text-white rounded-md' : 'hover:bg-gray-100'}`}>
            <HelpCircle size={18} className={`mr-2 ${activeTab === 'help' ? 'text-white' : 'text-gray-400'}`} />
            <span className='font-inter font-medium text-xs'>Help and Support</span>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="w-full absolute bottom-4 flex justify-center" onClick={handleLogoutClick}>
        <button className="w-4/5 bg-red-200 text-red-500 rounded-md py-2">
          Logout
        </button>
      </div>
    </div>
  );
};
