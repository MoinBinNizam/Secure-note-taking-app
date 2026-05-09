import React from 'react';
import { NavLink } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const navLinks = [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/admin', label: 'Admin' },
        { path: '/aggregations', label: 'Aggregations' },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Desktop Sidebar */}
            <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white p-6 lg:flex">
                <h1 className="mb-8 text-xl font-bold text-indigo-700">NoteApp</h1>
                <nav className="flex flex-1 flex-col space-y-2">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `rounded-xl px-4 py-3 font-semibold transition ${
                                    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="mt-auto border-t border-slate-100 pt-6">
                    <button className="text-sm font-semibold text-slate-500 hover:text-slate-800">
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile/Tablet Content Area */}
            <main className="flex-1 overflow-auto p-4 lg:p-8">
                {children}
            </main>

            {/* Bottom Nav for Mobile */}
            <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-slate-200 bg-white p-4 lg:hidden">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `p-2 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`
                        }
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Layout;
