import React from 'react';
import { motion } from 'framer-motion';

const RadarPulse = () => {
    return (
        <div className="kibana-card h-full relative overflow-hidden flex items-center justify-center bg-black/40">
            {/* Header Overlay */}
            <div className="absolute top-0 left-0 w-full p-2 border-b border-gray-800 bg-black/60 z-10 flex justify-between">
                <span className="text-xs font-bold text-cyan-400">ACTIVE SCAN</span>
                <span className="text-[10px] text-gray-500 animate-pulse">MONITORING...</span>
            </div>

            {/* Grid Background */}
            <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(#1f2937 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                opacity: 0.3
            }}></div>

            {/* Radar Sweep Animation */}
            <div className="relative w-64 h-64 rounded-full border border-cyan-900/50 flex items-center justify-center">
                {/* Inner Rings */}
                <div className="absolute w-48 h-48 rounded-full border border-cyan-900/30"></div>
                <div className="absolute w-32 h-32 rounded-full border border-cyan-900/30"></div>
                <div className="absolute w-4 h-4 rounded-full bg-cyan-500/50 shadow-[0_0_10px_cyan]"></div>

                {/* Rotating Sweep Line */}
                <motion.div
                    className="absolute w-32 h-32 origin-bottom-right"
                    style={{
                        background: 'conic-gradient(from 0deg, transparent 70%, rgba(6,182,212,0.3) 100%)',
                        borderRight: '1px solid rgba(6,182,212,0.6)',
                        top: 0,
                        left: 0,
                        borderRadius: '100% 0 0 0'
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                />

                {/* Random Blips */}
                <motion.div
                    className="absolute w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_red]"
                    style={{ top: '20%', right: '30%' }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                />
                <motion.div
                    className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_8px_yellow]"
                    style={{ bottom: '25%', left: '20%' }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
                />
            </div>

            {/* Decoding Text Effect */}
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-cyan-700/80">
                <p>{`> ENCRYPTION: AES-256`}</p>
                <p>{`> PACKETS: 14,029/s`}</p>
                <p>{`> LATENCY: 12ms`}</p>
            </div>
        </div>
    );
};

export default RadarPulse;
