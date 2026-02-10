import React from 'react';
import { ComposedChart, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const defaultData = [
    { name: '04-06', val: 5 },
    { name: '04-07', val: 8 },
    { name: '04-08', val: 15 },
    { name: '04-09', val: 12 },
    { name: '04-10', val: 24 },
];

const BarChartVertical = ({ color = "#ef4444", data = defaultData, total = "0" }) => {
    return (
        <div className="flex w-full h-full">
            {/* CHART AREA */}
            <div className="flex-1 min-w-0 relative h-full flex flex-col">
                <div className="flex-1 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={data} barCategoryGap={2} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                                    <stop offset="100%" stopColor={color} stopOpacity={0.1} />
                                </linearGradient>
                                <pattern id="grid-pattern" width="4" height="4" patternUnits="userSpaceOnUse">
                                    <path d="M 4 0 L 0 0 0 4" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} width={30} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', borderColor: color, borderRadius: '4px', fontSize: '12px' }}
                                itemStyle={{ color: color, fontWeight: 'bold' }}
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            />
                            <Area type="monotone" dataKey="val" fill={`url(#grad-${color})`} stroke="none" fillOpacity={0.2} />
                            <Bar dataKey="val" fill={color} radius={[2, 2, 0, 0]} barSize={20} animationDuration={500} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
                <div className="h-6 flex items-center gap-4 text-[9px] text-slate-500 uppercase tracking-widest px-4 border-t border-slate-800/30">
                    <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full" style={{ background: color }}></div>Local IP</div>
                    <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>Germany</div>
                </div>
            </div>

            {/* SEPARATOR */}
            <div className="w-px bg-slate-800/50 my-4 mx-2"></div>

            {/* STAT PANEL */}
            <div className="w-32 flex flex-col justify-center items-center shrink-0">
                <div className="text-5xl font-mono font-bold text-white tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                    {total}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-2 uppercase tracking-widest text-center">
                    Critical Threats
                </div>
                <div className="w-8 h-1 bg-slate-800 mt-4 rounded-full"></div>
            </div>
        </div>
    );
};

export default BarChartVertical;
