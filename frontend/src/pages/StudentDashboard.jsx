import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const StudentDashboard = () => {
  const [data, setData] = useState({ stats: { totalSpent: 0, totalItems: 0 }, history: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/payments/my-purchases', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        toast.error("Data load nahi ho paya!");
      } finally {
        setLoading(false);
      }
    };
    fetchMyStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-gray-800 mb-8">My Learning Profile 🎓</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-linear-to-br from-blue-600 to-blue-800 p-8 rounded-4xl text-white shadow-xl shadow-blue-200">
            <p className="opacity-80 font-medium">Total Investment in Learning</p>
            <h2 className="text-5xl font-black mt-2">₹{data.stats.totalSpent}</h2>
          </div>
          <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium">Resources Unlocked</p>
            <h2 className="text-5xl font-black mt-2 text-gray-800">{data.stats.totalItems} <span className="text-lg font-normal text-gray-400">Files</span></h2>
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50">
            <h3 className="font-bold text-gray-800">Purchase History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-xs uppercase tracking-widest font-bold">
                <tr>
                  <th className="px-6 py-4">Resource</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.history.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-bold text-gray-700">{order.item?.name}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-black text-blue-600">₹{order.amount}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => window.open(order.item?.fileUrl, '_blank')}
                        className="bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-600 transition"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data.history.length === 0 && !loading && (
              <div className="p-10 text-center text-gray-400">No purchases yet. Start learning!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;