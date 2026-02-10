import React, { useRef, useEffect } from 'react';

const VideoWidget = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 1.0;
        }
    }, []);

    return (
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-black">
            {/* Target Overlay */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 pointer-events-none">
                <div className="text-[10px] text-slate-500 font-mono">CAM_01</div>
                <div className="text-red-500 text-xs font-bold font-mono animate-pulse">● LIVE</div>
            </div>

            {/* Video Player */}
            <video
                ref={videoRef}
                className="w-full h-full object-cover opacity-60 grayscale-[50%] contrast-125"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/assets/v-Picwand.mp4" type="video/mp4" />
            </video>

            {/* Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,50,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,50,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] z-10"></div>

            {/* Center Reticle */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="w-32 h-32 border border-dashed border-cyan-500/30 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-cyan-500/50 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default VideoWidget;
