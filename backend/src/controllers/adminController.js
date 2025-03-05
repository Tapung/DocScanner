import User from "../models/User_model.js";
import Document from "../models/Doc_model.js";

export const getScanStats = async (req, res) => {
    try {
        const stats = await User.aggregate([
            {
                $unwind: "$scannedDocs"
            },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$scannedDocs.scannedAt" } } 
                    },
                    count: { $sum: 1 } 
                }
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id.date",
                    count: 1 
                }
            },
            { $sort: { date: -1 } }
        ]);

        console.log(stats); 

        res.json(stats);
    } catch (error) {
        console.error("Error fetching scan stats:", error);
        res.status(500).json({ message: "Error fetching scan stats", error: error.message });
    }
};



export const getTopUsers = async (req, res) => {
    try {
        const topUsers = await User.aggregate([
            {
                $addFields: {
                    scanCount: { $size: "$scannedDocs" },
                },
            },
            { $sort: { scanCount: -1 } },
            { $limit: 5 },
            {
                $project: {
                    username: 1,
                    credits: 1,
                    scanCount: 1,
                },
            },
        ]);
        res.json(topUsers);
    } catch (error) {
        console.error("Error fetching top users:", error);
        res.status(500).json({ message: "Error fetching top users", error });
    }
};



export const getCommonScans = async (req, res) => {
    try {
        const topics = await Document.aggregate([
            { 
                $project: { 
                    wordArray: { $objectToArray: "$wordFrequency" }, 
                } 
            },
            { $unwind: "$wordArray" },
            {
                $group: {
                    _id: "$wordArray.k",
                    count: { $sum: "$wordArray.v" } 
                }
            },
            { $sort: { count: -1 } }, 
            { $limit: 5 } 
        ]);
        res.json(topics.map((topic) => topic._id));
    } catch (error) {
        res.status(500).json({ message: "Error fetching common scan topics", error: error.message });
    }
};


export const getCreditUsage = async (req, res) => {
    try {
        const usageStats = await User.aggregate([
            {
                $project: {
                    username: 1,
                    creditsUsed: { $abs: { $subtract: [20, "$credits"] } }, 
                },
            },
            { $sort: { creditsUsed: -1 } }, 
            { $limit: 10 }, 
        ]);

        res.json(usageStats);
    } catch (error) {
        res.status(500).json({ message: "Error fetching credit usage statistics", error: error.message });
    }
};
