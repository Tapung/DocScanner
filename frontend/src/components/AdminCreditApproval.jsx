import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast ,ToastContainer} from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";


import { fetchPendingRequests, approveCreditRequest, rejectCreditRequest } from "../Api_clients.jsx";

const AdminCreditApproval = () => {
    const [credit, setCredit] = useState(20);

    
    const { data: pendingRequests, refetch, isLoading } = useQuery({
        queryKey: ["pendingRequests"],
        queryFn: fetchPendingRequests,
    });


    console.log(pendingRequests)


    const approveMutation = useMutation({
        mutationFn: ({ userId,  amount }) => approveCreditRequest({ userId, amount }),
        onSuccess: () => {
            toast.success("✅ Credit request approved!", { position: "top-right" });
            refetch();
        },
        onError: () => {
            toast.error("❌ Failed to approve request!", { position: "top-right" });
        }
    });

  
    const rejectMutation = useMutation({
        mutationFn:({ userId}) => rejectCreditRequest({ userId}) ,
        onSuccess: () => {
            toast.success("🚫 Credit request rejected!", { position: "top-right" });
            refetch();
        },
        onError: () => {
            toast.error("❌ Failed to reject request!", { position: "top-right" });
        }
    });

  
    const handleCreditChange = (requestId, value) => {
        const amount = Math.max(1, Number(value)); 
        setCustomCredits(prev => ({
            ...prev,
            [requestId]: amount
        }));
    };

    return (
        <motion.div
            className="p-6 min-h-screen flex justify-center items-center bg-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className="w-full max-w-4xl bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-6 text-white"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <h2 className="text-3xl font-bold mb-6 text-center">Pending Credit Requests</h2>

                {isLoading ? (
                    <p className="text-center text-lg">Loading requests...</p>
                ) : pendingRequests?.length === 0 ? (
                    <p className="text-center text-lg">No pending requests.</p>
                ) : (
                    <ul className="space-y-4">
                        {pendingRequests.map((user) => (
                            <motion.li 
                                key={user._id} 
                                className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white/20 rounded-lg shadow-md backdrop-blur-lg"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <span className="text-lg font-medium mx-4">
                                    {user.username} ({user.email}) Requested: 
                                    <span className="text-yellow-300"> {user.totalRequested} Credits</span>
                                </span>

                                <div className="mt-4 sm:mt-0 flex space-x-3 items-center">
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-24 px-4 py-2 rounded-xl bg-white/80 text-gray-900 font-semibold shadow-inner border-none"
                                        value={credit}
                                        onChange={(e) => setCredit(e.target.value)}
                                    />
                                    <motion.button 
                                        onClick={() => approveMutation.mutate({
                                            userId: user.userId,
                                            amount:credit
                                        })} 
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg"
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Approve
                                    </motion.button>
                                    <motion.button 
                                        onClick={() => rejectMutation.mutate({userId:user.userId})} 
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg"
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Reject
                                    </motion.button>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                )}
            </motion.div>
            <ToastContainer />

        </motion.div>
    );
};

export default AdminCreditApproval;
