'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { useRouter } from 'next/navigation';

export default function VerifikasiPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('spend');
  const router = useRouter();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobile
      />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          Tambah Pelaporan Keuangan
        </h1>

        {/* Step Wizard */}
        <div className="flex items-center space-x-4 mb-8">
          {['Proposal Proyek', 'Proposal RAB', 'Laporan Pertanggung Jawaban', 'Verifikasi'].map((step, index) => (
            <div key={step} className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                index === 3 ? 'bg-[#1877AA]' : index < 3 ? 'bg-[#5ba0ca]' : 'bg-gray-300'
              }`}>
                {index + 1}
              </div>
              <span className={`text-sm ${index === 3 ? 'text-black font-medium' : 'text-gray-500'}`}>
                {step}
              </span>
              {index < 3 && <span className="text-gray-400">{'>'}</span>}
            </div>
          ))}
        </div>

        {/* Detail Status Section */}
        <div className="bg-white rounded-lg p-6 shadow mb-6">
          <h2 className="text-md font-semibold text-gray-700 mb-6">Detail Status</h2>

          <ol className="relative border-l border-gray-300">
            {/* Step 1 - Aktif */}
            <li className="mb-10 ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-[#1877AA] rounded-full ring-8 ring-white text-white text-sm font-semibold">
                1
              </span>
              <h3 className="text-sm font-semibold text-[#1877AA]">Verifikator Internal</h3>
              <div className="mt-2 bg-gray-100 rounded p-4 text-sm text-gray-800">
                <p>
                  Tanggal Inspeksi: <span className="font-semibold">20 Maret 2025</span>
                </p>
                <p>Catatan: -</p>
              </div>
            </li>

            {/* Step 2 */}
            <li className="mb-10 ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full ring-8 ring-white text-white text-sm font-semibold">
                2
              </span>
              <h3 className="text-sm font-medium text-gray-600">Verifikator Dokumen</h3>
            </li>

            {/* Step 3 */}
            <li className="mb-10 ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full ring-8 ring-white text-white text-sm font-semibold">
                3
              </span>
              <h3 className="text-sm font-medium text-gray-600">Verifikator Lapangan</h3>
            </li>

            {/* Step 4 */}
            <li className="mb-10 ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full ring-8 ring-white text-white text-sm font-semibold">
                4
              </span>
              <h3 className="text-sm font-medium text-gray-600">Ditolak/Diterima</h3>
            </li>

            {/* Step 5 */}
            <li className="mb-10 ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full ring-8 ring-white text-white text-sm font-semibold">
                5
              </span>
              <h3 className="text-sm font-medium text-gray-600">Revisi</h3>
            </li>

            {/* Step 6 */}
            <li className="ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full ring-8 ring-white text-white text-sm font-semibold">
                6
              </span>
              <h3 className="text-sm font-medium text-gray-600">Hasil Verifikasi</h3>
            </li>
          </ol>
        </div>


        {/* Tombol Selesai */}
        <div className="flex justify-end mt-8">
          <button
            className="bg-[#1877AA] hover:bg-[#145f88] text-white text-sm px-6 py-2 rounded-md"
            onClick={() => router.push('/spendPage')}
          >
            Selesai
          </button>
        </div>
      </main>
    </div>
  );
}
