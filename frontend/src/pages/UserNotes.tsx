import React, { useState, useEffect } from 'react';
import api from '../services/api';
import useAuth from '../hooks/useAuth';

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

const UserNotes: React.FC = () => {
    const { user } = useAuth();
    const [notes, setNotes] = useState<Note[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteContent, setNewNoteContent] = useState('');
    const [editingNote, setEditingNote] = useState<Note | null>(null);

    const fetchNotes = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/notes?page=${page}&limit=5`);
            setNotes(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch notes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, [page]);

    const handleCreateUpdateNote = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            if (editingNote) {
                // Update existing note
                await api.put(`/notes/${editingNote._id}`, {
                    title: newNoteTitle,
                    content: newNoteContent,
                });
                setEditingNote(null);
            } else {
                // Create new note
                await api.post('/notes', {
                    title: newNoteTitle,
                    content: newNoteContent,
                });
            }
            setNewNoteTitle('');
            setNewNoteContent('');
            fetchNotes(); // Refresh notes list
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to save note');
        }
    };

    const handleDeleteNote = async (noteId: string) => {
        if (!window.confirm('Are you sure you want to delete this note?')) return;
        setError(null);
        try {
            await api.delete(`/notes/${noteId}`);
            fetchNotes(); // Refresh notes list
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to delete note');
        }
    };

    const startEditing = (note: Note) => {
        setEditingNote(note);
        setNewNoteTitle(note.title);
        setNewNoteContent(note.content);
    };

    if (loading) return <div className="text-center p-4">Loading notes...</div>;
    if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Notes</h2>

            {/* Note Create/Edit Form */}
            <div className="bg-white p-6 border border-gray-300 shadow-md mb-8 rounded-none">
                <h3 className="text-xl font-bold text-gray-700 mb-4">{editingNote ? 'Edit Note' : 'Create New Note'}</h3>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleCreateUpdateNote} className="space-y-4">
                    <div>
                        <label htmlFor="noteTitle" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="noteTitle"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-none"
                            value={newNoteTitle}
                            onChange={(e) => setNewNoteTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="noteContent" className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea
                            id="noteContent"
                            rows={5}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-none"
                            value={newNoteContent}
                            onChange={(e) => setNewNoteContent(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-end space-x-2">
                        {editingNote && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingNote(null);
                                    setNewNoteTitle('');
                                    setNewNoteContent('');
                                }}
                                className="py-2 px-4 border border-gray-300 font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-none"
                            >
                                Cancel Edit
                            </button>
                        )}
                        <button
                            type="submit"
                            className="py-2 px-4 border border-transparent font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-none"
                        >
                            {editingNote ? 'Update Note' : 'Create Note'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Notes List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.length === 0 ? (
                    <p className="col-span-full text-center text-gray-600">No notes found.</p>
                ) : (
                    notes.map((note) => (
                        <div key={note._id} className="bg-white p-6 border border-gray-300 shadow-md rounded-none flex flex-col justify-between">
                            <div>
                                <h4 className="text-xl font-bold text-gray-800 mb-2">{note.title}</h4>
                                <p className="text-gray-700 mb-4 text-sm">{note.content}</p>
                                <p className="text-xs text-gray-500">Created: {new Date(note.createdAt).toLocaleDateString()}</p>
                                <p className="text-xs text-gray-500">Last Updated: {new Date(note.updatedAt).toLocaleDateString()}</p>
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    onClick={() => startEditing(note)}
                                    className="py-1 px-3 bg-blue-600 text-white rounded-none hover:bg-blue-700 text-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteNote(note._id)}
                                    className="py-1 px-3 bg-red-600 text-white rounded-none hover:bg-red-700 text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="py-2 px-4 border border-gray-300 rounded-none bg-white hover:bg-gray-100 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-gray-700">Page {page} of {totalPages}</span>
                    <button
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        className="py-2 px-4 border border-gray-300 rounded-none bg-white hover:bg-gray-100 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserNotes;
