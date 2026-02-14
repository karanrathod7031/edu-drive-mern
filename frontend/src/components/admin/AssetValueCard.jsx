// frontend/src/components/admin/AssetValueCard.jsx
import React, { useState, useEffect } from 'react';
import API from '../../api/config'; 

const AssetValueCard = () => {
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculateValue = async () => {
      try {
        const res = await API.get('/api/assets');
        
        // Sum calculation logic
        const sum = res.data.reduce((acc, item) => {
          if (item.type === 'file') {
            const price = Number(item.price) || 0;
            return acc + price;
          }
          return acc;
        }, 0);

        setTotalValue(sum);
      } catch (err) {
        console.error("❌ AssetValue Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    calculateValue();
  }, []);

  return (
    <div className="bg-white p-10 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-50 flex flex-col items-center justify-center transition-all hover:translate-y-[-5px]">
      <div className="w-16 h-16 bg-emerald-500 rounded-[1.8rem] flex items-center justify-center text-white mb-6 shadow-xl shadow-emerald-100">
        <span className="text-2xl font-bold">₹</span>
      </div>
      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">Asset Value</h4>
      <div className="text-5xl font-black text-slate-900 tracking-tighter">
        {loading ? "..." : `₹${totalValue.toLocaleString('en-IN')}`}
      </div>
    </div>
  );
};

export default AssetValueCard;