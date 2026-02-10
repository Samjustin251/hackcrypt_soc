import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
    { name: 'SSH', count: 4000 },
    { name: 'RDP', count: 3000 },
    { name: 'HTTP', count: 2000 },
    { name: 'DNS', count: 2780 },
    { name: 'FTP', count: 1890 },
];

const EventBarChart = () => {
    return (
        <div className="card h-full flex flex-col">
            <h3 className="text-sm font-bold text-muted mb-4 uppercase">Top Attack Vectors</h3>
            <div className="flex-1 min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border-color)" opacity={0.3} />
                        <XAxis type="number" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis dataKey="name" type="category" stroke="var(--text-primary)" fontSize={12} tickLine={false} axisLine={false} width={40} />
                        <Tooltip
                            cursor={{ fill: 'var(--bg-tertiary)' }}
                            contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                        />
                        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'var(--severity-high)' : 'var(--severity-medium)'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default EventBarChart;
