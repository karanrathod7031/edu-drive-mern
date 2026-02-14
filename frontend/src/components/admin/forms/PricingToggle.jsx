import React from 'react';

const PricingToggle = ({ pricingType, price, onChangePrice, onChangeType }) => {
  return (
    <div className="space-y-4 bg-slate-50/50 p-5 rounded-[2rem] border border-slate-100">
      <div className="flex items-center justify-between px-1">
        <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
          Pricing Model
        </label>
        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
          REQUIRED
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {/* Paid Option (Default Active) */}
        <button
          type="button"
          onClick={() => onChangeType('paid')}
          className={`relative p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
            pricingType === 'paid'
              ? 'border-blue-600 bg-white shadow-lg shadow-blue-100'
              : 'border-transparent bg-slate-100 opacity-60'
          }`}
        >
          <span className="text-xl">💳</span>
          <span className={`text-[10px] font-black uppercase ${pricingType === 'paid' ? 'text-blue-600' : 'text-slate-500'}`}>
            Set Price
          </span>
        </button>

        {/* Free Option */}
        <button
          type="button"
          onClick={() => {
            onChangeType('free');
            onChangePrice(0);
          }}
          className={`relative p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
            pricingType === 'free'
              ? 'border-green-600 bg-white shadow-lg shadow-green-100'
              : 'border-transparent bg-slate-100 opacity-60'
          }`}
        >
          <span className="text-xl">🎁</span>
          <span className={`text-[10px] font-black uppercase ${pricingType === 'free' ? 'text-green-600' : 'text-slate-500'}`}>
            Free Asset
          </span>
        </button>
      </div>

      {/* Price Input - Animates when Paid is selected */}
      {pricingType === 'paid' && (
        <div className="pt-2 animate-in fade-in slide-in-from-top-2">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xs font-bold">₹</span>
            </div>
            <input
              type="number"
              value={price}
              onChange={(e) => onChangePrice(e.target.value)}
              className="w-full p-4 pl-16 bg-white rounded-2xl font-black text-slate-700 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-600 transition-all outline-none"
              placeholder="0.00"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingToggle;