import React, { useEffect, useRef } from 'react';
import { Activity, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';

const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
        case 'critical': return '#ef4444'; // Red
        case 'high': return '#f97316';     // Orange
        case 'medium': return '#eab308';   // Yellow
        default: return '#4ade80';         // Green
    }
};

const getEventIcon = (type) => {
    if (type.includes('fail')) return <XCircle size={14} />;
    if (type.includes('success')) return <CheckCircle size={14} />;
    if (type.includes('malware') || type.includes('scan')) return <ShieldAlert size={14} />;
    return <Activity size={14} />;
};

const LiveLogFeed = ({ logs, status, filter = 'ALL' }) => {
    // 1. Filter
    const filtered = logs.filter(log => {
        if (filter === 'ALL') return true;
        if (filter === 'HONEYPOT') return log.event_type === 'HONEYPOT_TRIGGER';
        if (filter === 'API') return log.event_type !== 'HONEYPOT_TRIGGER';
        return true;
    });

    // 2. Reverse (Newest Top)
    const reversedLogs = [...filtered].reverse();

    return (
        <div className="flex flex-col h-full bg-black font-mono text-xs select-none">
            {/* Header Removed - Controlled by Parent */}

            {/* Scrollable List */}

            {/* Scrollable List - 4cm height target handled by parent constraint usually, but strictly sizing here for safety */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-0 bg-black relative">
                {/* Table Header */}
                <div className="sticky top-0 z-10 grid grid-cols-12 gap-2 px-3 py-1 bg-[#0f172a] text-gray-500 font-bold text-[10px] uppercase border-b border-slate-800">
                    <span className="col-span-2">Time</span>
                    <span className="col-span-3">Type</span>
                    <span className="col-span-2">Source IP</span>
                    <span className="col-span-5">Event Detail</span>
                </div>

                <div className="flex flex-col">
                    {reversedLogs.length === 0 ? (
                        <div className="p-4 text-center text-gray-600 italic">-- NO SIGNAL --</div>
                    ) : (
                        reversedLogs.map((log, idx) => (
                            <div key={idx} className="grid grid-cols-12 gap-2 px-3 py-1.5 border-b border-slate-900 hover:bg-white/5 transition-colors group">
                                {/* Time */}
                                <span className="col-span-2 text-gray-400 group-hover:text-white">
                                    {log.timestamp?.split('T')[1]?.split('.')[0] || '--:--:--'}
                                </span>

                                {/* Type */}
                                <div className="col-span-3 flex items-center gap-1.5 overflow-hidden">
                                    <span style={{ color: getSeverityColor(log.severity) }}>
                                        {getEventIcon(log.event_type)}
                                    </span>
                                    <span className="truncate font-bold" style={{ color: getSeverityColor(log.severity) }}>
                                        {log.event_type.replace(/_/g, ' ')}
                                    </span>
                                </div>

                                {/* IP */}
                                <span className="col-span-2 text-cyan-600 group-hover:text-cyan-400 font-mono tracking-tighter truncate">
                                    {log.source_ip}
                                </span>

                                {/* Message */}
                                <span className="col-span-5 text-gray-300 truncate group-hover:text-white">
                                    {log.message}
                                </span>
                            </div>
                        ))
                    )}
                </div>

                {/* Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] opacity-20"></div>
            </div>

            {/* Status Footer */}
            <div className="border-t border-slate-800 bg-[#020408] px-2 py-0.5 flex justify-between items-center text-[10px] text-gray-600 font-mono">
                <span>BUFFER: {reversedLogs.length}</span>
                <span className={status === 'connected' ? 'text-green-500' : 'text-red-500'}>{status === 'connected' ? '● LINK ESTABLISHED' : '○ LINK SEVERED'}</span>
            </div>
        </div>
    );
};

export default LiveLogFeed;
