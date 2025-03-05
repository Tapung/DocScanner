import React from "react";
import promoVideo from "../assets/promo.mp4"; 


const VideoPlayer = () => {
    return (
        <section className="bg-gray-900 text-white py-16 flex justify-center items-center min-h-screen">
            <div className="relative w-full max-w-5xl h-[500px] md:h-[600px] lg:h-[700px] flex justify-center items-center">
                <div className="w-full h-full transform overflow-hidden rounded-lg shadow-2xl">
                    <video 
                        src={promoVideo} 
                        autoPlay 
                        loop 
                        muted 
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default VideoPlayer;
