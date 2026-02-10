import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'High', value: 12, color: '#ef4444' },
    { name: 'Medium', value: 35, color: '#f59e0b' },
    { name: 'Low', value: 78, color: '#22c55e' },
];

const SeverityChart = () => {
    return (
        <div className="card" style={{ height: '350px' }}>
            <h3 className="text-lg font-bold mb-4">Alert Severity Distribution</h3>
            <div style={{ width: '100%', height: 'calc(100% - 40px)' }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border-color)',
                                borderRadius: '8px'
                            }}
                            itemStyle={{ color: 'var(--text-primary)' }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SeverityChart;
