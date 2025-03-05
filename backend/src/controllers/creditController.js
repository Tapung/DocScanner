import User from "../models/User_model.js";


 
export const requestCredit = async (req, res) => {
    try {
        const { amount } = req.body;
        const { _id: userId } = req.user; 

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid credit amount requested" });
        }
 
        const user = await User.findOneAndUpdate(
            { _id: userId, "creditRequests.status": { $ne: "pending" } }, 
            { 
                $push: { creditRequests: { amount, status: "pending" } } 
            },
            { new: true }
        );

        if (!user) {
            return res.status(400).json({ message: "You already have a pending request" });
        }

        res.status(201).json({ message: "Credit request submitted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error requesting credit", error: error.message });
    }
};




 
export const getPendingCreditRequests = async (req, res) => {
    try {
        const usersWithPendingRequests = await User.find({ "creditRequests.status": "pending" })
            .select("username email _id creditRequests");
 
        const pendingRequests = usersWithPendingRequests.map(user => ({
            userId: user._id,
            username: user.username,
            email: user.email,
            totalRequested: user.creditRequests
                .filter(req => req.status === "pending")
                .reduce((sum, req) => sum + req.amount, 0) 
        }));

        res.json(pendingRequests);
    } catch (err) {
        res.status(500).json({ message: "Error fetching pending requests", error: err.message });
    }
};


 
export const approveCreditRequest = async (req, res) => {
    try {
        const { userId, amount } = req.body;
        const { adminId } = req.user;  

        if (!userId || !amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid user ID or credit amount" });
        }

      
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

     
        const creditRequest = user.creditRequests.find(req => req.status === "pending");
        if (!creditRequest) {
            return res.status(400).json({ message: "No pending credit request found" });
        }

  
        user.credits += Number(amount);
        creditRequest.status = "approved";
        creditRequest.reviewedBy = adminId; 

        await user.save();

        res.json({ message: "Credit request approved successfully", credits: user.credits });

    } catch (err) {
        res.status(500).json({ message: "Error approving request", error: err.message });
    }
};



export const rejectCreditRequest = async (req, res) => {
    try {
        const { userId } = req.body;
        const { adminId } = req.user; 

        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

     
        const pendingRequest = user.creditRequests.find(req => req.status === "pending");
        if (!pendingRequest) {
            return res.status(400).json({ message: "No pending credit request found for this user" });
        }

     
        pendingRequest.status = "denied";
        pendingRequest.reviewedBy = adminId; 
 
        await user.save();

        res.status(200).json({ message: "Credit request rejected successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error rejecting request", error: err.message });
    }
};


export const getUserCreditsAndScans = async (req, res) => {
    try {
        const { _id } = req.user;
        const user = await User.findById(_id).select("credits scannedDocs");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({
            credits: user.credits,
            lastScannedDocs: user.scannedDocs
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user credits and scans", error: error.message });
    }
};