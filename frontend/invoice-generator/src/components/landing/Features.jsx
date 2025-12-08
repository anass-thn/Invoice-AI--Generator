import React from 'react';

const Features = () => {
    return (
        <section id="features" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Powerful Features for Smart Invoicing</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Feature 1: AI Invoice Creation */}
                    <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:shadow-xl transition duration-300 border border-blue-100">
                        <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-6 text-white">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-800">AI Invoice Creation</h3>
                        <p className="text-gray-600 text-sm">Generate professional invoices instantly with AI. Just describe your work and let our smart system create perfectly formatted invoices.</p>
                    </div>

                    {/* Feature 2: AI-Powered Dashboard */}
                    <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-xl transition duration-300 border border-purple-100">
                        <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center mb-6 text-white">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-800">AI-Powered Dashboard</h3>
                        <p className="text-gray-600 text-sm">Get intelligent insights into your business. Track revenue, monitor payment trends, and receive AI-driven recommendations.</p>
                    </div>

                    {/* Feature 3: Smart Reminders */}
                    <div className="p-8 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl hover:shadow-xl transition duration-300 border border-green-100">
                        <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mb-6 text-white">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-800">Smart Reminders</h3>
                        <p className="text-gray-600 text-sm">Never miss a payment again. Automated reminders for overdue invoices and upcoming payment deadlines keep your cash flow healthy.</p>
                    </div>

                    {/* Feature 4: Easy Invoice Management */}
                    <div className="p-8 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl hover:shadow-xl transition duration-300 border border-orange-100">
                        <div className="w-14 h-14 bg-orange-600 rounded-full flex items-center justify-center mb-6 text-white">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-800">Easy Invoice Management</h3>
                        <p className="text-gray-600 text-sm">Organize, search, and filter all your invoices in one place. Export reports, track statuses, and manage clients effortlessly.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
