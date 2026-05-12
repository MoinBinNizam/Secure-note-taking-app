import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShieldCheck, Database, LogOut, Menu, X, FileText, Settings, Tag } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

const Sidebar = ({ isOpen, toggle }) => {
    const token = localStorage.getItem('token');
    let isAdmin = false;
    try {
        if (token) {
            isAdmin = localStorage.getItem('role') === 'Admin';
        }
    } catch (e) { console.error(e); }

    const links = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/dashboard/notes', label: 'Notes', icon: FileText },
        { path: '/dashboard/interests', label: 'Interests', icon: Tag },
        { path: '/dashboard/settings', label: 'Settings', icon: Settings },
        ...(isAdmin ? [
            { path: '/admin', label: 'Admin', icon: ShieldCheck },
            { path: '/aggregations', label: 'Aggregations', icon: Database },
        ] : []),
    ];

    return (
        <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-50 w-64 h-full bg-white border-r border-slate-200 flex flex-col transition-transform duration-300`}>
            <div className="p-6 font-bold text-xl text-indigo-700 tracking-tight flex justify-between items-center">
                SecureNotes
                <button onClick={toggle} className="lg:hidden p-2 text-slate-500"><X size={20} /></button>
            </div>
            <nav className="flex-1 px-4 space-y-1">
                {links.map(({ path, label, icon: Icon }) => (
                    <NavLink
                        key={path}
                        to={path}
                        onClick={() => toggle && toggle()}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                                isActive 
                                    ? 'bg-indigo-50 text-indigo-700' 
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
                            }`
                        }
                    >
                        <Icon size={20} />
                        {label}
                    </NavLink>
                ))}
            </nav>
            <div className="p-6 border-t border-slate-100">
                <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }} className="w-full flex items-center gap-3 text-slate-500 font-semibold hover:text-red-600 transition-all px-4">
                    <LogOut size={20} /> Logout
                </button>
            </div>
        </aside>
    );
};

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar isOpen={isSidebarOpen} toggle={() => setSidebarOpen(!isSidebarOpen)} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between">
            <div className="font-bold text-lg text-indigo-700">SecureNotes</div>
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                <Menu size={24} />
            </button>
        </header>
        <main className="flex-1 p-6 lg:p-10 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;