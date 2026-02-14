import React, { useState, useEffect } from 'react';
import API from '../api/config';
// ✅ Path Fix: Agar Dashboard 'src' mein hai aur component 'src/components/admin' mein
import AssetValueCard from './components/admin/AssetValueCard'; 
import { 
  Square3Stack3DIcon, 
  UsersIcon, 
  ArrowTrendingUpIcon 
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalAssets: 0,
    totalUsers: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/api/assets');
        const filesOnly = res.data.filter(item => item.type === 'file').length;
        setStats(prev => ({ ...prev, totalAssets: filesOnly }));
      } catch (err) {
        console.error("Dashboard stats fetch error:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-10 space-y-12 bg-white min-h-screen">
      {/* --- HEADER SECTION --- */}
      <header className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase">
            Dashboard <span className="text-blue-600">.</span>
          </h1>
          <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.4em] mt-2 ml-1">
            Platform Insights & Control
          </p>
        </div>
        <div className="hidden md:block">
          <div className="bg-slate-50 border border-slate-100 px-6 py-3 rounded-2xl flex items-center gap-3">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Online</span>
          </div>
        </div>
      </header>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* 1. TOTAL ASSETS CARD */}
        <div className="bg-white p-10 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-50 flex flex-col items-center justify-center transition-all hover:translate-y-[-5px]">
          <div className="w-16 h-16 bg-blue-600 rounded-[1.8rem] flex items-center justify-center text-white mb-6 shadow-xl shadow-blue-100">
            <Square3Stack3DIcon className="w-8 h-8" />
          </div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">Total Assets</h4>
          <div className="text-5xl font-black text-slate-900 tracking-tighter">
            {stats.totalAssets.toLocaleString()}
          </div>
        </div>

        {/* 2. DYNAMIC ASSET VALUE CARD ✅ */}
        <AssetValueCard />

        {/* 3. USER TRAFFIC CARD */}
        <div className="bg-white p-10 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-50 flex flex-col items-center justify-center transition-all hover:translate-y-[-5px]">
          <div className="w-16 h-16 bg-indigo-600 rounded-[1.8rem] flex items-center justify-center text-white mb-6 shadow-xl shadow-indigo-100">
            <UsersIcon className="w-8 h-8" />
          </div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">User Traffic</h4>
          <div className="text-5xl font-black text-slate-900 tracking-tighter">
            0
          </div>
        </div>
      </div>

      {/* --- BANNER --- */}
      <div className="bg-slate-900 rounded-[4rem] p-16 text-white overflow-hidden relative min-h-[350px] flex items-center shadow-2xl shadow-slate-200">
        <div className="relative z-10 max-w-lg">
          <div className="inline-block bg-emerald-500/20 text-emerald-400 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-500/30">
            New Feature
          </div>
          <h3 className="text-4xl font-black tracking-tight mb-6 leading-tight">
            Real-time Asset <br/> Value Monitoring 📈
          </h3>
          <p className="text-slate-400 font-medium leading-relaxed mb-10 text-base">
            Aapka total valuation ab direct database se connected hai. Har ek file ki pricing automate ho chuki hai.
          </p>
          <button className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-lg">
            Generate Report
          </button>
        </div>
        <div className="absolute right-20 bottom-10 opacity-10 scale-125">
           <ArrowTrendingUpIcon className="w-72 h-72 text-white" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;