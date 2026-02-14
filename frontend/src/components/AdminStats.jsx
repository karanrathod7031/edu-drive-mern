import React, { useState, useEffect } from 'react';
import API from '../api/config'; // Pakka karein path sahi hai

const AdminStats = () => {
  const [data, setData] = useState({ totalAssets: 0, assetValue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 🚀 Backend call bina kisi query (?parentId=null) ke honi chahiye
        const res = await API.get('/api/assets'); 
        
        // Sabhi files ka filter (Nested + Root dono isme aa jayenge)
        const allFiles = res.data.filter(item => item.type === 'file');

        // 🔥 GLOBAL SUM LOGIC
        const totalValue = allFiles.reduce((acc, file) => {
          return acc + (Number(file.price) || 0);
        }, 0);

        setData({
          totalAssets: allFiles.length,
          assetValue: totalValue
        });
      } catch (err) {
        console.error("Dashboard Debug Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Stats Array (Ab ye dynamic hai!)
  const stats = [
    { label: 'Total Assets', value: data.totalAssets, color: 'bg-blue-600', icon: '📦' },
    { label: 'Asset Value', value: `₹${data.assetValue}`, color: 'bg-emerald-500', icon: '💰' },
    { label: 'User Traffic', value: '0', color: 'bg-violet-600', icon: '👥' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat, i) => (
        <div key={i} className="relative bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center">
          <div className={`${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 text-white`}>
            {stat.icon}
          </div>
          <p className="text-slate-500 font-bold uppercase text-xs">{stat.label}</p>
          <h3 className="text-4xl font-black text-slate-900 mt-2">
            {loading ? "..." : stat.value}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;