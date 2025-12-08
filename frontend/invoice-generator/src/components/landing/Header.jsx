import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white shadow-md fixed w-full z-10 top-0">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold text-blue-600">
                    <Link to="/">ai invoice app</Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                    <a href="#features" className="text-gray-600 hover:text-blue-600 transition duration-300">Features</a>
                    <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition duration-300">Testimonials</a>
                    <a href="#faq" className="text-gray-600 hover:text-blue-600 transition duration-300">FAQ</a>
                </nav>

                {/* Auth Buttons */}
                <div className="hidden md:flex space-x-4">
                    <Link to="/login" className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition duration-300">Login</Link>
                    <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">Sign Up</Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="flex flex-col px-4 py-2 space-y-2">
                        <a href="#features" className="block py-2 text-gray-600 hover:text-blue-600" onClick={toggleMenu}>Features</a>
                        <a href="#testimonials" className="block py-2 text-gray-600 hover:text-blue-600" onClick={toggleMenu}>Testimonials</a>
                        <a href="#faq" className="block py-2 text-gray-600 hover:text-blue-600" onClick={toggleMenu}>FAQ</a>
                        <div className="border-t pt-2 flex flex-col space-y-2">
                            <Link to="/login" className="block w-full text-center px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50" onClick={toggleMenu}>Login</Link>
                            <Link to="/signup" className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={toggleMenu}>Sign Up</Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
