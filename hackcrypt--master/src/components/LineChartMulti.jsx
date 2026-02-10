import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const defaultData = [
    { name: '18:00', val1: 2, val2: 0, val3: 1 },
    { name: '06:00', val1: 4, val2: 1, val3: 0 },
    { name: '12:00', val1: 1, val2: 5, val3: 2 },
    { name: '18:00', val1: 3, val2: 2, val3: 4 },
];

const LineChartMulti = ({ data = defaultData, total = "0" }) => {
    return (
        <div className="flex w-full h-full">
            {/* CHART AREA (75%) */}
            <div className="flex-1 min-w-0 relative h-full flex flex-col">
                <div className="flex-1 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} /><stop offset="95%" stopColor="#ef4444" stopOpacity={0} /></linearGradient>
                                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                                <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#eab308" stopOpacity={0.8} /><stop offset="95%" stopColor="#eab308" stopOpacity={0} /></linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} width={30} />
                            <Tooltip contentStyle={{ backgroundColor: '#050a10', borderColor: '#1e293b', fontSize: '12px' }} />
                            <Area type="monotone" dataKey="val1" stackId="1" stroke="#ef4444" fill="url(#g1)" strokeWidth={2} />
                            <Area type="monotone" dataKey="val2" stackId="1" stroke="#3b82f6" fill="url(#g2)" strokeWidth={2} />
                            <Area type="monotone" dataKey="val3" stackId="1" stroke="#eab308" fill="url(#g3)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                {/* Legend */}
                <div className="h-6 flex items-center gap-4 text-[9px] text-slate-500 uppercase tracking-widest px-4 border-t border-slate-800/30">
                    <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>Germany</div>
                    <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>USA</div>
                    <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>China</div>
                </div>
            </div>

            {/* SEPARATOR */}
            <div className="w-px bg-slate-800/50 my-4 mx-2"></div>

            {/* STAT PANEL (25%) */}
            <div className="w-32 flex flex-col justify-center items-center shrink-0">
                <div className="text-5xl font-mono font-bold text-white tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                    {total}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-2 uppercase tracking-widest text-center">
                    Total Events<br />Ingested
                </div>
                <div className="w-8 h-1 bg-slate-800 mt-4 rounded-full"></div>
            </div>
        </div>
    );
};

export default LineChartMulti;
