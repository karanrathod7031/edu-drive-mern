import React, { useEffect, useState } from 'react';
import API from '../api/config';

const UserDashboard = () => {
  const [purchases, setPurchases] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get('/api/payments/history');
        setPurchases(res.data);
        const total = res.data.reduce((sum, item) => sum + item.amount, 0);
        setTotalSpent(total);
      } catch (err) { console.log(err); }
    };
    fetchHistory();
  }, []);

  return (
    <div className="pt-28 px-6 max-w-5xl mx-auto min-h-screen">
      <h1 className="text-4xl font-black mb-2">My Dashboard</h1>
      <p className="text-gray-500 mb-10 font-medium">Manage your learning expenses and resources.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white">
          <p className="text-sm font-bold uppercase opacity-80">Total Expenses</p>
          <h2 className="text-5xl font-black mt-2">₹{totalSpent}</h2>
        </div>
        <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white">
          <p className="text-sm font-bold uppercase opacity-80">Items Owned</p>
          <h2 className="text-5xl font-black mt-2">{purchases.length}</h2>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
        <h3 className="text-xl font-bold mb-6">Purchase History</h3>
        <div className="space-y-4">
          {purchases.map(p => (
            <div key={p._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
              <div>
                <p className="font-bold text-gray-800">{p.itemName}</p>
                <p className="text-xs text-gray-400">{new Date(p.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-black text-blue-600">₹{p.amount}</p>
                <button className="text-[10px] font-black uppercase text-gray-400 hover:text-blue-600">Download PDF</button>
              </div>
            </div>
          ))}
          {purchases.length === 0 && <p className="text-center text-gray-400 py-10">No purchases yet. Start learning!</p>}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;