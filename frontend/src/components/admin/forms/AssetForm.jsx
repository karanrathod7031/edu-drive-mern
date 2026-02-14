import React, { useState } from 'react';
import CategorySelect from './CategorySelect';
import PricingToggle from './PricingToggle';

const AssetForm = ({ formData, setFormData, uploading, handleFileUpload }) => {
  const [pricingType, setPricingType] = useState('paid');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Category Section */}
      <CategorySelect 
        value={formData.category} 
        onChange={(val) => setFormData({ ...formData, category: val })} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pricing Section */}
        <PricingToggle 
          pricingType={pricingType}
          price={formData.price}
          onChangeType={setPricingType}
          onChangePrice={(val) => setFormData({ ...formData, price: val })}
        />

        {/* Semester Section */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">
            Academic Semester
          </label>
          <select 
            className="w-full p-5 bg-slate-50 rounded-[1.5rem] border-none font-bold text-slate-600 focus:ring-2 focus:ring-blue-500 transition-all outline-none appearance-none"
            value={formData.semester}
            onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
          >
            {['Sem 1','Sem 2','Sem 3','Sem 4','Sem 5','Sem 6','Sem 7','Sem 8'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cloud Upload Zone */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">
          File Resource
        </label>
        <div className="border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 text-center hover:border-blue-500 hover:bg-blue-50/30 transition-all cursor-pointer relative group">
          <input 
            type="file" 
            className="absolute inset-0 opacity-0 cursor-pointer" 
            onChange={handleFileUpload} 
          />
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
              {uploading ? "⏳" : "☁️"}
            </span>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              {uploading ? "Uploading to Cloud..." : "Drag & Drop or Click to Upload"}
            </p>
            {formData.fileUrl && (
              <div className="mt-2 bg-green-500 text-white px-5 py-1.5 rounded-full text-[9px] font-black tracking-tighter animate-bounce shadow-lg shadow-green-100">
                ✅ FILE READY ON CLOUD
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetForm;