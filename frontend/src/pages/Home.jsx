import React from 'react';
import Hero from '../components/Hero';
import Feature from '../components/Feature';
import FAQ from '../components/FAQ';
import VideoPlayer from '../components/Video';

const Home = () => {
    return (
        <div className="flex flex-col">
            <Hero />
            <Feature />
            <VideoPlayer />
            <FAQ />
        </div>
    );
};

export default Home;
