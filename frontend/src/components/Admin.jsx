import React, { useState } from "react";
import CreditRequests from "./AdminCreditApproval.jsx";
import AdminDashboard from "./AdminDashboard.jsx";

const Admin = () => {
    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center p-6">
          
            <div className="flex gap-4 mb-6">
                <button 
                    className={`px-4 py-2 rounded-lg ${activeTab === "dashboard" ? "!bg-blue-600 text-white" : "!bg-blue-500"} !outline-none`}
                    onClick={() => setActiveTab("dashboard")}
                >
                    Dashboard
                </button>

                <button 
                    className={`px-4 py-2 rounded-lg ${activeTab === "creditRequests" ? "!bg-blue-600 text-white" : "!bg-blue-500"} !outline-none`}
                    onClick={() => setActiveTab("creditRequests")}
                >
                    Credit Requests
                </button>
            </div>

     
            <div className="p-6">
                {activeTab === "dashboard" && <AdminDashboard />}
                {activeTab === "creditRequests" && <CreditRequests />}
            </div>
        </div>
    );
};

export default Admin;
