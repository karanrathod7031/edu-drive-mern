import React, { useState } from 'react';
import { X, UploadCloud, FileText } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// 📂 Path dhyan se check karein (Assuming UploadModal is in src/components/admin/)
import PricingToggle from './forms/PricingToggle';
import CategorySelect from './forms/CategorySelect';

const UploadModal = ({ isOpen, onClose, parentId, refreshItems }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pricingType, setPricingType] = useState('paid'); // Requirement: Default Paid

  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    semester: 'Sem 1',
    category: 'Notes',
    branch: ''
  });

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a PDF file first!");
    if (!formData.title) return toast.error("Title is required!");

    setLoading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('name', formData.title);
    data.append('parentId', parentId || 'root');
    data.append('price', pricingType === 'free' ? 0 : formData.price);
    data.append('semester', formData.semester);
    data.append('category', formData.category);
    data.append('branch', formData.branch);

    try {
      const token = localStorage.getItem('token');
      // 🚀 Backend Hit
      await axios.post('http://localhost:5000/api/drive/upload', data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' 
        }
      });

      toast.success("Published Successfully! 🔥");
      setFile(null); // Reset file
      refreshItems();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-[3rem] w-full max-w-xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-4">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tighter uppercase">Add New Resource</h2>
            <p className="text-[10px] font-bold text-blue-600 tracking-[0.2em] uppercase">Target: {parentId === 'root' ? 'Main Drive' : 'Sub Folder'}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
            <X size={20}/>
          </button>
        </div>

        <div className="space-y-8">
          {/* 📄 PDF Upload Zone */}
          <div 
            className={`border-2 border-dashed rounded-[2.5rem] p-10 text-center transition-all relative group ${
              file ? 'border-green-500 bg-green-50/50' : 'border-slate-200 hover:border-blue-500 hover:bg-blue-50/30'
            }`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); setFile(e.dataTransfer.files[0]); }}
          >
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setFile(e.target.files[0])} accept=".pdf" />
            <div className="flex flex-col items-center">
              {file ? (
                <>
                  <FileText className="text-green-600 mb-2 animate-pulse" size={40}/>
                  <p className="text-xs font-black text-green-700 uppercase truncate max-w-xs">{file.name}</p>
                </>
              ) : (
                <>
                  <UploadCloud className="text-slate-300 mb-2 group-hover:scale-110 transition-transform" size={40}/>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Click or Drag PDF Here</p>
                </>
              )}
            </div>
          </div>

          {/* 🏷️ Title & Category */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Asset Title</label>
              <input 
                type="text" 
                placeholder="Physics Unit 1 Notes..." 
                className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-none focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <CategorySelect 
              value={formData.category} 
              onChange={(val) => setFormData({...formData, category: val})} 
            />
          </div>

          {/* 💰 Pricing & 🎓 Semester Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <PricingToggle 
              pricingType={pricingType}
              price={formData.price}
              onChangeType={setPricingType}
              onChangePrice={(val) => setFormData({...formData, price: val})}
            />

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Academic Semester</label>
              <select 
                className="w-full p-5 bg-slate-50 rounded-2xl font-bold text-slate-600 border-none outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                onChange={e => setFormData({...formData, semester: e.target.value})}
              >
                {['Sem 1','Sem 2','Sem 3','Sem 4','Sem 5','Sem 6','Sem 7','Sem 8'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 🏁 Action Button */}
          <button 
            disabled={loading}
            onClick={handleUpload}
            className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-lg hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 disabled:bg-slate-300 active:scale-[0.98]"
          >
            {loading ? "UPLOADING TO SERVER..." : "CONFIRM & PUBLISH"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;