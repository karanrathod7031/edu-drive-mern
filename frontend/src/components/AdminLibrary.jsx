import React, { useEffect, useState, useRef } from 'react';
import { assetService } from '../services/assetService';
import { toast } from 'react-hot-toast';
import FilePreviewModal from './admin/FilePreviewModal'; 

const AdminLibrary = () => {
  const [assets, setAssets] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [path, setPath] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const fileInputRef = useRef(null);

  // 1. Load Assets
  const loadAssets = async () => {
    try {
      const data = await assetService.fetchAssets(currentFolder);
      setAssets(data);
    } catch (err) {
      toast.error("Assets load nahi ho paye");
    }
  };

  useEffect(() => { loadAssets(); }, [currentFolder]);

  // 2. Preview Logic
  const handlePreview = (file) => {
    setSelectedFile(file);
    setIsPreviewOpen(true);
  };

  // ✅ 3. Missing Function: handleCreateFolder (FIXED)
  const handleCreateFolder = async () => {
    const name = prompt("Folder ka naam:");
    if (!name) return;
    try {
      await assetService.createFolder(name, currentFolder);
      toast.success("Folder created!");
      loadAssets();
    } catch (err) { toast.error("Error creating folder"); }
  };

  // ✅ 4. Missing Function: handleFileUpload (FIXED)
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const tid = toast.loading(`Uploading ${file.name}...`);
    try {
      await assetService.uploadFile(file, currentFolder);
      toast.success("File saved!", { id: tid });
      loadAssets();
    } catch (err) { toast.error("Upload failed!", { id: tid }); }
  };

  // 5. Rename & Delete
  const handleRename = async (id, oldTitle) => {
    const newTitle = prompt("Naya naam likhein:", oldTitle);
    if (!newTitle || newTitle === oldTitle) return;
    try {
      await assetService.renameAsset(id, newTitle);
      toast.success("Renamed!");
      loadAssets();
    } catch (err) { toast.error("Rename failed"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete karna chahte hain?")) return;
    try {
      await assetService.deleteAsset(id);
      toast.success("Deleted!");
      loadAssets();
    } catch (err) { toast.error("Delete failed"); }
  };

  return (
    <div className="space-y-6">
      <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />

      {/* TOOLBAR */}
      <div className="flex justify-between items-center bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center space-x-2 text-sm font-black text-slate-600 uppercase">
          <button onClick={() => {setCurrentFolder(null); setPath([]);}} className="text-blue-600 hover:underline">Drive</button>
          {path.map((p, i) => (
            <span key={p._id} className="flex items-center space-x-2">
              <span className="text-slate-300">/</span>
              <button onClick={() => {
                const newPath = path.slice(0, i + 1);
                setPath(newPath);
                setCurrentFolder(p._id);
              }} className="hover:text-blue-600">{p.title}</button>
            </span>
          ))}
        </div>

        <div className="flex space-x-3">
          <button onClick={() => fileInputRef.current.click()} className="bg-blue-600 text-white px-6 py-2 rounded-2xl font-black text-[10px] tracking-widest shadow-lg shadow-blue-200">+ UPLOAD FILE</button>
          <button onClick={handleCreateFolder} className="bg-slate-900 text-white px-6 py-2 rounded-2xl font-black text-[10px] tracking-widest">+ NEW FOLDER</button>
        </div>
      </div>

      {/* GRID VIEW */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {assets.map((asset) => (
          <div key={asset._id} className="group bg-white p-6 rounded-[2.5rem] border border-slate-50 hover:border-blue-200 hover:shadow-2xl transition-all cursor-pointer text-center relative">
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
              <button onClick={(e) => { e.stopPropagation(); handleRename(asset._id, asset.title); }} className="p-2 bg-white shadow-xl rounded-full text-blue-500">✏️</button>
              <button onClick={(e) => { e.stopPropagation(); handleDelete(asset._id); }} className="p-2 bg-white shadow-xl rounded-full text-red-500">🗑️</button>
            </div>

            <div onClick={() => asset.type === 'folder' ? (setPath([...path, asset]), setCurrentFolder(asset._id)) : handlePreview(asset)}>
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                {asset.type === 'folder' ? '📂' : '📄'}
              </div>
              <h3 className="text-[11px] font-black text-slate-800 uppercase truncate px-2 tracking-tighter">
                {asset.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* STUDENT PREVIEW MODAL */}
      <FilePreviewModal 
        file={selectedFile} 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
      />
    </div>
  );
};

export default AdminLibrary;