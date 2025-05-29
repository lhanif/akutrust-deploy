'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AddPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('spend');
  const router = useRouter();

  const [formData, setFormData] = useState({
    namaProyek: '',
    lokasiProyek: '',
    deskripsi: '',
    idProyek: '#IDP01',
  });

  const [dokumenProyek, setDokumenProyek] = useState<File | null>(null);
  const [fotoProyek, setFotoProyek] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFotoProyek(e.target.files[0]);
    }
  };

  const handleDokumenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setDokumenProyek(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('nama_proyek', formData.namaProyek);
    data.append('lokasi_proyek', formData.lokasiProyek);
    data.append('deskripsi_proyek', formData.deskripsi);
    data.append('id_proyek', formData.idProyek);
    // data.append('status_proyek', "Belum");
    if (dokumenProyek) data.append('dokumen_proyek', dokumenProyek);
    if (fotoProyek) data.append('foto_proyek', fotoProyek);

    const res = await fetch('/api/addProject', {
      method: 'POST',
      body: data,
      credentials: 'include', // INI WAJIB
    });

    if (res.ok) {
      alert('Proyek berhasil ditambahkan!');
      router.push('/rab');
    } else {
      const error = await res.json();
      alert(`Gagal: ${error.message}`);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobile={false}
      />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <h1 className="text-lg font-semibold mb-2">Tambah Pelaporan Keuangan</h1>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-8 space-x-2">
          {['Proposal Proyek', 'Proposal RAB', 'Laporan Pertanggung Jawaban', 'Verifikasi'].map(
            (step, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-medium ${
                    index === 0 ? 'bg-[#1877AA]' : 'bg-gray-300'
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`${index === 0 ? 'font-semibold text-[#1877AA]' : 'text-gray-500'}`}
                >
                  {step}
                </span>
                {index !== 3 && <span className="text-gray-400">›</span>}
              </div>
            )
          )}
        </div>

        {/* Informasi Proyek */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-semibold text-sm mb-4">Informasi Proyek</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upload Foto */}
            <div className="border border-dashed border-gray-300 rounded-md h-40 flex items-center justify-center relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFotoChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="text-center text-[#1877AA] pointer-events-none">
                <Upload className="mx-auto mb-2" />
                <p className="text-sm">Unggah Foto</p>
                {fotoProyek && <p className="text-xs mt-1 text-gray-500">{fotoProyek.name}</p>}
              </div>
            </div>

            {/* Form Input */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nama Proyek<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="namaProyek"
                  value={formData.namaProyek}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Type here"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ID Proyek (Otomatis)</label>
                <input
                  type="text"
                  readOnly
                  value={formData.idProyek}
                  className="w-full bg-blue-100 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Lokasi Proyek</label>
                <textarea
                  name="lokasiProyek"
                  value={formData.lokasiProyek}
                  onChange={handleChange}
                  rows={1}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Type here"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Type here"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Dokumen Proposal */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="font-semibold text-sm mb-4">Dokumen Proposal Proyek</h2>
          <label className="block text-sm font-medium mb-2">
            Docs<span className="text-red-500">*</span>
          </label>
          <div className="border border-dashed border-gray-300 rounded-md h-40 flex items-center justify-center relative">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleDokumenChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="text-center text-[#1877AA] pointer-events-none">
              <Upload className="mx-auto mb-2" />
              <p className="text-sm">Unggah Dokumen</p>
              {dokumenProyek && <p className="text-xs mt-1 text-gray-500">{dokumenProyek.name}</p>}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            className="bg-[#1877AA] hover:bg-[#145f88] text-white text-sm px-6 py-2 rounded-md"
            onClick={handleSubmit}
          >
            Selanjutnya
          </button>
        </div>
      </main>
    </div>
  );
}
