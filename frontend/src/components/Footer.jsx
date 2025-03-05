import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
              
                <div>
                    <h2 className="text-2xl font-bold">DocScanner</h2>
                    <p className="mt-2 text-gray-400">
                        The ultimate solution for fast, efficient, and AI-powered document scanning and management.
                    </p>
                </div>

            
                <div>
                    <h3 className="text-xl font-semibold mb-3">Navigation</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><Link to="/" className="hover:text-white">Home</Link></li>
                        <li><Link to="/scan" className="hover:text-white">Scan Document</Link></li>
                        <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
                        <li><Link to="/signin" className="hover:text-white">Login/Register</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-3">Resources</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                        <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
                        <li><Link to="/help" className="hover:text-white">Help & Support</Link></li>
                    </ul>
                </div>

            
                <div>
                    <h3 className="text-xl font-semibold mb-3">Contact</h3>
                    <p className="text-gray-400">Email: support@docscanner.com</p>
                    <p className="text-gray-400">Phone: +123 456 7890</p>
                    <p className="text-gray-400">Address: 123 Scanner St, Tech City</p>
                </div>
            </div>
            <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-800 pt-4">
                &copy; 2025 DocScanner. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
