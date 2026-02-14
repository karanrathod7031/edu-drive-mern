import React from 'react';

const AssetCard = ({ asset, onOpen, onAction }) => {
  const isPaid = asset.price > 0;

  return (
    <div 
      onClick={() => onOpen(asset)}
      className="group bg-slate-50 p-6 rounded-[2.5rem] border border-transparent hover:border-blue-200 hover:bg-white hover:shadow-2xl transition-all duration-300 cursor-pointer relative"
    >
      {/* Type Badge */}
      <div className="absolute top-4 left-4">
        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${isPaid ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
          {asset.type === 'folder' ? 'Folder' : (isPaid ? 'Premium' : 'Free')}
        </span>
      </div>

      <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {asset.type === 'folder' ? '📂' : '📄'}
      </div>

      <h3 className="text-[11px] font-black text-slate-800 uppercase truncate px-2 tracking-tighter">
        {asset.title}
      </h3>

      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
        <span className="text-xs font-black text-slate-900">
          {asset.type === 'folder' ? '--' : (isPaid ? `₹${asset.price}` : 'FREE')}
        </span>
        <button 
          onClick={(e) => { e.stopPropagation(); onAction(asset); }}
          className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-800"
        >
          {asset.type === 'folder' ? 'Open' : (isPaid ? 'Unlock' : 'Get Now')}
        </button>
      </div>
    </div>
  );
};

export default AssetCard;