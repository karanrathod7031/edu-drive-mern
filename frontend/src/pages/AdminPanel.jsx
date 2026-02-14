import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import AdminStats from '../components/AdminStats';
import AdminLibrary from '../components/AdminLibrary';
import AdminUpload from '../components/AdminUpload';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate('/login');
  };

  return (
    <div className="flex flex-col md:flex-row-reverse bg-[#f8fafc]">
      
      {/* --- PREMIUM RIGHT SIDEBAR (Top Navbar ke niche fixed) --- */}
      <aside className="w-full md:w-80 bg-[#0f172a] text-white p-6 flex flex-col md:sticky md:top-16 md:h-[calc(100vh-64px)] shadow-2xl">
        <div className="mb-10 mt-4 text-center">
          <h2 className="text-2xl font-black tracking-tighter text-blue-400">ADMIN HUB</h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">EduDrive Control</p>
        </div>

        <nav className="flex-1 space-y-3">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'libraries', label: 'My Library', icon: '📚' },
            { id: 'upload', label: 'Upload New', icon: '📤' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 font-bold ${
                activeTab === item.id 
                ? 'bg-blue-600 shadow-[0_10px_20px_rgba(37,99,235,0.3)] scale-105 text-white' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center justify-center space-x-3 p-4 rounded-2xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all font-black uppercase text-xs tracking-widest"
        >
          <span>LOGOUT SYSTEM</span>
          <span>🚪</span>
        </button>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 p-6 md:p-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12">
            <h1 className="text-5xl font-black text-slate-900 capitalize tracking-tight">
              {activeTab} <span className="text-blue-600">.</span>
            </h1>
            <p className="text-slate-500 font-medium mt-2">Manage your assets and digital documents.</p>
          </header>

          {/* Dynamic Component Rendering */}
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            {activeTab === 'dashboard' && <AdminStats />}
            {activeTab === 'libraries' && <AdminLibrary />}
            {activeTab === 'upload' && <AdminUpload />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;