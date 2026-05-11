import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, ShieldCheck, Database, LogOut } from 'lucide-react';

const Sidebar = () => (
  <aside className="w-[260px] h-screen bg-white border-r border-slate-200 sticky top-0 hidden lg:flex flex-col">
    <div className="p-6 font-bold text-xl text-indigo-700 tracking-tight">SecureNotes</div>
    <nav className="flex-1 px-4 space-y-1">
      {[
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin', label: 'Admin', icon: ShieldCheck },
        { path: '/aggregations', label: 'Aggregations', icon: Database },
      ].map(({ path, label, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
              isActive 
                ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
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
      <Link to="/" className="flex items-center gap-3 text-slate-500 font-semibold hover:text-red-600 transition-all px-4">
        <LogOut size={20} /> Logout
      </Link>
    </div>
  </aside>
);

const Layout = ({ children }) => (
  <div className="flex min-h-screen bg-slate-50">
    <Sidebar />
    <main className="flex-1 p-6 lg:p-10 overflow-auto">{children}</main>
  </div>
);

export default Layout;
