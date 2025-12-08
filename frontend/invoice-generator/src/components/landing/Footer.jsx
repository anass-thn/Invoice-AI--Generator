import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4 text-center">
                <p className="mb-4">&copy; 2025 AI Invoice App. All rights reserved.</p>
                <div className="space-x-4 text-gray-400">
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms of Service</a>
                    <a href="#" className="hover:text-white">Contact Us</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
