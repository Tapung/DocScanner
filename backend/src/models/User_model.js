import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },  
    role: { type: String, enum: ["user", "admin"], default: "user" },  
    credits: { type: Number, default: 20 },  
    lastReset: { type: Date, default: new Date() },  

    creditRequests: [{
        amount: { type: Number, required: true },
        status: { type: String, enum: ['pending', 'approved', 'denied'], default: 'pending' },
        requestedAt: { type: Date, default: Date.now },
        reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', default: null },
    }],

    scannedDocs: [{
        name: { type: String, required: true },  
        scannedAt: { 
            type: Date, 
            default: function () {
                const today = new Date();
                return new Date(today.getFullYear(), today.getMonth(), today.getDate());  
            }
        } 
    }]

}, { timestamps: true });

 
userSchema.methods.resetCredits = function () {
    const now = new Date();
    if (now.toDateString() !== this.lastReset.toDateString()) {
        this.credits = 20;  
        this.lastReset = now;
    }
};


const User = mongoose.model('User', userSchema);
export default User;
