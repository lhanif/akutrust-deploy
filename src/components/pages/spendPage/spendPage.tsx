"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Bell, User, Menu as MenuIcon, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { IoDownload } from 'react-icons/io5';
import { Sidebar } from '@/components/sidebar';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import FeedbackPopup from '@/components/pages/spendPage/feedback'; 
import { useRouter } from 'next/navigation';

  type Props = {
    projects: {
      _id: string;
      id_proyek: string;
      deskripsi_proyek: string;
      lokasi_proyek: string;
      foto_proyek: string;
      status_proyek: string;
    }[];
  };

const SpendPage = ({projects}:Props) => {
  const [activeTab, setActiveTab] = useState('spend');
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [activeTabs, setActiveTabs] = useState('semua');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('7 hari terakhir');
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // const handleNavigateToDetail = (projectId: string) => {
  //   router.push(`/spend/detail/${projectId}`);
  // };

  const tabs = [
    // { id: 'semua', label: 'Semua' },
    { id: 'belum', label: 'Belum diverifikasi' },
    // { id: 'sedang', label: 'Sedang diverifikasi' },
    { id: 'telah', label: 'Telah diverifikasi' },
    // { id: 'ditolak', label: 'Ditolak' }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Sample budget data
  const budgetData = [
    { category: 'Perbaikan Bangunan', amount: 350000000, color: 'bg-[#1877AA]' },
    { category: 'Pembangunan Bangunan', amount: 100000000, color: 'bg-[#78BFE5]' },
    { category: 'Lainnya', amount: 50000000, color: 'bg-[#BCDFF2]' }
  ];
  
  type Project = {
    date: string;
    status: string;
    id: string;
  };
  
  // const projects: Project[] = [
  //   { date: '17 Mar 25', status: 'Belum', id: '#IDPO1' },
  //   { date: '17 Mar 25', status: 'Belum', id: '#IDPO2' },
  //   { date: '17 Mar 25', status: 'Belum', id: '#IDPO3' },
  //   { date: '17 Mar 25', status: 'Belum', id: '#IDPO4' },
  // ];

  // Calculate total budget
  const totalBudget = budgetData.reduce((sum, item) => sum + item.amount, 0);

  // Sample feedback data for the popup
  const feedbackData = {
    totalFeedback: 200,
    growth: 40,
    averageRating: 4.0,
    ratings: [
      { stars: 5, count: 25 },
      { stars: 4, count: 140 },
      { stars: 3, count: 20 },
      { stars: 2, count: 10 },
      { stars: 1, count: 5 }
    ],
    comments: [
      {
        id: 1,
        author: 'Anonim #1',
        rating: 4,
        comment: 'Sudah cukup detail dan transparan ya.. tapi sayang ada beberapa bahan baku yang sebenarnya bisa dibeli lebih murah. But ya mungkin pemerintah mau yang terbaik ya buat rakyatnya haha'
      },
      {
        id: 2,
        author: 'Anonim #2',
        rating: 4,
        comment: 'Jujur aku cukup terkesima sih dengan alur pelaporan ini, good deh'
      },
      {
        id: 3,
        author: 'Anonim #3',
        rating: 4,
        comment: 'Ini beneran transparan kan ya? gaada yang ditilep tilep?'
      }
    ]
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className='lg:w-56 hidden md:block'></div>
      <Sidebar 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobile
        />

      <div className='w-full'>
        {/* mobile navbar */}
        <div className="fixed top-0 w-full bg-white border-b border-gray-200 flex justify-between items-center py-2 px-4 z-20 md:hidden">
          <p className="font-inter font-semibold text-base">Spend</p>
          <div className="flex items-center">
            <button className="p-2 rounded-md bg-[#1877AA] mr-2 hover:bg-[#1565A0]">
              <Bell size={18} className="text-white" />
            </button>
            <button className="p-2 rounded-md bg-[#1877AA] mr-2 hover:bg-[#1565A0]">
              <User size={18} className="text-white" />
            </button>
            <button className="p-2 rounded-md hover:bg-blue-50" onClick={toggleSidebar}>
              <MenuIcon size={18} />
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 bg-gray-50 pt-14 md:pt-0">
          {/* Desktop navbar */}
          <div className="hidden md:flex bg-white border-b border-gray-200 justify-between items-center py-2 px-6">
            <p className="font-inter font-semibold text-xl">Spend</p>
            <div className="relative">
              <select className="appearance-none border border-gray-300 rounded-md py-2 px-4 pr-8 bg-white">
                  <option>Tahunan</option>
                  <option>Bulanan</option>
                  <option>Mingguan</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <ChevronDown className="text-gray-500" stroke="currentColor" />
              </div>
            </div>
          </div>

        <div className="p-3 md:p-6 bg-gray-50 min-h-screen">
            {/* Budget Allocation Section */}
            <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-4 md:mb-8">
                <p className="font-inter font-normal text-black mb-4">Anggaran dikeluarkan:</p>
                
                <div className="w-full h-10 md:h-12 rounded-lg overflow-hidden flex mb-4 md:mb-6">
                {budgetData.map((budget, index) => (
                    <div 
                      key={index} 
                      className={`${budget.color} h-3/4 mr-3 rounded-lg`} 
                      style={{ width: `${(budget.amount / totalBudget) * 100}%` }}
                    />
                ))}
                </div>
                
                <div className="space-y-2 md:space-y-3">
                {budgetData.map((budget, index) => (
                  <div key={index} className="w-full md:w-4/6 flex items-center justify-between md:justify-start">
                    <div className='flex items-center w-1/2 md:w-3/6'>
                      <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${budget.color} mr-2 md:mr-3`} />
                      <span className="text-xs md:text-sm text-black truncate">{budget.category}</span>
                    </div>
                    <span className="text-xs md:text-sm text-black font-medium">
                      Rp. {(budget.amount / 1000000).toFixed(0)}.000.000
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Reports Section */}
            <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-800 font-medium mb-3">Pelaporan Keuangan</p>
                <div className='w-full h-[1px] bg-[#E3E8EF] mb-6'></div>
                
                {/* Filter Controls */}
                <div className="flex lg:flex-row flex-col gap-4 mb-4 items-start lg:items-center text-sm">
                  <div className='flex'>
                    <div className="flex space-x-2">
                      <div className="relative w-36" ref={dropdownRef}>
                        <div
                          className="border border-gray-300 rounded-l-md py-1 px-4 pr-8 bg-white cursor-pointer flex justify-between items-center"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                          <span className="block truncate">{selectedPeriod}</span>
                          <ChevronDown 
                            className={`absolute right-0 text-gray-500 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} 
                            stroke="currentColor"
                          />
                        </div>
                        
                        {isDropdownOpen && (
                          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                            {['7 hari terakhir', '30 hari terakhir', '12 bulan terakhir'].map((period) => (
                              <div
                                key={period}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  setSelectedPeriod(period);
                                  setIsDropdownOpen(false);
                                }}
                              >
                                {period}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="relative mr-10">
                      <DatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => {
                          setDateRange(update);
                          setIsDatePickerOpen(false);
                        }}
                        className="w-36 border border-gray-300 rounded-r-md py-1 px-1 bg-white"
                        placeholderText="Select date range"
                        dateFormat="dd MMM"
                        showMonthYearPicker={false}
                        open={isDatePickerOpen}
                        onClickOutside={() => setIsDatePickerOpen(false)}
                      />
                      <div 
                        className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer"
                        onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                      >
                        <ChevronDown 
                          className={`text-gray-500 transition-transform ${isDatePickerOpen ? 'transform rotate-180' : ''}`} 
                          stroke="currentColor" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex max-w-4xl border rounded-lg overflow-hidden whitespace-nowrap">
                    {tabs.map((tab, index) => (
                      <div key={tab.id} className="flex flex-1 min-w-fit">
                        <button
                          className={`px-1 lg:px-3 py-1.5 lg:text-xs text-[9px] text-center font-medium transition-colors truncate ${
                          activeTabs === tab.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-black hover:bg-gray-50'
                          }`}
                          onClick={() => setActiveTabs(tab.id)}
                        >
                          {tab.label}
                        </button>
                        {index < tabs.length - 1 && (
                          <div className="w-px bg-gray-300 self-stretch"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Table */}
                <div className="w-full overflow-x-auto">
                  <table className="w-full">
                    {/* Table Header */}
                    <thead>
                      <tr className="w-full bg-blue-50">
                        <th className="px-4 py-3 text-left text-xs font-medium font-inter text-black rounded-l-lg">No</th>
                        <th className="px-4 py-3 text-left text-xs font-medium font-inter text-black">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium font-inter text-black">ID Proyek</th>
                        <th className="px-4 py-3 text-left text-xs font-medium font-inter text-black">Dokumen</th>
                        <th className="px-4 py-3 text-left text-xs font-medium font-inter text-black">Feedback</th>
                        <th className="px-4 py-3 w-8 rounded-r-lg"></th>
                      </tr>
                    </thead>
                    
                    {/* Table Body */}
                    <tbody>
                      {projects.map((project, index) => (
                        <tr key={project._id} className="border-b border-gray-200">
                          <td className="px-4 py-4 text-xs text-black font-inter font-medium">{index + 1}</td>
                          <td className="px-4 py-4 text-xs text-black font-inter font-medium">{project.status_proyek}</td>
                          <td className="px-4 py-4 text-xs text-black font-inter font-medium">{project.id_proyek}</td>
                          <td className="px-4 py-4">
                            <button className="px-3 py-2 bg-[#1877AA] text-white text-sm rounded flex items-center space-x-2">
                              <span>Unduh</span>
                              <IoDownload size={16} className="text-white" />
                            </button>
                          </td>
                          <td className="px-4 py-4">
                            <button 
                              className="px-3 py-2 bg-[#1877AA] text-white text-sm rounded"
                              onClick={() => setShowFeedbackPopup(true)}
                            >
                              Akses
                            </button>
                          </td>
                          <td className="px-4 py-4">
                            <button 
                              // onClick={() => handleNavigateToDetail(project.id)}
                              onClick={() => router.push('/detailLaporanPage')} 
                              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                              <ChevronRight className="text-gray-400 w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-end mt-5 mr-2">
                      <button 
                      className="bg-[#1877AA] text-white p-2 rounded-full"
                      onClick={() => router.push('/addPage')}>
                        <Plus size={24} />
                      </button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Popup */}
      <FeedbackPopup 
        isOpen={showFeedbackPopup}
        onClose={() => setShowFeedbackPopup(false)}
        data={feedbackData}
      />
    </div>
  );
};

export default SpendPage;
