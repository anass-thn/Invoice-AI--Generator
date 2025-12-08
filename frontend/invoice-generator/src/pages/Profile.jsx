import React from 'react';
import { useAuth } from '../context/authcontext';

const Profile = () => {
    const { user, logout } = useAuth();

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Profile</h1>
            <p className="mb-4">User Email: {user?.email}</p>
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Logout
            </button>
        </div>
    );
};

export default Profile;
