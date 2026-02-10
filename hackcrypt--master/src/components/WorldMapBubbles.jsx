import React, { useEffect, useState } from 'react';

const WorldMapBubbles = ({ title }) => {
    return (
        <div className="kibana-card h-[320px]">
            <div className="card-header">
                <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    {title}
                </span>
                <div className="flex bg-[#2b303b] rounded">
                    <button className="px-2 py-0.5 border-r border-gray-600 text-gray-400 hover:text-white">+</button>
                    <button className="px-2 py-0.5 text-gray-400 hover:text-white">-</button>
                </div>
            </div>
            <div className="card-body bg-[#16171b] relative block">
                {/* Map Background */}
                <svg viewBox="0 0 800 400" className="w-full h-full" style={{ opacity: 0.8 }}>
                    {/* Ocean */}
                    <rect width="100%" height="100%" fill="#16171b" />

                    {/* World Landmasses (Approximate Vector) */}
                    <g fill="#252a35" stroke="#2d3342" strokeWidth="0.5">
                        {/* North America */}
                        <path d="M50,50 L150,50 L200,100 L150,200 L50,150 Z" />
                        <path d="M100,60 Q150,60 180,100 T120,220 L80,150 Z" />
                        {/* South America */}
                        <path d="M180,220 L250,220 L220,350 L180,300 Z" />
                        {/* Europe/Asia */}
                        <path d="M350,60 L650,60 L700,200 L600,300 L500,250 L400,200 Z" />
                        {/* Africa */}
                        <path d="M380,200 L480,200 L450,350 L400,300 Z" />
                        {/* Australia */}
                        <path d="M600,280 L700,280 L680,350 L620,330 Z" />
                    </g>

                    {/* Bubbles */}
                    <circle cx="420" cy="120" r="10" fill="#f87171" opacity="0.6">
                        <animate attributeName="r" values="10;14;10" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.6;0.3;0.6" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="650" cy="150" r="15" fill="#f87171" opacity="0.8">
                        <animate attributeName="r" values="15;18;15" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="150" cy="110" r="6" fill="#f87171" opacity="0.5" />
                </svg>

                {/* Legend Overlay */}
                <div className="absolute bottom-4 right-4 bg-[#1f222a] border border-gray-700 p-2 rounded shadow-lg text-xs">
                    <div className="text-gray-400 mb-1">Count</div>
                    <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-red-500 opacity-40"></span> 1 - 7</div>
                    <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-red-500 opacity-70"></span> 7 - 14</div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> 14 - 25</div>
                </div>
            </div>
        </div>
    );
};

export default WorldMapBubbles;
