import React, { useState, useEffect } from 'react';
import api from '../services/api';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface UserDetail {
    _id: string;
    email: string;
    role: 'User' | 'Admin';
}

interface InterestGroup {
    interest: string;
    users: UserDetail[];
    count: number;
}

interface PostDetail {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
}

interface UserWithPosts {
    _id: string;
    email: string;
    role: 'User' | 'Admin';
    posts: PostDetail[];
}

const AggregationView: React.FC = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [interestsData, setInterestsData] = useState<InterestGroup[]>([]);
    const [userPostsData, setUserPostsData] = useState<UserWithPosts | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<string>(''); // For fetching posts of a specific user
    const [loadingInterests, setLoadingInterests] = useState(true);
    const [loadingUserPosts, setLoadingUserPosts] = useState(false);
    const [errorInterests, setErrorInterests] = useState<string | null>(null);
    const [errorUserPosts, setErrorUserPosts] = useState<string | null>(null);

    // Fetch users grouped by interests
    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchInterestsData = async () => {
            setLoadingInterests(true);
            try {
                const response = await api.get('/aggregations/interests');
                setInterestsData(response.data);
            } catch (err: any) {
                setErrorInterests(err.response?.data?.message || 'Failed to fetch interests data');
            } finally {
                setLoadingInterests(false);
            }
        };

        fetchInterestsData();
    }, [isAuthenticated]);

    // Fetch posts for a specific user
    const handleFetchUserPosts = async () => {
        if (!selectedUserId) {
            setErrorUserPosts('Please enter a User ID');
            return;
        }
        setLoadingUserPosts(true);
        setErrorUserPosts(null);
        try {
            const response = await api.get(`/aggregations/user-posts/${selectedUserId}`);
            setUserPostsData(response.data);
        } catch (err: any) {
            setErrorUserPosts(err.response?.data?.message || 'Failed to fetch user posts');
            setUserPostsData(null);
        } finally {
            setLoadingUserPosts(false);
        }
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />; // Should be handled by ProtectedRoute, but good fallback
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">MongoDB Aggregation Scenarios</h2>

            {/* Group by Interests */}
            <div className="bg-white p-6 border border-gray-300 shadow-md mb-8 rounded-none">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Users Grouped by Interests</h3>
                {loadingInterests ? (
                    <div className="text-center">Loading interests...</div>
                ) : errorInterests ? (
                    <div className="text-red-500">{errorInterests}</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {interestsData.length === 0 ? (
                            <p className="col-span-full text-center text-gray-600">No interest groups found.</p>
                        ) : (
                            interestsData.map((group) => (
                                <div key={group.interest} className="bg-gray-50 p-4 border border-gray-200 shadow-sm rounded-none">
                                    <h4 className="text-lg font-bold text-gray-800 mb-1">{group.interest} ({group.count} users)</h4>
                                    <ul className="list-disc list-inside text-sm text-gray-700">
                                        {group.users.map((u) => (
                                            <li key={u._id}>{u.email} ({u.role})</li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* User Posts with $lookup */}
            <div className="bg-white p-6 border border-gray-300 shadow-md rounded-none">
                <h3 className="text-xl font-bold text-gray-700 mb-4">User Posts with $lookup</h3>
                <div className="flex mb-4">
                    <input
                        type="text"
                        placeholder="Enter User ID"
                        className="flex-grow px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-none mr-2"
                        value={selectedUserId}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                    />
                    <button
                        onClick={handleFetchUserPosts}
                        className="py-2 px-4 border border-transparent font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-none"
                        disabled={loadingUserPosts}
                    >
                        {loadingUserPosts ? 'Fetching...' : 'Fetch User Posts'}
                    </button>
                </div>
                {errorUserPosts && <div className="text-red-500 text-center mb-4">{errorUserPosts}</div>}
                {userPostsData && (
                    <div className="bg-gray-50 p-4 border border-gray-200 shadow-sm rounded-none">
                        <h4 className="text-lg font-bold text-gray-800 mb-1">Posts for {userPostsData.email} ({userPostsData.role})</h4>
                        {userPostsData.posts.length === 0 ? (
                            <p className="text-gray-600">No posts found for this user.</p>
                        ) : (
                            <ul className="list-disc list-inside text-sm text-gray-700">
                                {userPostsData.posts.map((post) => (
                                    <li key={post._id} className="mb-1">
                                        <strong>{post.title}</strong>: {post.content} (Created: {new Date(post.createdAt).toLocaleDateString()})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AggregationView;
