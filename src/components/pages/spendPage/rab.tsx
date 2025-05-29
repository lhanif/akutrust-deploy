'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Project {
  _id: string;
  id_proyek: string;
}

interface Props {
  projects: Project[];
}

export default function RabPage({ projects }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('spend');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    if (!selectedProjectId) {
      alert('Pilih proyek terlebih dahulu!');
      return;
    }

    if (!selectedFile) {
      alert('Pilih file dokumen terlebih dahulu!');
      return;
    }

    setUploading(true);

    try {
      // FormData untuk upload file + id_proyek ke backend API
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('id_proyek', selectedProjectId);

      // Ganti URL ini sesuai API kamu
      const res = await fetch('/api/addRAB', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload gagal');
      }

      alert('Dokumen berhasil diupload');
      router.push('/lpj');
    } catch (error) {
      alert('Error saat upload: ' + error);
    } finally {
      setUploading(false);
    }
  }

  // Handle file input change
  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  }

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
        <h1 className="text-lg font-semibold mb-2">Tambah Pelaporan Keuangan</h1>

        {/* Step Wizard */}
        <div className="flex items-center text-sm text-gray-600 mb-8 space-x-2">
          {['Proposal Proyek', 'Proposal RAB', 'Laporan Pertanggung Jawaban', 'Verifikasi'].map(
            (step, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-medium ${
                    index === 1 ? 'bg-[#1877AA]' : index < 1 ? 'bg-[#145f88]' : 'bg-gray-300'
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`${
                    index === 1 ? 'font-semibold text-[#1877AA]' : 'text-gray-500'
                  }`}
                >
                  {step}
                </span>
                {index !== 3 && <span className="text-gray-400">›</span>}
              </div>
            )
          )}
        </div>

        {/* Dropdown Pilih Proyek */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <label className="block text-sm font-medium mb-2">
            Pilih Proyek<span className="text-red-500">*</span>
          </label>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="w-full border rounded-md p-2 text-sm"
          >
            <option value="">-- Pilih proyek --</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.id_proyek}
              </option>
            ))}
          </select>
        </div>

        {/* Card Dokumen Proposal RAB */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="font-semibold text-sm mb-4">Dokumen Proposal RAB</h2>
          <label className="block text-sm font-medium mb-2">
            Excel<span className="text-red-500">*</span>
          </label>
          <div className="border border-dashed border-gray-300 rounded-md h-40 flex items-center justify-center">
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-center text-[#1877AA] w-full h-full flex flex-col items-center justify-center"
            >
              <Upload className="mx-auto mb-2" />
              {selectedFile ? (
                <p className="text-sm truncate max-w-xs">{selectedFile.name}</p>
              ) : (
                <p className="text-sm">Unggah Dokumen</p>
              )}
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".xls,.xlsx,.csv"
              onChange={onFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            className="bg-[#0F4C75] hover:bg-[#0d3d61] text-white text-sm px-6 py-2 rounded-md"
            onClick={handleSubmit}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      </main>
    </div>
  );
}
