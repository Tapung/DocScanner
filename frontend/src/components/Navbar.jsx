import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from "../components/Log_register.jsx";
import { useAppContext } from "../context/AuthContext.jsx";
import { logoutUser } from "../Api_clients.jsx";  
import Cookies from "js-cookie";  

const Navbar = () => {
    const { isLoggedIn, user, refetchUser } = useAppContext();
    const [modalOpen, setModalOpen] = useState(false);
    const [role, setRole] = useState("user"); 
    const [menuOpen, setMenuOpen] = useState(false);  


    console.log(user)
    
    const handleLogout = async () => {
        try {
            await logoutUser();  
            Cookies.remove("token"); 
            Cookies.remove("session");  
            localStorage.clear();  
            sessionStorage.clear();  
            refetchUser(); 
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <header className="bg-gray-900 shadow-md sticky top-0 w-full z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
              
                <Link to="/" className="text-2xl font-bold text-red-200">
                    DocScanner
                </Link>

             
                <button 
                    className="text-white text-2xl md:hidden focus:outline-none" 
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? "❌" : "📖"}
                </button>
 
                <nav className="hidden md:flex items-center gap-4">
                    {isLoggedIn ? (   
                        <>
                            <div className="flex flex-row items-center gap-x-2">
                                        {user.role !== "admin" && (
                                                    <span className="text-gray-300 border border-blue-600 px-2 py-1 sm:px-3 sm:py-2 rounded-sm bg-blue-500 font-bold text-sm md:text-base">
                                                        Credits {user.credits}
                                                    </span>
                                                )} 
                                         <span className="text-gray-300 border border-blue-600 px-2 py-1 sm:px-3 sm:py-2 rounded-sm bg-blue-500 font-bold text-sm md:text-base">
                                    {user.username}
                                </span>
                            </div>

                            <button 
                                onClick={handleLogout} 
                                className="bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-red-800 transition-all text-sm sm:text-base w-auto"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => { setRole("user"); setModalOpen(true); }}
                                className="bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-900 transition-all"
                            >
                                User Login
                            </button>
                            <button
                                onClick={() => { setRole("admin"); setModalOpen(true); }}
                                className="bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-yellow-700 transition-all"
                            >
                                Admin Login
                            </button>
                        </>
                    )}
                </nav>
            </div>
 
            {menuOpen && (
                <div className="md:hidden flex flex-col items-center gap-4 bg-gray-800 py-4">
                    {isLoggedIn ? (
                        <>
                            <span className="text-gray-300 border border-blue-600 px-3 py-2 rounded-sm bg-blue-500 font-bold text-sm md:text-base">
                                Credits {user.credits}
                            </span>
                            <span className="text-gray-300 border border-blue-600 px-3 py-2 rounded-sm bg-blue-500 font-bold text-sm md:text-base">
                                {user.username}
                            </span>

                            <button 
                                onClick={handleLogout} 
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-all"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => { setRole("user"); setModalOpen(true); }}
                                className="bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-900 transition-all"
                            >
                                User Login
                            </button>
                            <button
                                onClick={() => { setRole("admin"); setModalOpen(true); }}
                                className="bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-yellow-700 transition-all"
                            >
                                Admin Login
                            </button>
                        </>
                    )}
                </div>
            )}

       
            {modalOpen && <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} role={role} />}
        </header>
    );
};

export default Navbar;
