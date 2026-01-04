import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authcontext';
import { User, Mail, Briefcase, MapPin, Phone, Edit2, Check, X, Building } from 'lucide-react';

const InputField = ({ label, name, value, onChange, icon: Icon, type = "text", disabled = false, isEditing = false }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                disabled={!isEditing || disabled}
                className={`block w-full pl-10 pr-3 py-2 border ${!isEditing ? 'bg-gray-50 border-gray-200 text-gray-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                    } rounded-md shadow-sm sm:text-sm transition-colors duration-200`}
            />
        </div>
    </div>
);

const Profile = () => {
    const { user, updateProfile, error: authError } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        businessName: '',
        adress: '',
        phoneNumber: ''
    });

    // Initialize form data when user data is available
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                businessName: user.businessName || '',
                adress: user.adress || '',
                phoneNumber: user.phoneNumber || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', content: '' });

        const result = await updateProfile(formData);

        if (result.success) {
            setMessage({ type: 'success', content: 'Profile updated successfully!' });
            setIsEditing(false);
            // Clear success message after 3 seconds
            setTimeout(() => setMessage({ type: '', content: '' }), 3000);
        } else {
            setMessage({ type: 'error', content: result.error || 'Failed to update profile' });
        }
        setLoading(false);
    };

    const handleCancel = () => {
        // Reset form to current user data
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                businessName: user.businessName || '',
                adress: user.adress || '',
                phoneNumber: user.phoneNumber || ''
            });
        }
        setIsEditing(false);
        setMessage({ type: '', content: '' });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 sm:px-10">
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                            <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <span className="text-3xl font-bold text-white">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="text-white text-center sm:text-left">
                                <h1 className="text-2xl font-bold">{user?.name}</h1>
                                <p className="text-blue-100">{user?.email}</p>
                            </div>
                        </div>

                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors backdrop-blur-sm border border-white/20"
                            >
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-10">
                    {/* Messages */}
                    {message.content && (
                        <div className={`mb-6 p-4 rounded-lg flex items-center ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                            {message.type === 'success' ? <Check className="w-5 h-5 mr-2" /> : <X className="w-5 h-5 mr-2" />}
                            {message.content}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <div className="md:col-span-2">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <User className="w-5 h-5 mr-2 text-indigo-600" />
                                    Personal Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField
                                        label="Full Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        icon={User}
                                        isEditing={isEditing}
                                    />
                                    <InputField
                                        label="Email Address"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        icon={Mail}
                                        isEditing={isEditing}
                                    />
                                </div>
                            </div>

                            {/* Separator */}
                            <div className="md:col-span-2 border-t border-gray-100 my-2"></div>

                            {/* Business Information */}
                            <div className="md:col-span-2">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <Building className="w-5 h-5 mr-2 text-indigo-600" />
                                    Business Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField
                                        label="Business Name"
                                        name="businessName"
                                        value={formData.businessName}
                                        onChange={handleChange}
                                        icon={Briefcase}
                                        isEditing={isEditing}
                                    />
                                    <InputField
                                        label="Phone Number"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        icon={Phone}
                                        isEditing={isEditing}
                                    />
                                    <div className="md:col-span-2">
                                        <InputField
                                            label="Business Address"
                                            name="adress" // Keeping 'adress' as per backend model
                                            value={formData.adress}
                                            onChange={handleChange}
                                            icon={MapPin}
                                            isEditing={isEditing}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {isEditing && (
                            <div className="mt-8 flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center shadow-lg shadow-indigo-200 transition-all hover:shadow-xl hover:scale-105"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-4 h-4 mr-2" />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
