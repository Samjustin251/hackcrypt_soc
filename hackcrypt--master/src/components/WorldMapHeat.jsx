import React from 'react';

const WorldMapHeat = ({ title }) => {
    return (
        <div className="kibana-card h-[320px]">
            <div className="card-header">
                <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    {title}
                </span>
                <div className="flex bg-[#2b303b] rounded">
                    <button className="px-2 py-0.5 border-r border-gray-600 text-gray-400 hover:text-white">+</button>
                    <button className="px-2 py-0.5 text-gray-400 hover:text-white">-</button>
                </div>
            </div>
            <div className="card-body bg-[#16171b] relative block overflow-hidden">
                <svg viewBox="0 0 800 400" className="w-full h-full" style={{ opacity: 0.8 }}>
                    <rect width="100%" height="100%" fill="#16171b" />
                    <g fill="#252a35" stroke="#2d3342" strokeWidth="0.5">
                        <path d="M50,50 L150,50 L200,100 L150,200 L50,150 Z" />
                        <path d="M100,60 Q150,60 180,100 T120,220 L80,150 Z" />
                        <path d="M180,220 L250,220 L220,350 L180,300 Z" />
                        <path d="M350,60 L650,60 L700,200 L600,300 L500,250 L400,200 Z" />
                        <path d="M380,200 L480,200 L450,350 L400,300 Z" />
                        <path d="M600,280 L700,280 L680,350 L620,330 Z" />
                    </g>

                    {/* Heatmap Spots */}
                    <defs>
                        <radialGradient id="heat1" cx="0.5" cy="0.5" r="0.5">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="heat2" cx="0.5" cy="0.5" r="0.5">
                            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* Europe Hotspot */}
                    <circle cx="420" cy="120" r="30" fill="url(#heat1)" />
                    <circle cx="425" cy="125" r="10" fill="url(#heat2)" />
                </svg>

                {/* Legend Overlay */}
                <div className="absolute bottom-4 right-4 bg-[#1f222a] border border-gray-700 p-2 rounded shadow-lg text-xs">
                    <div className="text-gray-400 mb-1">Count</div>
                    <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-blue-500 opacity-40"></span> 1 - 7</div>
                    <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-green-500 opacity-70"></span> 7 - 14</div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> 14 - 25</div>
                </div>
            </div>
        </div>
    );
};

export default WorldMapHeat;
