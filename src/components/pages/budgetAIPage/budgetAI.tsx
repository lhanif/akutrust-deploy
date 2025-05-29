'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/sidebar';
import { useRouter } from 'next/navigation';

export default function BudgetAIPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('budget');
  const [isMobile, setIsMobile] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'ai'; message: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSend = async () => {
    if (!input.trim()) return;

    const updatedHistory = [...chatHistory, { sender: 'user' as const, message: input }];
    setChatHistory(updatedHistory);
    setInput('');
    setIsLoading(true);

    const aiResponse = await getAIResponse(input);
    setChatHistory(prev => [...prev, { sender: 'ai' as const, message: aiResponse }]);
    setIsLoading(false);
  };


  const getAIResponse = async (userMessage: string) => {
    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Unknown error');
      return data.result;
    } catch (err: any) {
      console.error('Chat API error:', err);
      return 'Maaf, terjadi kesalahan saat menghubungi AI.';
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen && isMobile ? 'ml-0' : 'md:ml-64'} p-4 md:p-8 overflow-y-auto`}>
        {isMobile && (
          <div className="flex items-center mb-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mr-4 text-gray-600"    
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-800">BudgetAI</h1>
          </div>
        )}

        {!isMobile && (
          <h1 className="text-xl font-semibold text-gray-800 mb-4">BudgetAI</h1>
        )}

        {/* Chat Bubble Section */}
        <div className="flex flex-col items-center justify-center mt-16 md:mt-32 w-full">
          <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-800 px-4">
            Apa yang bisa <span className="text-[#1877AA] font-bold">AkuTrust</span> bantu?
          </h2>

          {/* Bubble chat display */}
          <div className="w-full max-w-xl mt-6 space-y-2 px-4">
            {chatHistory.map((chat, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg max-w-[80%] text-sm ${
                  chat.sender === 'user'
                    ? 'bg-blue-100 self-end ml-auto text-right'
                    : 'bg-gray-200 self-start mr-auto text-left'
                }`}
              >
                {chat.message}
              </div>
            ))}

            {isLoading && (
              <div className="text-sm text-gray-500 italic">TrustBot sedang berpikir...</div>
            )}
          </div>

          {/* Input box with button */}
          <div className="mt-6 w-full max-w-xl px-4">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg shadow px-4 py-3">
              <input
                type="text"
                placeholder="Buat apapun"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm md:text-base"
              />
              <button
                onClick={handleSend}
                className="text-[#1877AA] font-bold text-lg md:text-xl px-3"
              >
                {'>'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
