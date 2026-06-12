import React from 'react';

export default function StatsBar() {
  const stats = [
    { value: '148 BHP', label: 'Peak Power' },
    { value: '3.2s', label: '0–100 km/h Acceleration' },
    { value: '12', label: 'Current Models Lineup' },
    { value: '40+', label: 'Countries Global Presence' }
  ];

  return (
    <div className="w-full bg-[#0D0D0D] border-y border-[#2A2A2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#2A2A2B]">
          {stats.map((stat, idx) => (
            <div key={idx} className="py-8 flex flex-col items-center justify-center text-center px-4">
              <span className="text-3xl md:text-5xl font-display font-bold text-[#F2F2F2] mb-2 tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs font-display uppercase tracking-widest text-[#888888]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
