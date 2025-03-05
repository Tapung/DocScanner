import React, { useState } from "react";
import AuthModal from "../components/Log_register.jsx";

const Hero = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <section className="h-screen flex flex-col justify-center items-center text-white bg-gray-900 p-6 text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 p-4 rounded-xl text-blue-400">
                Scan, Match & Manage Documents with Ease!
            </h1>
            <p className="text-sm md:text-lg lg:text-xl mb-4 p-2 max-w-3xl">
                Upload your documents, find similar files, and track your scans effortlessly.
            </p>
            <p className="text-xs md:text-base lg:text-lg mb-6 p-2 max-w-2xl">
                Our platform offers a seamless document scanning experience, leveraging advanced AI technology to provide accurate document matching and efficient management. 
            </p>
            <div className="flex flex-col md:flex-row gap-4">
                <button
                    onClick={() => setModalOpen(true)}
                    className="!bg-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-blue-900 transition-all"
                >
                    📄 Start Scanning
                </button>
            </div>

       
            <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </section>
    );
};

export default Hero;
