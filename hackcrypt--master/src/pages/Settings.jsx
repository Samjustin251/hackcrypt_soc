import React from 'react';

const Settings = () => {
    return (
        <div className="animate-fade-in p-6">
            <h2 className="text-2xl font-bold mb-6 text-white">Settings</h2>

            <div className="kibana-card max-w-2xl">
                <div className="card-header">General Configuration</div>
                <div className="card-body p-6 flex flex-col gap-6 bg-[#16171b]">

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-300">Dashboard Name</label>
                        <input type="text" defaultValue="SSH / Sudo Analysis" className="bg-[#1f222a] border border-gray-600 rounded p-2 text-white focus:border-blue-500 outline-none" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-300">Refresh Interval (seconds)</label>
                        <select className="bg-[#1f222a] border border-gray-600 rounded p-2 text-white focus:border-blue-500 outline-none">
                            <option>10s</option>
                            <option>30s</option>
                            <option>60s</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-3">
                        <input type="checkbox" id="dark-mode" checked readOnly className="w-4 h-4 rounded bg-gray-700 border-gray-600" />
                        <label htmlFor="dark-mode" className="text-sm text-gray-300">Enable Dark Mode (System Default)</label>
                    </div>

                    <div className="flex items-center gap-3">
                        <input type="checkbox" id="notifications" className="w-4 h-4 rounded bg-gray-700 border-gray-600" />
                        <label htmlFor="notifications" className="text-sm text-gray-300">Enable Desktop Notifications for High Severity Alerts</label>
                    </div>

                    <div className="pt-4 border-t border-gray-700">
                        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium transition">
                            Save Changes
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Settings;
