import React, { useState, useEffect } from 'react';
import { Filter, Search, ChevronDown, Shield, CheckCircle } from 'lucide-react';
import { useWebSocket } from '../hooks/useWebSocket';

const Alerts = () => {
    // Reuse WebSocket for consistency (ideal: Context, but this is Hackathon speed)
    const { messages } = useWebSocket('ws://localhost:8000/ws');
    const [alerts, setAlerts] = useState([]);
    const [blockedIPs, setBlockedIPs] = useState(new Set());

    useEffect(() => {
        // Filter mainly for high/critical events to show as "Alerts"
        const relevant = messages.filter(m => ['high', 'critical'].includes(m.severity));
        setAlerts(relevant);
    }, [messages]);

    const [blockingId, setBlockingId] = useState(null);

    const handleBlock = async (ip) => {
        setBlockingId(ip);
        try {
            // Fake delay for effect
            await new Promise(r => setTimeout(r, 1500));

            const res = await fetch('http://localhost:8000/api/block_ip', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ip })
            });
            if (res.ok) {
                setBlockedIPs(prev => new Set(prev).add(ip));
            }
        } catch (e) {
            console.error("Block failed", e);
        } finally {
            setBlockingId(null);
        }
    };

    return (
        <div className="animate-fade-in p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-red-500">Active Threats</h2>
                    <p className="text-gray-400">Real-time threat feed</p>
                </div>
                <div className="flex gap-2">
                    <span className="bg-red-900/30 text-red-400 px-3 py-1 rounded border border-red-900/50">
                        {alerts.length} Critical Issues
                    </span>
                </div>
            </div>

            <div className="kibana-card p-0 overflow-hidden">
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead className="bg-[#1f2937] text-gray-400 text-xs uppercase">
                            <tr>
                                <th className="p-4">Time</th>
                                <th className="p-4">Severity</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Source IP</th>
                                <th className="p-4">Message</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-mono">
                            {alerts.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-500 italic">No active threats detected. System secure.</td>
                                </tr>
                            ) : (
                                alerts.map((alert, idx) => (
                                    <tr key={idx} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                                        <td className="p-4 text-gray-500">{alert.timestamp?.split('T')[1]?.split('.')[0]}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${alert.severity === 'critical' ? 'bg-red-500/20 text-red-500 border border-red-500/40' :
                                                'bg-orange-500/20 text-orange-500 border border-orange-500/40'
                                                }`}>
                                                {alert.severity}
                                            </span>
                                        </td>
                                        <td className="p-4 font-bold text-white">{alert.event_type}</td>
                                        <td className="p-4 text-cyan-400">{alert.source_ip}</td>
                                        <td className="p-4 text-gray-300 max-w-xs truncate" title={alert.message}>{alert.message}</td>
                                        <td className="p-4">
                                            {blockedIPs.has(alert.source_ip) ? (
                                                <span className="flex items-center gap-1 text-green-400 text-xs animate-fade-in">
                                                    <CheckCircle size={14} /> BLOCKED
                                                </span>
                                            ) : (alert.source_ip !== 'SYSTEM' && (
                                                <button
                                                    onClick={() => handleBlock(alert.source_ip)}
                                                    disabled={blockingId === alert.source_ip}
                                                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 disabled:bg-red-900 text-white px-3 py-1 rounded text-xs transition-colors shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                                                >
                                                    {blockingId === alert.source_ip ? (
                                                        <>
                                                            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                            APPLYING...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Shield size={12} /> BLOCK IP
                                                        </>
                                                    )}
                                                </button>
                                            ))}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Alerts;
