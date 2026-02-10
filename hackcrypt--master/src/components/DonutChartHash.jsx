import React from 'react';

const DonutChartHash = () => {
    return (
        <div className="w-full h-full flex items-center p-2">
            <div className="flex-1 h-full flex items-center justify-center relative">
                {/* SVG Donut */}
                <div className="w-32 h-32 relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="6" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#fbbf24" strokeWidth="6" strokeDasharray="60 251" />
                        <circle cx="50" cy="50" r="32" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="100 200" strokeDashoffset="-40" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[9px] font-mono text-slate-500">
                        HASH
                    </div>
                </div>
            </div>
            {/* List */}
            <div className="w-24 pl-2 text-[9px] text-slate-400 font-mono flex flex-col justify-center gap-1.5 border-l border-slate-800/50 h-32 my-auto">
                {[
                    { label: 'krabelize', color: '#fbbf24' },
                    { label: 'E025519', color: '#22c55e' },
                    { label: 'k3rtU-v...', color: '#14b8a6' },
                    { label: 'doBfNy...', color: '#6366f1' },
                    { label: '8swCJX...', color: '#d946ef' },
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                        <span style={{ backgroundColor: item.color }} className="w-1.5 h-1.5 rounded-full shrink-0"></span>
                        <span className="truncate">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DonutChartHash;
