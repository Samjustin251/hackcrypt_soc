import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { time: '00:00', inbound: 4000, outbound: 2400 },
    { time: '04:00', inbound: 3000, outbound: 1398 },
    { time: '08:00', inbound: 2000, outbound: 9800 },
    { time: '12:00', inbound: 2780, outbound: 3908 },
    { time: '16:00', inbound: 1890, outbound: 4800 },
    { time: '20:00', inbound: 2390, outbound: 3800 },
    { time: '24:00', inbound: 3490, outbound: 4300 },
];

const TrafficChart = () => {
    return (
        <div className="card h-full flex flex-col">
            <h3 className="text-sm font-bold text-muted mb-4 uppercase">Network Traffic (Mbps)</h3>
            <div className="flex-1 min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorOutbound" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.3} />
                        <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                            itemStyle={{ color: 'var(--text-primary)' }}
                        />
                        <Area type="monotone" dataKey="inbound" stroke="var(--accent-primary)" fillOpacity={1} fill="url(#colorInbound)" strokeWidth={2} />
                        <Area type="monotone" dataKey="outbound" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorOutbound)" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TrafficChart;
