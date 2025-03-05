import mongoose from "mongoose";
import Document from "../models/Doc_model.js";
import User from "../models/User_model.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

 
const calculateWordFrequency = (text) => {
    const words = text.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/);
    const wordFreq = {};
    words.forEach((word) => {
        if (word) wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    return wordFreq;
};

 
export const uploadDocument = async (req, res) => {
    try {
         
        const userId = req.user._id;

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const textContent = req.file.buffer.toString("utf-8");

        const newDocument = new Document({
            user: userId,
            filename: req.file.originalname,
            fileData: textContent,
            wordFrequency: calculateWordFrequency(textContent),
        });

        await newDocument.save();
        res.status(201).json({ message: "File uploaded successfully", document: newDocument });
    } catch (error) {
        res.status(500).json({ message: "Error uploading document", error: error.message });
    }
};

 
export const scanDocument = async (req, res) => {
    try {
    
 
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

       
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.credits <= 0) return res.status(403).json({ message: "Insufficient Credits. Please Request More." });

      
        const docName = req.file.originalname;

        
        user.scannedDocs.push({
            name: docName,
            scannedAt: new Date().setHours(0, 0, 0, 0) 
        });

        if (user.scannedDocs.length > 10) {
            user.scannedDocs.shift();  
        }

    
        user.credits -= 1;
        await user.save();  

        
        const fileText = req.file.buffer.toString("utf-8");

     
        const calculateWordFrequency = (text) => {
            const words = text.toLowerCase().match(/\b\w+\b/g) || [];
            return words.reduce((freq, word) => {
                freq[word] = (freq[word] || 0) + 1;
                return freq;
            }, {});
        };

       
        const scannedDocWordFreq = calculateWordFrequency(fileText);

       
        const allDocuments = await Document.find();

      
        const similarDocs = allDocuments.map((doc) => {
            let similarity = 0;
            const docWordFreq = doc.wordFrequency || {}; 

            if (typeof docWordFreq !== "object") {
                return { docId: doc._id, filename: doc.filename, similarity: 0 };
            }

            
            for (const word in scannedDocWordFreq) {
                const lowerWord = word.toLowerCase(); 
                const scannedCount = scannedDocWordFreq[word];
                const docCount = docWordFreq.get ? docWordFreq.get(lowerWord) : docWordFreq[lowerWord];

                if (docCount) {
                    similarity += Math.min(scannedCount, docCount);
                }
            }

            return { docId: doc._id, filename: doc.filename, similarity };
        });

        
        similarDocs.sort((a, b) => b.similarity - a.similarity);

         
        const topMatches = similarDocs.filter(doc => doc.similarity >= 1);

     
        if (topMatches.length === 0) {
            return res.json({ message: "No similar documents found with similarity >= 1", similarDocuments: [] });
        }

        console.log("Scan backend called successfully");

        res.json({ message: "Scan Successful", similarDocuments: topMatches });
    } catch (error) {
        console.error("Error scanning document:", error);
        res.status(500).json({ message: "Error scanning document", error: error.message });
    }
};

 
export const getUserDocuments = async (req, res) => {
    try {
        const userId = req.user._id;
        const documents = await Document.find({ user: userId });
        res.json({ documents });
    } catch (error) {
        res.status(500).json({ message: "Error fetching documents", error: error.message });
    }
};


