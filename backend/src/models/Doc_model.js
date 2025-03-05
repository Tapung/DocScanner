import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    filename: { type: String, required: true },
    fileData: { type: String, required: true },  
    wordFrequency: { type: Map, of: Number }, 
    uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Document", DocumentSchema);
