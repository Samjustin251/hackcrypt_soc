import React from 'react';

const System = () => {
    return (
        <div className="animate-fade-in p-6">
            <h2 className="text-2xl font-bold mb-6 text-white">System Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="kibana-card p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-300">Server Resources</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1 text-gray-400">
                                <span>CPU Usage</span>
                                <span>45%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1 text-gray-400">
                                <span>Memory Usage</span>
                                <span>62%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1 text-gray-400">
                                <span>Disk Space</span>
                                <span>28%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="kibana-card p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-300">Services Status</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-[#16171b] rounded border border-gray-700">
                            <span className="text-gray-300">Elasticsearch</span>
                            <span className="px-2 py-1 rounded text-xs bg-green-900 text-green-300 border border-green-700">Operational</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#16171b] rounded border border-gray-700">
                            <span className="text-gray-300">Kibana</span>
                            <span className="px-2 py-1 rounded text-xs bg-green-900 text-green-300 border border-green-700">Operational</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#16171b] rounded border border-gray-700">
                            <span className="text-gray-300">Logstash</span>
                            <span className="px-2 py-1 rounded text-xs bg-yellow-900 text-yellow-300 border border-yellow-700">Degraded</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default System;
