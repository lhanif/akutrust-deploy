"use client";

import React, { useState } from 'react';
import { ArrowLeft, Menu as MenuIcon } from 'lucide-react';
import { Sidebar } from '@/components/sidebar';
import { IoDownload } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const DetailPage = () => {
    const [activeTab, setActiveTab] = useState('spend');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const project = {
        id: "#IDP01",
        date: "17 Maret 2025",
        image: "/idp1Picture.png",
        status: "Belum Diverifikasi"
    };

    const steps = [
        {
            id: 1,
            title: "Verifikator Internal",
            isActive: true,
            isCompleted: true,
            details: {
                inspectionDate: "20 Maret 2025",
                notes: "-"
            }
        },
        {
            id: 2,
            title: "Verifikator Dokumen",
            isActive: false,
            isCompleted: false
        },
        {
            id: 3,
            title: "Verifikator Lapangan",
            isActive: false,
            isCompleted: false
        },
        {
            id: 4,
            title: "Ditolak/Diterima",
            isActive: false,
            isCompleted: false
        },
        {
            id: 5,
            title: "Revisi",
            isActive: false,
            isCompleted: false
        },
        {
            id: 6,
            title: "Hasil Verifikasi",
            isActive: false,
            isCompleted: false
        }
    ];

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
                setActiveTab={setActiveTab} isMobile={false}            />

            <div className='w-full'>
                {/* mobile navbar */}
                <div className="fixed top-0 w-full bg-white border-b border-gray-200 flex justify-between items-center py-2 px-4 z-20 md:hidden">
                    <div className="flex items-center gap-2">
                        <ArrowLeft size={17} className="text-gray-500 cursor-pointer"  onClick={() => router.back()}/>
                        <p className="font-inter font-semibold text-base">Pelaporan Keuangan</p>
                    </div>
                    <div className="flex items-center">
                        <button className="p-2 rounded-md hover:bg-blue-50" onClick={toggleSidebar}>
                            <MenuIcon size={18} />
                        </button>
                    </div>
                </div>
                
                {/* Main Content */}
                <div className="flex-1 bg-gray-50 pt-14 md:pt-0">
                    {/* Desktop navbar */}
                    <div className="hidden md:flex bg-white border-b border-gray-200 justify-start gap-5 items-center py-5 px-6">
                        <ArrowLeft size={20} className="text-gray-500 cursor-pointer"  onClick={() => router.back()}/>
                        <p className="font-inter font-semibold text-xl">Pelaporan Keuangan</p>
                    </div>

                    <div className='w-full flex flex-col gap-5 px-10 pt-5'>
                        <div className='flex flex-col gap-5 px-7 py-5 bg-white rounded-lg'>
                            <div className='flex justify-between items-center'>
                                <p className='font-normal text-sm font-inter'>ID Proyek: <span className='font-bold'>{project.id}</span></p>
                                <p className='font-medium text-sm'>{project.date}</p>
                            </div>
                            <div className='flex flex-col lg:flex-row gap-4'>
                                <Image 
                                    src={project.image}
                                    alt="placeholder"
                                    width={256}
                                    height={143}
                                    className="rounded-lg"
                                />
                                <div className='flex flex-col gap-5'>
                                    <div className='w-auto flex flex-col gap-2'>
                                        <p className='font-inter text-xs font-medium text-[#535862]'>Detail Proyek:</p>
                                        <p className='font-inter text-sm font-medium '>Pembangunan Puskesmas - Puskesmas Gayungan, Jln. Gayungsari Barat 124</p>
                                        <div className='px-3 py-1 border border-[#A4A7AE] rounded-lg w-fit'>
                                            <p className='font-inter font-medium text-xs text-black'>{project.status}</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-10'>
                                        <div className='flex flex-col gap-2 w-1/3'>
                                            <p className='text-[#535862] font-inter font-medium text-xs'>
                                                <span className='md:hidden'>Dokumen:</span>
                                                <span className='hidden md:inline'>Dokumen Pendukung Proyek:</span>
                                            </p>
                                            <button className='flex justify-center items-center gap-2 py-2 text-white font-inter font-medium text-[10px] w-full bg-[#12597F] rounded-lg'>Unduh <span><IoDownload/></span></button>
                                        </div>
                                        <div className='flex flex-col gap-2 w-1/3'>
                                            <p className='text-[#535862] font-inter font-medium text-xs'>
                                                <span className='md:hidden'>Feedback:</span>
                                                <span className='hidden md:inline'>Feedback Proyek:</span>
                                            </p>
                                            <button className='flex justify-center items-center gap-2 py-2 text-white font-inter font-medium text-[10px] bg-[#12597F] rounded-lg'>Akses</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='px-7 py-5 bg-white rounded-lg'>
                            <div className='border-b border-gray-200 mb-2 pb-2'>
                                <h2 className="text-lg font-semibold">Detail Status</h2> 
                            </div>                         
                            <div className="relative">
                                {steps.map((step, index) => (
                                    <div key={step.id} className="flex relative pb-7">
                                        {index < steps.length - 1 && (
                                            <div className="absolute left-[14px] top-8 h-full w-1 bg-gray-200"></div>
                                        )}
                                        
                                        {/* Step number circle */}
                                        <div className="flex-shrink-0 z-10">
                                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                                step.isActive ? 'bg-[#1877AA] text-white' : 'bg-gray-400 text-white'
                                            }`}>
                                                {step.id}
                                            </div>
                                        </div>
                                        
                                        {/* Step content */}
                                        <div className="ml-4 w-full">
                                            <div className={`font-bold font-inter text-sm mt-2 ${
                                                step.isActive ? 'text-[#1877AA]' : 'text-gray-500'
                                            }`}>
                                                {step.title}
                                            </div>
                                            
                                            {/* Step details (only for the active step) */}
                                            {step.isActive && step.details && (
                                                <div className="mt-2 p-4 bg-[#F5F5F5] rounded-md">
                                                    <div className="flex flex-col gap-3 text-xs font-inter font-normal">
                                                        <p>Tanggal inspeksi: <span className='font-bold'>{step.details.inspectionDate}</span></p>
                                                        <p>Catatan: {step.details.notes}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;
