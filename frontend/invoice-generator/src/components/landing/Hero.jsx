import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="pt-32 pb-20 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
                    Smart Invoicing for <span className="text-blue-600">Modern Businesses</span>
                </h1>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                    Create, track, and manage professional invoices in seconds with our AI-powered platform.
                </p>
                <div className="space-x-4">
                    <Link to="/signup" className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg">
                        Get Started Free
                    </Link>
                    <Link to="/login" className="px-8 py-4 bg-white text-blue-600 border border-blue-200 rounded-lg text-lg font-semibold hover:bg-gray-50 transition duration-300 shadow-sm">
                        Login
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
