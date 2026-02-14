import React from 'react';

const CategorySelect = ({ value, onChange }) => {
  const categories = ['Notes', 'Question Papers', 'Projects', 'Model Answer'];

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">
        Asset Category
      </label>
      <div className="grid grid-cols-2 gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            className={`px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all border-2 text-center ${
              value === cat
                ? 'bg-slate-900 border-slate-900 text-white shadow-xl translate-y-[-2px]'
                : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelect;