import React from 'react';
import { LayoutDashboard, FileUp, History, Settings, LogOut } from 'lucide-react';

const Sidebar = () => (
  <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col p-4 fixed">
    <h1 className="text-2xl font-bold text-blue-600 mb-8 flex items-center">
      <span className="mr-2">🎓</span> EduDrive
    </h1>
    <nav className="space-y-2 flex-1">
      <NavItem icon={<LayoutDashboard size={20}/>} label="All Files" active />
      <NavItem icon={<History size={20}/>} label="Purchase History" />
      <NavItem icon={<FileUp size={20}/>} label="Upload (Admin)" />
    </nav>
    <div className="border-t pt-4">
      <NavItem icon={<LogOut size={20}/>} label="Logout" />
    </div>
  </div>
);

const NavItem = ({ icon, label, active }) => (
  <div className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
    {icon}
    <span className="font-medium">{label}</span>
  </div>
);

export default Sidebar;