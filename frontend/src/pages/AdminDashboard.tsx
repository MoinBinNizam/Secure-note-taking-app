import React, { useState, useEffect } from 'react';
import api from '../services/api';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface User {
    _id: string;
    email: string;
    role: 'User' | 'Admin';
    interests: string[];
}

interface Note {
    _id: string;
    title: string;
    content: string;
    ownerId: {
        _id: string;
        email: string;
    };
    createdAt: string;
    updatedAt: string;
}

const AdminDashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [allNotes, setAllNotes] = useState<Note[]>([]);
    const [usersLoading, setUsersLoading] = useState(true);
    const [notesLoading, setNotesLoading] = useState(true);
    const [usersError, setUsersError] = useState<string | null>(null);
    const [notesError, setNotesError] = useState<string | null>(null);

    useEffect(() => {
        if (user?.role !== 'Admin') {
            navigate('/unauthorized'); // Redirect if not admin
            return;
        }

        const fetchUsers = async () => {
            setUsersLoading(true);
            try {
                // Assuming an admin route to get all users
                const response = await api.get('/admin/users'); // This route doesn't exist yet, will need to be created.
                setUsers(response.data);
            } catch (err: any) {
                setUsersError(err.response?.data?.message || 'Failed to fetch users');
            } finally {
                setUsersLoading(false);
            }
        };

        const fetchAllNotes = async () => {
            setNotesLoading(true);
            try {
                // Assuming admin can see all notes via the /notes endpoint with a special flag or role check
                const response = await api.get('/notes?page=1&limit=1000'); // Fetch all notes, adjust limit as needed
                setAllNotes(response.data.data);
            } catch (err: any) {
                setNotesError(err.response?.data?.message || 'Failed to fetch all notes');
            } finally {
                setNotesLoading(false);
            }
        };

        fetchUsers();
        fetchAllNotes();
    }, [user, navigate]);

    if (!user || user.role !== 'Admin') {
        return null; // Should redirect via useNavigate in useEffect
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard</h2>

            {/* User Management */}
            <div className="bg-white p-6 border border-gray-300 shadow-md mb-8 rounded-none">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Manage Users</h3>
                {usersLoading ? (
                    <div className="text-center">Loading users...</div>
                ) : usersError ? (
                    <div className="text-red-500">{usersError}</div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interests</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((u) => (
                                <tr key={u._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.interests.join(', ')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {/* Actions like change role, delete user can go here */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* View All Notes */}
            <div className="bg-white p-6 border border-gray-300 shadow-md rounded-none">
                <h3 className="text-xl font-bold text-gray-700 mb-4">All Notes</h3>
                {notesLoading ? (
                    <div className="text-center">Loading notes...</div>
                ) : notesError ? (
                    <div className="text-red-500">{notesError}</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allNotes.length === 0 ? (
                            <p className="col-span-full text-center text-gray-600">No notes found across the system.</p>
                        ) : (
                            allNotes.map((note) => (
                                <div key={note._id} className="bg-gray-50 p-4 border border-gray-200 shadow-sm rounded-none">
                                    <h4 className="text-lg font-bold text-gray-800 mb-1">{note.title}</h4>
                                    <p className="text-gray-700 text-sm mb-2">{note.content}</p>
                                    <p className="text-xs text-gray-500">Owner: {note.ownerId.email}</p>
                                    <p className="text-xs text-gray-500">Created: {new Date(note.createdAt).toLocaleDateString()}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
