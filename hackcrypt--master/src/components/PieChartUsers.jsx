import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'admin', value: 400, color: '#f97316' }, // Orange
    { name: 'anonymous', value: 300, color: '#eab308' }, // Yellow
    { name: 'apache', value: 300, color: '#ef4444' }, // Red
    { name: 'bob', value: 200, color: '#14b8a6' }, // Teal
    { name: 'pi', value: 100, color: '#a855f7' }, // Purple
];

const PieChartUsers = () => {
    return (
        <div className="w-full h-full flex items-center p-2">
            <div className="flex-1 h-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={40}
                            outerRadius={65}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#050a10', borderColor: '#334155', fontSize: '10px' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            {/* Simple Side Legend */}
            <div className="w-24 pl-2 text-[9px] text-slate-400 font-mono flex flex-col justify-center gap-1.5 border-l border-slate-800/50 h-32 my-auto">
                {data.map(d => (
                    <div key={d.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <div style={{ background: d.color }} className="w-1.5 h-1.5 rounded-full"></div>
                            <span>{d.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PieChartUsers;
