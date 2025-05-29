import React from "react";
import Image from "next/image";

export function NotFoundPage() {
  return (  
    <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-14">
            <Image 
                src="/notFound.svg" 
                alt="Not found"
                width={350}
                height={200} 
                className="mx-auto md:mx-0"
            />
            <div className="py-11 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl text-[#0C3C55] font-bold font-inter mb-5">404</h1>
                <div className="flex flex-col gap-3 text-center md:text-left">
                    <p className="text-black text-opacity-80 text-[18px] md:text-[22px] font-bold">NOT FOUND</p>
                    <p className="text-black text-opacity-80 text-[18px] md:text-[22px] font-normal">Page you're looking for is not found</p>
                    <div className="flex justify-center md:justify-start">
                        <button className="bg-[#1877AA] hover:bg-[#145a8a] text-white py-4 px-12 rounded-xl w-40 h-12 font-inter text-[14px] font-semibold leading-4">Get Back</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}