import React, { useEffect, useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

const COUNTRY_COORDS = {
    'USA': { x: 200, y: 150 },
    'Germany': { x: 480, y: 140 },
    'China': { x: 750, y: 180 },
    'Russia': { x: 700, y: 100 },
    'Unknown': { x: 100, y: 350 }, // Ocean/Unknown
    'Unknown Local': { x: 500, y: 280 } // Honeypot (Close to Server)
};

const ThreatMap = () => {
    // 1. Connect to Real Data
    const { messages } = useWebSocket('ws://localhost:8000/ws');
    const [attacks, setAttacks] = useState([]);

    // Track processed logs to avoid re-animating duplicates
    const processedIdsRef = React.useRef(new Set());

    useEffect(() => {
        if (messages.length === 0) return;

        // Process only specific recent messages to avoid flood
        const recent = messages.slice(0, 5); // Look at last 5
        const newAttacks = [];

        recent.forEach(msg => {
            // Simple unique ID logic (timestamp + ip)
            const id = `${msg.timestamp}-${msg.source_ip}`;

            if (!processedIdsRef.current.has(id)) {
                processedIdsRef.current.add(id);

                // Keep set small
                if (processedIdsRef.current.size > 500) {
                    const it = processedIdsRef.current.values();
                    processedIdsRef.current.delete(it.next().value);
                }

                // Resolve Coords
                let country = msg.geo?.country || 'Unknown';
                // Honeypot override
                if (msg.event_type === 'HONEYPOT_TRIGGER') country = 'Unknown Local';

                const coords = COUNTRY_COORDS[country] || COUNTRY_COORDS['Unknown'];

                // Jitter
                const startX = coords.x + (Math.random() * 40 - 20);
                const startY = coords.y + (Math.random() * 40 - 20);

                newAttacks.push({
                    id,
                    startX,
                    startY,
                    endX: 500,
                    endY: 250,
                    created: Date.now(),
                    severity: msg.severity
                });
            }
        });

        if (newAttacks.length > 0) {
            setAttacks(prev => [...prev, ...newAttacks].slice(-20)); // Keep DOM light
        }

    }, [messages]);

    return (
        <div className="card h-full flex flex-col p-0 overflow-hidden relative" style={{ backgroundColor: '#0f172a' }}>
            <div className="absolute top-4 left-4 z-10">
                <h3 className="text-sm font-bold text-muted uppercase tracking-wider backdrop-blur-sm bg-slate-900/50 p-2 rounded border border-slate-700">Live Threat Map</h3>
            </div>

            <div className="flex-1 w-full h-full relative">
                <svg viewBox="0 0 1000 500" className="w-full h-full object-cover opacity-80" style={{ filter: 'drop-shadow(0 0 20px rgba(56, 189, 248, 0.2))' }}>
                    <defs>
                        <radialGradient id="mapGradient" cx="0.5" cy="0.5" r="0.5">
                            <stop offset="0%" stopColor="#1e293b" />
                            <stop offset="100%" stopColor="#020617" />
                        </radialGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                            <circle cx="2" cy="2" r="1.5" fill="var(--severity-high)" />
                        </marker>
                    </defs>

                    {/* Background Grid */}
                    <rect width="100%" height="100%" fill="url(#mapGradient)" />
                    <path d="M0,50 h1000 M0,150 h1000 M0,250 h1000 M0,350 h1000 M0,450 h1000" stroke="var(--border-color)" strokeWidth="0.5" strokeOpacity="0.1" />
                    <path d="M100,0 v500 M300,0 v500 M500,0 v500 M700,0 v500 M900,0 v500" stroke="var(--border-color)" strokeWidth="0.5" strokeOpacity="0.1" />

                    {/* World Map Outline (Simplified) */}
                    <g stroke="#334155" strokeWidth="1.5" fill="#1e293b" fillOpacity="0.5">
                        <path d="M150,150 Q200,100 300,150 T450,200 T600,150 T800,200 T900,350 L850,400 Q750,450 650,400 T450,420 T250,350 L150,150 Z" />
                    </g>

                    {/* Server Marker */}
                    <g filter="url(#glow)">
                        <circle cx="500" cy="250" r="8" fill="var(--accent-primary)" fillOpacity="0.2">
                            <animate attributeName="r" values="8;16;8" dur="4s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.5;0;0.5" dur="4s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="500" cy="250" r="4" fill="var(--accent-primary)" stroke="white" strokeWidth="2" />
                        <text x="515" y="255" fill="white" fontSize="12" fontWeight="bold" style={{ textShadow: '0 0 10px cyan' }}>HQ SERVER</text>
                    </g>

                    {/* Attack Sources Visuals */}
                    {Object.entries(COUNTRY_COORDS).map(([name, pos]) => (
                        name !== 'Unknown' && name !== 'Unknown Local' && (
                            <circle key={name} cx={pos.x} cy={pos.y} r="2" fill="#64748b" opacity="0.5">
                                {/* Only pulse if there are attacks from here? Simpler to just static pulse for "Active Regions" */}
                            </circle>
                        )
                    ))}


                    {/* Attack Lines */}
                    {attacks.map(attack => (
                        <g key={attack.id}>
                            <circle cx={attack.startX} cy={attack.startY} r="3" fill={attack.severity === 'critical' ? '#ef4444' : 'var(--severity-high)'} opacity="0.8">
                                <animate attributeName="opacity" values="1;0" dur="1.5s" begin="0s" fill="freeze" />
                                <animate attributeName="r" values="3;10" dur="1.5s" begin="0s" fill="freeze" />
                            </circle>
                            <line
                                x1={attack.startX} y1={attack.startY}
                                x2={attack.endX} y2={attack.endY}
                                stroke={attack.severity === 'critical' ? '#ef4444' : 'var(--severity-high)'}
                                strokeWidth={attack.severity === 'critical' ? 2 : 1}
                                strokeOpacity="0.8"
                                markerEnd="url(#arrowhead)"
                                filter={attack.severity === 'critical' ? "url(#glow)" : ""}
                            >
                                <animate attributeName="stroke-dasharray" from="0,1000" to="1000,0" dur={attack.severity === 'critical' ? "0.5s" : "1.5s"} fill="freeze" />
                            </line>
                        </g>
                    ))}

                </svg>

                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur border border-green-500/30 p-2 rounded text-xs text-green-400 font-mono animate-pulse">
                    ● SYSTEM MONITORING ACTIVE
                </div>

                <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur border border-slate-700 p-2 rounded text-xs text-secondary w-48">
                    <div className="flex justify-between mb-1">
                        <span>Attacks / sec</span>
                        {/* Dynamic calc based on messages length for fun */}
                        <span className="text-red-400 font-mono">{attacks.length * 2}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ThreatMap;
