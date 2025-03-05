import { motion } from "framer-motion";
import scanImage from "../assets/as.jpeg";
import matchImage from "../assets/as2.jpeg";
import dashboardImage from "../assets/as3.jpeg";
const Feature = () => {
    const features = [
        {
            id: 1,
            image: scanImage,
            title: "📄 Fast Document Scanning",
            description: "Instantly scan and analyze your documents with high accuracy. Our advanced OCR technology ensures precise text extraction, making it easier to digitize and manage your important files efficiently."
        },
        {
            id: 2,
            image: matchImage,
            title: "🔍 Advanced Matching System",
            description: "Find similar documents in seconds using AI-powered analysis. Whether it's duplicate reports, contract comparisons, or legal documents, our intelligent system helps you quickly identify and organize related files."
        },
        {
            id: 3,
            image: dashboardImage,
            title: "📊 User Dashboard",
            description: "Track your scan history, manage uploaded documents, and monitor your usage stats in one intuitive dashboard. Get a clear overview of your activity and request additional scan credits when needed."
        }
    ];

    return (
        <section className="py-16 bg-gray-900">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.id}
                        className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all"
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut", delay: index * 0.2 }}
                        whileHover={{ scale: 1.07 }}
                    >
                        <motion.img 
                            src={feature.image} 
                            alt={feature.title} 
                            className="w-full h-64 object-cover rounded-md mb-4"
                            initial={{ opacity: 0.5, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                        <h2 className="text-lg md:text-xl font-bold mb-2 text-white">{feature.title}</h2>
                        <p className="text-white">{feature.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Feature;
