import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, FileText } from 'lucide-react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/users');
      setUsers(res.data.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
        await api.delete(`/admin/users/${id}`);
        fetchUsers();
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 sm:px-6">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 pt-[30px]">Admin Command Center</h2>
      {loading ? (
        <div className="text-center py-20 text-slate-500 font-semibold">Loading users...</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                <th className="p-4 font-semibold text-slate-600">Email</th>
                <th className="p-4 font-semibold text-slate-600">Role</th>
                <th className="p-4 font-semibold text-slate-600">Interests Count</th>
                <th className="p-4 font-semibold text-slate-600">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                <tr key={user._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-slate-600">{user.email}</td>
                    <td className="p-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${user.role === 'Admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                        {user.role}
                    </span>
                    </td>
                    <td className="p-4 text-slate-600">{user.interests ? user.interests.length : 0}</td>
                    <td className="p-4 flex gap-3">
                        <button onClick={() => navigate(`/admin/user-notes/${user._id}`)} className="text-indigo-600 hover:text-indigo-800"><FileText size={18} /></button>
                        <button onClick={() => deleteUser(user._id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      )}
    </motion.div>
  );
};

export default AdminDashboard;
