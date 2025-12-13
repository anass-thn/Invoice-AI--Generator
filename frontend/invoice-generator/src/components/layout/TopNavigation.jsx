import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/authcontext';
import { useNavigate } from 'react-router-dom';

const TopNavigation = ({ toggleSidebar }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-sm h-20 flex items-center justify-between px-6 lg:px-10">
            {/* Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Right Side: Profile & Actions */}
            <div className="flex items-center space-x-4 ml-auto">
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center space-x-3 focus:outline-none group"
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{user?.name || 'User'}</p>
                            <p className="text-xs text-gray-500">{user?.email || 'email@example.com'}</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white group-hover:ring-blue-100 transition-all">
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg py-1 border border-gray-100 transform origin-top-right transition-all">
                            <div className="px-4 py-2 border-b border-gray-50 sm:hidden">
                                <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                            </div>
                            <button
                                onClick={() => {
                                    setIsDropdownOpen(false);
                                    navigate('/profile');
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                            >
                                Your Profile
                            </button>
                            <button
                                onClick={() => {
                                    setIsDropdownOpen(false);
                                    navigate('/invoices');
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                            >
                                Invoices
                            </button>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                            >
                                Sign out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopNavigation;
