"use client";

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, User, Plus, CheckCircle, Clipboard, Menu as MenuIcon, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import { Sidebar } from '@/components/sidebar';

const data = [
  { name: 'Jan', value: 100 },
  { name: 'Feb', value: 250 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 300 },
  { name: 'Mei', value: 400 },
  { name: 'Jun', value: 750 },
  { name: 'Jul', value: 500 },
  { name: 'Agu', value: 450 },
  { name: 'Oct', value: 400 },
  { name: 'Nov', value: 450 },
  { name: 'Des', value: 500 },
];

const projects = [
  { id: 1, idProyek: '#IDP01', description: 'Perbaikan Bangunan', location: 'Puskesmas Gayungan', image: "/proyek1.png" },
];

type Props = {
  user : {name:string} | null;
  projects: {
    _id: string;
    id_proyek: string;
    deskripsi_proyek: string;
    lokasi_proyek: string;
    foto_proyek: string;
  }[];
}

const HomePage = ({ user, projects }: Props) => {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
          <div className="flex flex-col items-start">
            <div className="text-xs font-inter font-normal">Instansi</div>
            <div className="font-inter font-semibold text-base"> {user?.name ?? ""}</div>
          </div>
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
            <div>
              <div className="text-sm text-gray-500">Instansi</div>
              <div className="font-medium">{user?.name ?? ""}</div>
            </div>
            <div className="flex">
              <button className="p-2 rounded-md bg-[#1877AA] mr-2 hover:bg-[#1565A0]">
                <Bell size={20} className="text-white" fill='white' />
              </button>
              <button className="p-2 rounded-md bg-[#1877AA] mr-2 hover:bg-[#1565A0]">
                <User size={20} className="text-white" fill='white' />
              </button>
            </div>
          </div>
          
          {/* Dashboard Content */}
          <div className="p-4">
            <div className="flex flex-col md:flex-row md:mx-6">
              {/* Budget Section */}
              <div className="w-full md:w-1/2 md:px-2 mb-4 md:mb-0">
                <div className="bg-white rounded-md shadow-sm p-4 h-full">
                  <div className="text-sm font-inter font-normal">Anggaran digunakan 2024</div>
                  <div className="text-2xl font-semibold font-inter text-blue-500 mb-2">Rp. 8.500.000.000</div>
                  <div className="h-32 md:h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                        <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
                        <XAxis dataKey="name" fontSize={10} />
                        <YAxis fontSize={10} />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {/* Quick Action */}
              <div className="w-full md:w-1/2 md:px-2">
                <div className="bg-[#E9F4FB] rounded-md shadow-sm p-4 mb-4">
                  <div className="text-sm font-medium font-inter mb-4">Quick Action</div>
                  <div className="flex justify-between">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 md:h-12 md:w-12 bg-[#12597F] text-white rounded-md flex items-center justify-center mb-2">
                        <Plus size={18} />
                      </div>
                      <p className="text-xs text-center font-inter font-medium">Tambah Anggaran</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 md:h-12 md:w-12 bg-[#12597F] text-white rounded-md flex items-center justify-center mb-2">
                        <Clipboard size={18} />
                      </div>
                      <p className="text-xs text-center font-inter font-medium">Tambah Rencana</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 md:h-12 md:w-12 bg-[#12597F] text-white rounded-md flex items-center justify-center mb-2">
                        <ThumbsUp size={18} />
                      </div>
                      <p className="text-xs text-center font-inter font-medium">Sudah Terealisasi</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 md:h-12 md:w-12 bg-[#12597F] text-white rounded-md flex items-center justify-center mb-2">
                        <CheckCircle size={18} />
                      </div>
                      <p className="text-xs text-center font-inter font-medium">Sudah Terverifikasi</p>
                    </div>
                  </div>
                </div>
                
                {/* Status */}
                {/* <div className="bg-white rounded-md shadow-sm p-4">
                  <div className="text-black text-sm font-medium font-inter mb-2 border-b border-[#E3E8EF]">Status</div>
                  <div className="flex items-start border p-4 rounded-lg">
                    <Image src="/status.png" width={80} height={60} alt="Building" className="rounded-md mr-3" />
                    <div>
                      <div className="font-bold text-base">4 Proyek Menunggu Approval Verifikasi</div>
                      <div className="text-xs font-medium font-inter text-gray-500">Diajukan sejak: 14/03/2025</div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Project List */}
          <div className="bg-white rounded-md shadow-sm mx-4 lg:mx-12 p-4 mb-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <div className="font-medium">Pengeluaran</div>
              <div className="flex items-center text-xs">
                <span className="mr-2">Sort by</span>
                <button className="p-1">
                  <Image src="/Filter.png" width={15} height={15} alt="Building" />
                </button>
              </div>
            </div>
            
            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-left font-medium">No.</th>
                    <th className="py-3 px-4 text-left font-medium">IDProyek</th>
                    <th className="py-3 px-4 text-left font-medium">Foto Proyek</th>
                    <th className="py-3 px-4 text-left font-medium">Deskripsi Proyek</th>
                    <th className="py-3 px-4 text-left font-medium">Lokasi Proyek</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr key={project._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4">{index+1}</td>
                      <td className="py-3 px-4">{project.id_proyek}</td>
                      <td className="py-3 px-4">
                        <Image src={project.foto_proyek} width={80} height={50} alt="Project" className="rounded-md" />
                      </td>
                      <td className="py-3 px-4">{project.deskripsi_proyek}</td>
                      <td className="py-3 px-4">{project.lokasi_proyek}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Mobile Table */}
            <div className="md:hidden">
              <div className="grid grid-cols-5 gap-2 py-2 text-xs font-medium border-b border-gray-200">
                <div>No.</div>
                <div>IDProyek</div>
                <div>Foto Proyek</div>
                <div>Deskripsi Proyek</div>
                <div>Lokasi Proyek</div>
              </div>
              {projects.map((project,index) => (
                <div key={project._id} className="grid grid-cols-5 gap-2 py-2 text-xs border-b border-gray-200">
                  <div>{index+1}</div>
                  <div>{project.id_proyek}</div>
                  <div>
                    <Image src={project.foto_proyek} width={40} height={30} alt={project.deskripsi_proyek} className="rounded-md" />
                  </div>
                  <div className="truncate">{project.deskripsi_proyek}</div>
                  <div className="truncate">{project.lokasi_proyek}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;