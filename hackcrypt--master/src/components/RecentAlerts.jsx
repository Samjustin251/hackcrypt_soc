import React from 'react';
import { AlertTriangle, Clock, Activity } from 'lucide-react';

const mockAlerts = [
    { id: 'ALT-1024', type: 'Brute Force Attempt', severity: 'high', time: '2 min ago', status: 'New' },
    { id: 'ALT-1023', type: 'Exfiltration Attempt', severity: 'high', time: '15 min ago', status: 'Investigating' },
    { id: 'ALT-1022', type: 'Port Scan Detected', severity: 'medium', time: '42 min ago', status: 'Resolved' },
    { id: 'ALT-1021', type: 'Invalid Login', severity: 'low', time: '1 hour ago', status: 'Resolved' },
    { id: 'ALT-1020', type: 'Policy Violation', severity: 'low', time: '2 hours ago', status: 'New' },
];

const RecentAlerts = () => {
    return (
        <div className="card grid-span-2">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Recent Alerts</h3>
                <button className="btn text-sm" style={{ color: 'var(--accent-primary)' }}>View All</button>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                            <th className="p-4">ID</th>
                            <th className="p-4">Type</th>
                            <th className="p-4">Severity</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockAlerts.map((alert) => (
                            <tr key={alert.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td className="p-4 text-mono text-sm">{alert.id}</td>
                                <td className="p-4 font-bold">{alert.type}</td>
                                <td className="p-4">
                                    <span className={`badge badge-${alert.severity}`}>{alert.severity}</span>
                                </td>
                                <td className="p-4">
                                    <span style={{
                                        color: alert.status === 'New' ? 'var(--text-primary)' : 'var(--text-muted)',
                                        display: 'flex', alignItems: 'center', gap: '6px'
                                    }}>
                                        <span style={{
                                            width: '8px', height: '8px', borderRadius: '50%',
                                            backgroundColor: alert.status === 'New' ? 'var(--accent-primary)' : 'transparent',
                                            border: alert.status === 'New' ? 'none' : '1px solid var(--text-muted)'
                                        }} />
                                        {alert.status}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-secondary flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                                    <Clock size={14} />
                                    {alert.time}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentAlerts;
