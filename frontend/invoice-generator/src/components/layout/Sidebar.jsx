import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();

    const menuItems = [
        {
            title: 'Dashboard',
            path: '/dashboard',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            )
        },
        {
            title: 'Invoices',
            path: '/invoices',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            title: 'Create Invoice',
            path: '/invoices/new',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            )
        },
        {
            title: 'Profile',
            path: '/profile',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        }
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-40 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={toggleSidebar}
            ></div>

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Logo Area */}
                <div className="flex items-center justify-center h-20 bg-gradient-to-r from-blue-600 to-indigo-600">
                    <h1 className="text-white text-2xl font-bold tracking-wider">INVOICE AI</h1>
                </div>

                {/* Navigation */}
                <nav className="mt-8 px-4 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                                className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${isActive
                                        ? 'bg-blue-50 text-blue-600 shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <span className={`${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                                    {item.icon}
                                </span>
                                <span className="ml-3 font-medium">{item.title}</span>
                                {isActive && (
                                    <span className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Section (Optional: Help or Credits) */}
                <div className="absolute bottom-0 w-full p-4">
                    <div className="bg-indigo-50 rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-indigo-700">Need Help?</h4>
                        <p className="text-xs text-indigo-600 mt-1">Check our documentation or contact support.</p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
