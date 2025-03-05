import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-white-500 from-purple-800 via-blue-600 to-pink-500 text-white">
            <Navbar></Navbar>
            <main className="flex-grow">
                {children}
            </main>
           <Footer></Footer>
        </div>
    );
};

export default Layout;