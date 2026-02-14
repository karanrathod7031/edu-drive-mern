import React, { useState } from 'react';
import API from '../api/config';
import { toast } from 'react-hot-toast';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const res = await API.post(endpoint, formData);
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('userName', res.data.user.name);
      
      toast.success(`Welcome ${res.data.user.name}!`);
      window.location.reload(); // State refresh ke liye
    } catch (err) {
      toast.error(err.response?.data?.error || "Action failed");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
      <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 text-2xl">✕</button>
        
        <h2 className="text-3xl font-black mb-2 text-center">{isLogin ? 'Sign In' : 'Create Account'}</h2>
        <p className="text-gray-500 text-center mb-8">{isLogin ? 'Access your library' : 'Start your journey'}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input type="text" placeholder="Full Name" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" 
            onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          )}
          <input type="email" placeholder="Email" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <input type="password" placeholder="Password" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" 
          onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          
          <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-gray-900 transition-all">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 font-bold">
          {isLogin ? "Don't have an account?" : "Already a member?"} {' '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 underline">
            {isLogin ? 'SignUp here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;