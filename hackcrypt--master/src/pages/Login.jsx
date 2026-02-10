import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Login = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Hackathon "Access Code" - typically simplified
        if (code === 'admin' || code === '1234') {
            localStorage.setItem('auth', 'true');
            navigate('/');
        } else {
            setError(true);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden font-orbitron">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover opacity-10 blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]"></div>

            <div className="z-10 bg-black/50 p-8 rounded-lg border border-[var(--accent-primary)] backdrop-blur-md shadow-[0_0_50px_rgba(0,255,255,0.1)] max-w-sm w-full">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-[var(--accent-primary)]/10 rounded-full flex items-center justify-center border border-[var(--accent-primary)] animate-pulse">
                        <Shield className="text-[var(--accent-primary)] w-8 h-8" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-center text-white mb-2 tracking-widest">SECOPS v1.0</h1>
                <p className="text-center text-gray-500 text-sm mb-8">SECURE ACCESS REQUIRED</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            value={code}
                            onChange={(e) => { setCode(e.target.value); setError(false); }}
                            placeholder="ACCESS CODE"
                            className="w-full bg-black/60 border border-gray-700 focus:border-[var(--accent-primary)] text-white px-4 py-3 rounded text-center tracking-[0.5em] outline-none transition-all focus:shadow-[0_0_15px_rgba(0,255,255,0.2)] placeholder:tracking-normal"
                            autoFocus
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-xs text-center animate-shake">
                            ACCESS DENIED // INVALID CREDENTIALS
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[var(--accent-primary)] hover:opacity-90 text-black font-bold py-3 rounded transition-all transform active:scale-95 shadow-[0_0_20px_rgba(0,255,255,0.4)]"
                    >
                        INITIATE SESSION
                    </button>
                </form>

                <div className="mt-6 text-center text-[10px] text-gray-600 font-mono">
                    IP: 127.0.0.1 // ENCRYPTED CONNECTION
                </div>
            </div>
        </div>
    );
};

export default Login;
