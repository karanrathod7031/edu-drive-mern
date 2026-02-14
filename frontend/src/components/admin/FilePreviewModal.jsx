import React from 'react';

const FilePreviewModal = ({ file, isOpen, onClose }) => {
  if (!isOpen || !file) return null;

  const isPDF = file.fileUrl?.toLowerCase().endsWith('.pdf');
  const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(file.fileUrl);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Premium Backdrop - Student Landing Page Style */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>

      {/* Modal Content - Sleek & Modern */}
      <div className="relative bg-white w-full max-w-5xl h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in duration-300 border border-white/20">
        
        {/* Header Section */}
        <div className="px-10 py-6 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-blue-100">
              {isPDF ? '📕' : '🖼️'}
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight leading-none">
                {file.title}
              </h3>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mt-2">
                Student Preview Mode • ₹{file.price || '0'}
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose} 
            className="group w-12 h-12 bg-slate-100 hover:bg-red-500 rounded-2xl transition-all duration-300 flex items-center justify-center"
          >
            <span className="text-slate-500 group-hover:text-white font-bold transition-colors">✕</span>
          </button>
        </div>

        {/* Preview Engine */}
        <div className="flex-1 bg-slate-50 relative overflow-hidden">
          {isPDF ? (
            <iframe
              src={`${file.fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-full border-none shadow-inner"
              title="Student PDF View"
            />
          ) : isImage ? (
            <div className="w-full h-full flex items-center justify-center p-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
              <img 
                src={file.fileUrl} 
                alt="Preview" 
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border-4 border-white"
              />
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <div className="text-6xl animate-bounce">📁</div>
              <p className="text-slate-400 font-black uppercase text-xs tracking-widest">Format not supported for direct preview</p>
              <a href={file.fileUrl} target="_blank" className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase">Open in Browser</a>
            </div>
          )}

          {/* Locked Watermark (Just for Feel) */}
          <div className="absolute bottom-6 right-6 pointer-events-none opacity-20 select-none">
             <h1 className="text-4xl font-black text-slate-900 uppercase -rotate-12">EDU DRIVE</h1>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center gap-4">
           <button onClick={onClose} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
             Close Preview
           </button>
        </div>
      </div>
    </div>
  );
};

export default FilePreviewModal;