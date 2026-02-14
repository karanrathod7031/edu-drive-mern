import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Direct API URL logic
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${apiUrl}/api/auth/register`, formData);
      
      // Token aur user details save karein
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('userName', res.data.user.name);

      toast.success("Welcome to EduDrive! 🚀");
      navigate('/dashboard'); // Success hote hi dashboard bhej do
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
        <h2 className="text-3xl font-black text-center text-gray-900 mb-8">Join Us 🚀</h2>
        
        <form onSubmit={handleRegister} className="space-y-5">
          <input 
            type="text" placeholder="Full Name" required 
            className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
          />
          <input 
            type="email" placeholder="Email Address" required 
            className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
          <input 
            type="password" placeholder="Create Password" required 
            className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
          />
          
          <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-600 shadow-lg transition-all active:scale-95">
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 font-medium">
          Already a member? <Link to="/login" className="text-blue-600 font-black hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;