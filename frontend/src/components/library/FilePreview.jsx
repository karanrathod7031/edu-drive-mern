import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import Styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const FilePreview = ({ fileUrl, title, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Plugins initialize karein
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [], // Clean look ke liye sidebar hide kiya
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" 
        onClick={onClose}
      ></div>

      {/* Viewer Container */}
      <div className="relative bg-white w-full max-w-6xl h-[95vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <span className="font-bold text-[10px]">PDF</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none mb-1">Authenticated Preview</p>
              <h3 className="text-sm font-black text-slate-800 uppercase truncate max-w-[200px] sm:max-w-md">
                {title}
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center font-bold hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            ✕
          </button>
        </div>

        {/* 📄 THE NATIVE PDF VIEWER WITH CORS FIX */}
        <div className="flex-1 overflow-hidden bg-slate-100">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div className="h-full">
              <Viewer
                fileUrl={fileUrl}
                plugins={[defaultLayoutPluginInstance]}
                theme="light"
                // 🛠️ FIX: CORS aur 401 error ke liye credentials false set kiye
                withCredentials={false} 
              />
            </div>
          </Worker>
        </div>

        {/* Footer */}
        <div className="py-2 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em]">
            EduDrive Secure Native Environment
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;