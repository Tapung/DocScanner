import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { fetchScanStats, fetchTopUsers, fetchCommonScans, fetchCreditUsage } from "../Api_clients";
import { useQuery } from "@tanstack/react-query";

const AdminDashboard = () => {
  
    const [timeRange, setTimeRange] = useState("7");  


    const { data: scanStats = [], isLoading: loadingScans } = useQuery({
        queryKey: ["scanStats", timeRange],
        queryFn: () => fetchScanStats(timeRange),
        refetchInterval: 1000,  
    });

    const { data: topUsers = [], isLoading: loadingTopUsers } = useQuery({
        queryKey: ["topUsers"],
        queryFn: fetchTopUsers,
        refetchInterval: 1000,
    });

    const { data: commonScans = [], isLoading: loadingCommonScans } = useQuery({
        queryKey: ["commonScans"],
        queryFn: fetchCommonScans,
        refetchInterval: 1000,
    });

    const { data: creditUsage = [], isLoading: loadingCreditUsage } = useQuery({
        queryKey: ["creditUsage"],
        queryFn: fetchCreditUsage,
        refetchInterval: 1000,
    });
    const COLORS = ["#8884d8", "#82ca9d", "#ff7300", "#ff4560", "#00c49f"];

    return (
        <motion.div
            className="p-6 bg-gray-900 rounded-lg shadow-lg text-white w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold mb-6 text-center">📊 Admin Dashboard</h2>

            <div className="mb-4 flex justify-center">
                <select
                    className="bg-gray-800 text-white p-2 rounded-md"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                >
                    <option value="7">Last 7 Days</option>
                    <option value="30">Last 30 Days</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <motion.div className="bg-gray-800 p-6 rounded-lg shadow-md" whileHover={{ scale: 1.03 }}>
                    <h3 className="text-lg font-semibold mb-3">📅 Scans Per Day</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={scanStats}>
                            <XAxis dataKey="date" stroke="#ccc" />
                            <YAxis stroke="#ccc" />
                            <Tooltip />
                            <Bar dataKey="count" fill="#4CAF50" />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                
                <motion.div className="bg-gray-800 p-6 rounded-lg shadow-md" whileHover={{ scale: 1.03 }}>
                    <h3 className="text-lg font-semibold mb-3">📖 Common Scanned Topics</h3>
                    <ul className="space-y-2">
                        {commonScans.map((topic, index) => (
                            <li key={index} className="bg-gray-700 p-2 rounded-md">{topic}</li>
                        ))}
                    </ul>
                </motion.div>

                
                <motion.div className="bg-gray-800 p-6 rounded-lg shadow-md" whileHover={{ scale: 1.03 }}>
                    <h3 className="text-lg font-semibold mb-3">🏆 Top Users</h3>
                    <ul className="space-y-2">
                        {topUsers.map((user, index) => (
                            <li key={index} className={`bg-gray-700 p-2 rounded-md flex justify-between`}>
                                <span>
                                    {index + 1}. {user.username}
                                </span>
                                <span className="font-bold">{user.scanCount} scans</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                
                <motion.div className="bg-gray-800 p-6 rounded-lg shadow-md" whileHover={{ scale: 1.03 }}>
                    <h3 className="text-lg font-semibold mb-3">🔄 Credit Usage</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={creditUsage} dataKey="creditsUsed" nameKey="username" cx="50%" cy="50%" outerRadius={80} label>
                                {creditUsage.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AdminDashboard;
