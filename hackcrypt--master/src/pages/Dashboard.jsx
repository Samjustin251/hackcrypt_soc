import React, { useMemo, useState, useEffect } from 'react';
import LineChartMulti from '../components/LineChartMulti';
import BarChartVertical from '../components/BarChartVertical';
import PieChartUsers from '../components/PieChartUsers';
import DonutChartHash from '../components/DonutChartHash';
import LiveLogFeed from '../components/LiveLogFeed';
import VideoWidget from '../components/VideoWidget';
import { useWebSocket } from '../hooks/useWebSocket';
import { Camera } from 'lucide-react';

const CyberContainer = ({ title, children, className = "", headerRight = null }) => (
    <div className={`flex flex-col h-full w-full bg-[#030508] border border-cyan-900/30 relative group overflow-hidden ${className}`}>
        {/* Cyber Brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500 z-10"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500 z-10"></div>

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between px-4 py-2 border-b border-cyan-900/20 bg-slate-900/20">
            <h3 className="font-display text-xs font-bold text-cyan-400 tracking-[0.2em] uppercase glow-text">
                {title}
            </h3>
            {headerRight}
        </div>

        {/* Body */}
        <div className="flex-1 relative overflow-hidden p-1">
            {children}
        </div>
    </div>
);

const Dashboard = () => {
    // --- STATE & DATA ---
    const { messages, status } = useWebSocket('ws://localhost:8000/ws');
    const [logFilter, setLogFilter] = useState('ALL');
    const [isMuted, setIsMuted] = useState(false);

    // --- DATA PROCESSING ---
    const { stats, chartData, threatData, filteredMessages } = useMemo(() => {
        // 1. FILTER LOGIC
        let data = messages;
        if (logFilter === 'API') {
            data = messages.filter(m => m.event_type !== 'HONEYPOT_TRIGGER');
        } else if (logFilter === 'HONEYPOT') {
            data = messages.filter(m => m.event_type === 'HONEYPOT_TRIGGER');
        }

        const total = data.length;
        const attacks = data.filter(m => ['high', 'critical'].includes(m.severity)).length;

        // Feed limits (apply to filtered data)
        const feedLogs = data.slice(0, 150);
        const recentLogs = data.slice(0, 200).reverse();

        // Chart 1: Traffic Volume
        const timeBuckets = {};
        recentLogs.forEach(m => {
            if (!m.timestamp) return;
            const t = m.timestamp.split('T')[1].split('.')[0];
            if (!timeBuckets[t]) timeBuckets[t] = { name: t, val1: 0, val2: 0, val3: 0 };
            const c = m.geo?.country;
            if (c === 'Germany') timeBuckets[t].val1++;
            else if (c === 'USA') timeBuckets[t].val2++;
            else timeBuckets[t].val3++;
        });
        const cData = Object.values(timeBuckets).slice(-20);

        // Chart 2: Threat Detection
        const threatBuckets = {};
        recentLogs.forEach(m => {
            if (['high', 'critical'].includes(m.severity)) {
                if (!m.timestamp) return;
                const t = m.timestamp.split('T')[1].split('.')[0];
                if (!threatBuckets[t]) threatBuckets[t] = { name: t, val: 0 };
                threatBuckets[t].val++;
            }
        });
        const tData = Object.values(threatBuckets).slice(-20);

        return {
            stats: { total, attacks },
            chartData: cData,
            threatData: tData,
            filteredMessages: data // Return full filtered list for the feed component to slice itself if needed
        };
    }, [messages, logFilter]);

    return (
        <div className="flex flex-col h-full w-full bg-transparent overflow-hidden">

            {/* Header - Now part of dashboard content flow */}
            <header className="h-16 flex items-center justify-between px-8 shrink-0 border-b border-slate-800/50 bg-[#020305]/80 backdrop-blur-sm">
                <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                    <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/30">K</span>
                    <span className="text-white font-bold tracking-wider uppercase">SOC Operations Center</span>
                    <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                    <span className="text-slate-600">SYSTEM ONLINE</span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Real-Time Events</div>
                        <div className="flex gap-1 justify-end mt-1">
                            {['ALL', 'API', 'HONEYPOT'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setLogFilter(f)}
                                    className={`text-[9px] px-2 py-0.5 border ${logFilter === f ? 'bg-cyan-500 text-black border-cyan-500 font-bold' : 'border-slate-800 text-slate-600'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* SCROLLABLE GRID CONTENT */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="flex flex-col gap-6 max-w-[1920px] mx-auto min-h-[900px]">

                    {/* ROW 1: EVENTS (LEFT) | VISUAL (RIGHT) - Height 400px */}
                    <div className="grid grid-cols-12 gap-6 h-[400px] shrink-0">
                        <div className="col-span-8 h-full">
                            <CyberContainer title="REAL-TIME EVENTS FEED" headerRight={<span className="text-[10px] text-cyan-500 font-mono">50 EVENTS</span>}>
                                <div className="absolute inset-0 bg-black/40">
                                    <LiveLogFeed logs={filteredMessages} status={status} filter={logFilter} />
                                </div>
                            </CyberContainer>
                        </div>
                        <div className="col-span-4 h-full">
                            <CyberContainer title="VISUAL LIVE FEED">
                                <VideoWidget />
                            </CyberContainer>
                        </div>
                    </div>

                    {/* ROW 2: TRAFFIC (LEFT) | THREATS (RIGHT) - Height 300px */}
                    <div className="grid grid-cols-12 gap-6 h-[300px] shrink-0">
                        <div className="col-span-6 h-full">
                            <CyberContainer title="LIVE TRAFFIC VOLUME">
                                <LineChartMulti total={stats.total} data={chartData} />
                            </CyberContainer>
                        </div>
                        <div className="col-span-6 h-full">
                            <CyberContainer title="THREAT DETECTION">
                                <BarChartVertical total={stats.attacks} data={threatData} color="#ef4444" />
                            </CyberContainer>
                        </div>
                    </div>

                    {/* ROW 3: METRICS - Height 250px */}
                    <div className="grid grid-cols-4 gap-6 h-[250px] shrink-0 pb-12">
                        <CyberContainer title="INVALID SSH USERS">
                            <PieChartUsers />
                        </CyberContainer>
                        <CyberContainer title="WATCHER SSH KEY HASH">
                            <DonutChartHash />
                        </CyberContainer>
                        <CyberContainer title="INVALID SUDO">
                            <BarChartVertical total="22" data={[]} color="#ef4444" />
                        </CyberContainer>
                        <CyberContainer title="SUCCESSFUL SUDO">
                            <BarChartVertical total="84" data={[]} color="#22c55e" />
                        </CyberContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
