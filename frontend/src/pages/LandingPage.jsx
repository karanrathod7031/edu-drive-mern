import React, { useState, useEffect } from 'react';
import { assetService } from '../services/assetService';
import StudentLibrary from "../components/library/StudentLibrary"; // Humne jo pehle banaya tha
import { toast } from 'react-hot-toast'; 

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const tags = ['All', 'Notes', 'Question Papers', 'Projects', 'Model Answer'];

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">
      
      {/* 🚀 HERO SECTION: UX/UI Improved */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-60 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.2em] text-blue-600 bg-blue-50 rounded-full uppercase">
            Platform for Engineering Excellence
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-8">
            STUDY SMARTER,<br />
            <span className="text-blue-600">NOT HARDER.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Premium engineering resources, projects, and notes curated by experts. 
            Join 10,000+ students excelling today.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => document.getElementById('library').scrollIntoView({behavior:'smooth'})} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs tracking-widest hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200">
              EXPLORE DRIVE
            </button>
            <button className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-black text-xs tracking-widest hover:border-blue-600 transition-all">
              WATCH DEMO
            </button>
          </div>
        </div>
      </section>

      {/* 🔍 DISCOVERY BAR: Search & Filters */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-y border-slate-100 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-6 items-center">
          
          {/* Tags */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
            {tags.map(tag => (
              <button 
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-5 py-2 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeTag === tag 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 w-full">
            <input 
              type="text" 
              placeholder="Search by subject, code or topic..." 
              className="w-full p-4 pl-12 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-100 focus:bg-white focus:ring-0 transition-all font-bold text-slate-700 placeholder:text-slate-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl grayscale">🔍</span>
          </div>
        </div>
      </section>

      {/* 📚 MAIN LIBRARY COMPONENT */}
      <section id="library" className="min-h-screen">
        <StudentLibrary activeTag={activeTag} searchTerm={searchTerm} />
      </section>

      {/* 🏷️ FOOTER CTA */}
      <footer className="bg-slate-950 py-20 text-center">
        <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">Ready to boost your CGPA?</h2>
        <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-xs tracking-[0.2em] hover:scale-105 transition-transform">
          GET ALL ACCESS PASS
        </button>
      </footer>
    </div>
  );
};

export default LandingPage;