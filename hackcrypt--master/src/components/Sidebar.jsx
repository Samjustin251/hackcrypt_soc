import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Bell, Map, Server, Settings } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/alerts', icon: Bell, label: 'Alerts' },
        { path: '/threat-map', icon: Map, label: 'Threat Map' },
        { path: '/system', icon: Server, label: 'System' },
        { path: '/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <aside className="w-72 bg-[#030406] border-r border-slate-800/50 flex flex-col shrink-0 z-50 h-screen">
            <div className="h-24 flex items-center px-8 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/50 flex items-center justify-center">
                        <div className="w-3 h-3 bg-cyan-400 rotate-45 shadow-[0_0_10px_cyan]"></div>
                    </div>
                    <span className="font-display font-bold text-2xl tracking-widest text-white">SECOPS</span>
                </div>
            </div>

            <nav className="flex-1 py-8 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `flex items-center gap-4 px-6 py-4 cursor-pointer transition-all duration-300 ${isActive ? 'border-l-2 border-cyan-500 bg-cyan-900/10 text-cyan-400' : 'text-slate-500 hover:text-slate-200 hover:bg-slate-900/50 border-l-2 border-transparent'}`}
                    >
                        <item.icon size={20} strokeWidth={1.5} />
                        <span className="font-display text-xs tracking-[0.2em] uppercase">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-6 shrink-0">
                <div className="bg-slate-900/30 border border-slate-800 p-4 rounded text-[10px] font-mono">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-cyan-900/30 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">OP</div>
                        <div>
                            <div className="text-white font-bold">Operator L1</div>
                            <div className="text-slate-500">Analyst</div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
