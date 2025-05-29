'use client';

import React, { useRef, useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LPJPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('spend');
  const [docFileName, setDocFileName] = useState('');
  const [zipFileName, setZipFileName] = useState('');
  const docInputRef = useRef<HTMLInputElement>(null);
  const zipInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocFileName(e.target.files[0].name);
      // Implementasi upload file ke server bisa ditambahkan di sini
    }
  };

  const handleZipUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setZipFileName(e.target.files[0].name);
      // Implementasi upload file ke server bisa ditambahkan di sini
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobile={false}
      />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          Tambah Pelaporan Keuangan
        </h1>

        {/* Step Wizard */}
        <div className="flex items-center space-x-4 mb-8">
          {['Proposal Proyek', 'Proposal RAB', 'Laporan Pertanggung Jawaban', 'Verifikasi'].map(
            (step, index) => (
              <div key={step} className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                    index === 2 ? 'bg-[#1877AA]' : index < 2 ? 'bg-[#5ba0ca]' : 'bg-gray-300'
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-sm ${
                    index === 2 ? 'text-black font-medium' : 'text-gray-500'
                  }`}
                >
                  {step}
                </span>
                {index < 3 && <span className="text-gray-400">{'>'}</span>}
              </div>
            )
          )}
        </div>

        {/* Dokumen Pertanggung Jawaban */}
        <div className="bg-white rounded-lg p-6 shadow mb-6">
          <h2 className="text-md font-semibold text-gray-700 mb-4">
            Dokumen Pertanggung Jawaban
          </h2>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Docs<span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept=".doc,.docx,.pdf"
            className="hidden"
            ref={docInputRef}
            onChange={handleDocUpload}
          />
          <div
            className="border border-dashed border-gray-300 rounded-md w-full h-52 flex justify-center items-center text-gray-400 text-sm cursor-pointer"
            onClick={() => docInputRef.current?.click()}
          >
            <Upload className="w-5 h-5 mr-2" />
            <span>{docFileName || 'Unggah Dokumen'}</span>
          </div>
        </div>

        {/* Dokumen Bukti Realisasi */}
        <div className="bg-white rounded-lg p-6 shadow mb-6">
          <h2 className="text-md font-semibold text-gray-700 mb-4">
            Dokumen Bukti Realisasi
          </h2>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Zip<span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept=".zip"
            className="hidden"
            ref={zipInputRef}
            onChange={handleZipUpload}
          />
          <div
            className="border border-dashed border-gray-300 rounded-md w-full h-52 flex justify-center items-center text-gray-400 text-sm cursor-pointer"
            onClick={() => zipInputRef.current?.click()}
          >
            <Upload className="w-5 h-5 mr-2" />
            <span>{zipFileName || 'Unggah Dokumen'}</span>
          </div>
        </div>

        {/* Tombol Selanjutnya */}
        <div className="flex justify-end mt-8">
          <button
            className="bg-[#1877AA] hover:bg-[#145f88] text-white text-sm px-6 py-2 rounded-md"
            onClick={() => router.push('/verifikasi')}
          >
            Selanjutnya
          </button>
        </div>
      </main>
    </div>
  );
}
