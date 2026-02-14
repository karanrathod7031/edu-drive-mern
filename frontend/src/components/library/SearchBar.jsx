import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Search resources..." }) => {
  return (
    <div className="relative w-full group">
      {/* Search Icon */}
      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl group-focus-within:scale-110 transition-transform duration-300">
        🔍
      </span>
      
      {/* Input Field */}
      <input 
        type="text" 
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-5 pl-14 bg-slate-50 rounded-[2rem] border-2 border-transparent focus:border-blue-100 focus:bg-white focus:ring-4 focus:ring-blue-50/50 transition-all font-bold text-slate-700 placeholder:text-slate-300 shadow-sm"
      />

      {/* Clear Button (Only shows when searching) */}
      {searchTerm && (
        <button 
          onClick={() => onSearchChange('')}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;