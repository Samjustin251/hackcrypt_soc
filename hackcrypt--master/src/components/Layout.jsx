import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="flex h-screen w-screen bg-[#020305] overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col relative h-full w-full overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
