import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  const scrollToLibrary = () => {
    const libSection = document.getElementById('libraries-section');
    if (libSection) {
      libSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/'); // Agar user kisi aur page pe hai toh landing pe bhej do
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
      {/* 1. Left: Logo */}
      <div className="text-2xl font-black tracking-tighter text-blue-600 cursor-pointer" onClick={() => navigate('/')}>
        EDU<span className="text-gray-900">DRIVE</span>
      </div>

      {/* 2. Right: Options */}
      <div className="flex items-center gap-8 font-bold text-sm text-gray-600">
        <button onClick={scrollToLibrary} className="hover:text-blue-600 transition-colors">Libraries</button>
        
        {!token ? (
          <Link to="/login" className="bg-gray-900 text-white px-6 py-2.5 rounded-full hover:bg-blue-600 transition-all">Sign In</Link>
        ) : (
          <>
            {/* Conditional Dashboard Button */}
            {role === 'admin' ? (
              <Link to="/admin" className="text-orange-600 hover:underline">Admin Panel</Link>
            ) : (
              <Link to="/dashboard" className="text-blue-600 hover:underline">My Dashboard</Link>
            )}
            <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="text-red-500">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;