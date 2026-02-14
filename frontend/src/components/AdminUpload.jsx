import React, { useState, useEffect } from 'react';
import API from '../api/config';
import { toast } from 'react-hot-toast';
import AssetForm from "./admin/forms/AssetForm";

const AdminUpload = () => {
  const [folders, setFolders] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '', type: 'file', parent: 'root', price: 0,
    category: 'Notes', semester: 'Sem 1'
  });

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        // Correct endpoint as per server.js
        const res = await API.get('/api/assets');
        setFolders(res.data.filter(item => item.type === 'folder'));
      } catch (err) { console.error("Folder fetch error"); }
    };
    fetchFolders();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (!formData.name) setFormData({ ...formData, name: file.name });
      toast.success("File Selected! Click Publish to finish.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (formData.type === 'file') {
        if (!selectedFile) {
          setUploading(false);
          return toast.error("Please select a file first!");
        }

        const data = new FormData();
        data.append("file", selectedFile);
        data.append("name", formData.name);
        data.append("parentId", formData.parent === 'root' ? 'null' : formData.parent);
        data.append("price", formData.price);
        data.append("category", formData.category);
        data.append("semester", formData.semester);

        // ✅ URL Fixed to match server.js mount point
        await API.post('/api/assets/upload', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await API.post('/api/assets/folder', {
          title: formData.name,
          parentId: formData.parent === 'root' ? 'null' : formData.parent
        });
      }

      toast.success("Successfully Published! 🔥");
      // Reset after success
      setFormData({ ...formData, name: '', price: 0 });
      setSelectedFile(null);
      
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Connection/Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-[3.5rem] p-12 shadow-sm border border-slate-50 max-w-4xl mx-auto my-10">
      <header className="mb-10 text-center">
        <h3 className="text-3xl font-black tracking-tighter uppercase text-slate-900">Publish Asset 🚀</h3>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">New Library Entry</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-[2.5rem]">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Asset Type</label>
            <div className="flex bg-white p-1.5 rounded-2xl shadow-inner">
              {['file', 'folder'].map(t => (
                <button key={t} type="button" onClick={() => setFormData({...formData, type: t})}
                  className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase transition-all ${formData.type === t ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-300'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Destination</label>
            <select 
              className="w-full p-4 bg-white rounded-2xl font-bold text-slate-600 outline-none border-none shadow-inner"
              value={formData.parent}
              onChange={(e) => setFormData({...formData, parent: e.target.value})}
            >
              <option value="root">Root Directory</option>
              {folders.map(f => <option key={f._id} value={f._id}>{f.title}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Asset Title</label>
          <input type="text" placeholder="e.g. Mathematics II Notes" value={formData.name}
            className="w-full p-6 bg-slate-50 rounded-[2rem] outline-none border-2 border-transparent focus:border-blue-600 font-bold text-lg transition-all"
            onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        </div>

        {formData.type === 'file' && (
          <AssetForm 
            formData={formData} setFormData={setFormData}
            uploading={uploading} handleFileUpload={handleFileUpload}
          />
        )}

        <button type="submit" disabled={uploading} className="w-full bg-slate-900 text-white py-7 rounded-[2.5rem] font-black text-xl hover:bg-blue-600 transition-all shadow-2xl active:scale-95 disabled:bg-slate-400">
          {uploading ? 'UPLOADING TO CLOUD...' : 'CONFIRM & PUBLISH'}
        </button>
      </form>
    </div>
  );
};

export default AdminUpload;