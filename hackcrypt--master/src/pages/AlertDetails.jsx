import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Clock, Server, User, Activity, CheckCircle, AlertOctagon } from 'lucide-react';

const AlertDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="animate-fade-in">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted hover:text-white mb-6 transition-colors">
                <ArrowLeft size={18} />
                Back to Alerts
            </button>

            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-bold">Brute Force SSH Attempt</h2>
                        <span className="badge badge-high text-lg px-3 py-1">High Severity</span>
                    </div>
                    <p className="text-muted flex items-center gap-2">
                        <span className="text-accent text-mono">#{id || 'ALT-1024'}</span>
                        <span>•</span>
                        <span>Detected 12 minutes ago</span>
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="btn" style={{ border: '1px solid var(--border-color)' }}>Assign Analyst</button>
                    <button className="btn btn-primary">Initiate Response</button>
                </div>
            </div>

            <div className="grid-dashboard" style={{ padding: 0 }}>
                {/* Main Info */}
                <div style={{ gridColumn: 'span 3' }} className="flex flex-col gap-6">
                    {/* AI Analysis Card (Mocked) */}
                    <div className="card border-2 border-[var(--accent-primary)] bg-opacity-20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent animate-pulse"></div>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-[var(--accent-primary)]">
                            <Activity size={20} />
                            AI Threat Analysis
                        </h3>
                        <div className="flex gap-4 items-start">
                            <div className="min-w-[40px] h-[40px] rounded-full bg-[var(--accent-primary)] bg-opacity-20 flex items-center justify-center">
                                <span className="font-bold text-[var(--accent-primary)]">AI</span>
                            </div>
                            <div className="space-y-3">
                                <p className="text-white text-sm leading-relaxed">
                                    <strong className="text-[var(--accent-primary)]">Confidence Score: 98%</strong> -
                                    Analysis indicates a high probability of automated brute-force utilizing the <span className="text-mono bg-white/10 px-1 rounded">Hydra</span> toolset.
                                </p>
                                <p className="text-gray-400 text-sm">
                                    The attack pattern correlates with known botnet activity originating from the 203.0.x.x subnet. Recommended immediate action is IP blocking and password rotation for user 'root'.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Summary Card */}
                    <div className="card">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Activity size={20} className="text-accent" />
                            Incident Summary
                        </h3>
                        <p className="text-secondary mb-4">
                            Multiple failed login attempts detected on port 22 (SSH) originating from external IP 203.0.113.5.
                            The pattern matches known brute-force signatures. System firewall automatically triggered rate-limiting.
                        </p>
                        <div className="flex gap-8 border-t border-slate-800 pt-4">
                            <div>
                                <span className="block text-sm text-muted mb-1">Source IP</span>
                                <span className="font-mono text-accent">203.0.113.5</span>
                            </div>
                            <div>
                                <span className="block text-sm text-muted mb-1">Target Asset</span>
                                <span className="font-mono">srv-db-prod-02</span>
                            </div>
                            <div>
                                <span className="block text-sm text-muted mb-1">Protocol</span>
                                <span className="font-mono">SSH (TCP/22)</span>
                            </div>
                            <div>
                                <span className="block text-sm text-muted mb-1">Attempts</span>
                                <span className="font-mono text-red-400">452 / 10s</span>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="card">
                        <h3 className="text-lg font-bold mb-6">Incident Timeline</h3>
                        <div className="relative border-l border-slate-700 ml-4 space-y-8 pb-4">

                            <div className="relative pl-8">
                                <span className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-red-500 ring-4 ring-slate-900"></span>
                                <div className="text-sm text-accent mb-1">10:38:45 AM</div>
                                <div className="font-bold text-white mb-1">Threshold Exceeded</div>
                                <div className="text-sm text-muted">Login failure rate exceeded 50 attempts per second.</div>
                            </div>

                            <div className="relative pl-8">
                                <span className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-slate-600 ring-4 ring-slate-900"></span>
                                <div className="text-sm text-muted mb-1">10:38:30 AM</div>
                                <div className="font-bold text-secondary mb-1">First Detection</div>
                                <div className="text-sm text-muted">Initial specialized signature match for "SSH_BRUTE_FORCE_Generic".</div>
                            </div>

                            <div className="relative pl-8">
                                <span className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-green-500 ring-4 ring-slate-900"></span>
                                <div className="text-sm text-muted mb-1">10:30:00 AM</div>
                                <div className="font-bold text-secondary mb-1">Automated Block</div>
                                <div className="text-sm text-muted">Firewall rule #492 applied blocking source IP for 1 hour.</div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Side Panel */}
                <div style={{ gridColumn: 'span 1' }} className="flex flex-col gap-6">
                    <div className="card">
                        <h3 className="text-sm font-bold text-muted mb-4 uppercase">Asset Details</h3>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-slate-800 rounded">
                                <Server size={24} />
                            </div>
                            <div>
                                <div className="font-bold">srv-db-prod-02</div>
                                <div className="text-xs text-muted">Production Database</div>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted">OS</span>
                                <span>Ubuntu 22.04 LTS</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted">Owner</span>
                                <span>DevOps Team</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted">Criticality</span>
                                <span className="text-red-400">High</span>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h3 className="text-sm font-bold text-muted mb-4 uppercase">Recommended Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full text-left p-3 rounded bg-slate-800 hover:bg-slate-700 transition flex items-center gap-3">
                                <Shield size={16} className="text-green-400" />
                                <span className="text-sm">Permanent IP Ban</span>
                            </button>
                            <button className="w-full text-left p-3 rounded bg-slate-800 hover:bg-slate-700 transition flex items-center gap-3">
                                <User size={16} className="text-blue-400" />
                                <span className="text-sm">Reset User Check</span>
                            </button>
                            <button className="w-full text-left p-3 rounded bg-slate-800 hover:bg-slate-700 transition flex items-center gap-3">
                                <AlertOctagon size={16} className="text-orange-400" />
                                <span className="text-sm">Escalate to Tier 2</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Responsive Fix: on mobile, span full width */}
                <style>{`
                @media (max-width: 1024px) {
                    .grid-dashboard > div { grid-column: span 4 !important; }
                }
            `}</style>
            </div>
        </div>
    );
};

export default AlertDetails;
