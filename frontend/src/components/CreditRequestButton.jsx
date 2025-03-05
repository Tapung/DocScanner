import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "../context/AuthContext.jsx";
import { requestCredits } from "../Api_clients.jsx";

const CreditRequestButton = () => {
    const { refetchUser,checVal } = useAppContext();
    const [amount, setAmount] = useState(20); 

    const requestCreditMutation = useMutation({
        mutationFn: () => requestCredits(amount),
        onSuccess: () => {
            toast.success("Credit request submitted successfully!");
            refetchUser();
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message || "Error requesting credit");
        }
    });




    return (
        <div className="flex items-center space-x-2 mt-8">
            <input
                type="number"
                min="1"
                max="50"
                disabled={true}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="border p-2 rounded-lg w-20 hidden"
                
            />
            <button
                onClick={() => requestCreditMutation.mutate()}
                className="!bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:!bg-green-800 transition-all outline-none"
                disabled={requestCreditMutation.isLoading}
            >
                {requestCreditMutation.isLoading ? "Requesting..." : "Request Credit"}
            </button>
        </div>
    );
};

export default CreditRequestButton;
