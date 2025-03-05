import React, { useState, useEffect } from "react";
import { fetchCreditRequests, reviewCreditRequest } from "../api/api"; 

const CreditRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        loadCreditRequests();
    }, []);

    const loadCreditRequests = async () => {
        try {
            const data = await fetchCreditRequests();
            setRequests(data);
        } catch (error) {
            console.error("Error fetching credit requests:", error);
        }
    };

    const handleReview = async (requestId, status) => {
        try {
            await reviewCreditRequest(requestId, status);
            loadCreditRequests(); 
        } catch (error) {
            console.error("Error updating credit request:", error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Credit Requests</h2>
            <div className="space-y-4">
                {requests.length === 0 ? (
                    <p>No credit requests available.</p>
                ) : (
                    requests.map((request) => (
                        <div key={request.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                            <div>
                                <p><strong>User:</strong> {request.userName}</p>
                                <p><strong>Requested Credits:</strong> {request.amount}</p>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    className="bg-green-500 text-white px-3 py-2 rounded-lg"
                                    onClick={() => handleReview(request.id, "approved")}
                                >
                                    Approve
                                </button>
                                <button 
                                    className="bg-red-500 text-white px-3 py-2 rounded-lg"
                                    onClick={() => handleReview(request.id, "denied")}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CreditRequests;
