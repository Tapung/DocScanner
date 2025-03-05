import { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
    {
        question: "📄 How does the document scanning work?",
        answer: "Our AI-powered scanner extracts text and key insights from uploaded documents with high accuracy, making them easy to search and organize."
    },
    {
        question: "🔍 What is the document matching system?",
        answer: "Our system uses advanced algorithms to find similar documents, allowing you to quickly compare files and avoid duplicates."
    },
    {
        question: "📊 How can I track my scan history?",
        answer: "You can access all your past scans and manage your documents through the user-friendly dashboard."
    },
    {
        question: "💳 Are there any usage limits?",
        answer: "Yes, users get 20 free scans per day. Additional scans can be requested through the dashboard."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-gray-900 text-white py-16 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">❓ Frequently Asked Questions</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-md cursor-pointer"
                        onClick={() => toggleFAQ(index)}
                    >
                        <motion.div 
                            className="flex justify-between items-center"
                            initial={false}
                     
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-lg md:text-xl font-semibold">{faq.question}</h3>
                            <span className="text-xl"> {openIndex === index ? "▲" : "▼"} </span>
                        </motion.div>

                        {openIndex === index && (
                            <motion.p 
                                className="mt-3 text-gray-300 text-sm md:text-base"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                {faq.answer}
                            </motion.p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
