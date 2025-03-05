import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { uploadDocuments, scanDocument, deleteUser } from "../Api_clients";
import { useAppContext } from "../context/AuthContext.jsx";
import CreditRequestButton from "../components/CreditRequestButton.jsx"
import jsPDF from "jspdf";

const GridComponent = () => {


    const { register, handleSubmit, reset, setError, clearErrors, formState: { errors } } = useForm();
        const [scanResults, setScanResults] = useState(null);
        const { user, refetchUser } = useAppContext();

    
        const uploadMutation = useMutation({
            mutationFn: async (formData) => await uploadDocuments(formData),
            onSuccess: () => {
                toast.success("Documents uploaded successfully!");
                reset({ uploadFile: null });
                refetchUser();
            },
            onError: (error) => {
                toast.error("Upload failed: " + (error.message || "Unknown error"));
            },
        });
    
    
        const scanMutation = useMutation({
            mutationFn: async (formData) => await scanDocument(formData),
            onSuccess: (data) => {
                toast.success("Scan successful!");
                setScanResults(data.similarDocuments);
                reset({ scanFile: null });
                refetchUser();
            },
            onError: (error) => {
                toast.error("Scan failed: " + (error.message || "Unknown error"));
            },
        });
    
      
        const deleteMutation = useMutation({
            mutationFn: async () => await deleteUser(user.id),
            onSuccess: () => {
                toast.success("User deleted successfully!");
                refetchUser();
            },
            onError: (error) => {
                toast.error("Delete failed: " + (error.message || "Unknown error"));
            },
        });
    
        const handleUpload = (data) => {
            if (!data.uploadFile || data.uploadFile.length === 0) {
                setError("uploadFile", { type: "manual", message: "Please select a file." });
                return;
            }
            const file = data.uploadFile[0];
            if (file.type !== "text/plain") {
                setError("uploadFile", { type: "manual", message: "Only .txt files are allowed." });
                return;
            }
            clearErrors("uploadFile");
            const formData = new FormData();
            formData.append("uploadFile", file);
            uploadMutation.mutate(formData);
        };
    
        const handleScan = (data) => {
            if (!data.scanFile || data.scanFile.length === 0) {
                setError("scanFile", { type: "manual", message: "Please select a file." });
                return;
            }
            const file = data.scanFile[0];
            if (file.type !== "text/plain") {
                setError("scanFile", { type: "manual", message: "Only .txt files are allowed." });
                return;
            }
            clearErrors("scanFile");
            const formData = new FormData();
            formData.append("scanFile", file);
            scanMutation.mutate(formData);
        };
    
  return (
    <section className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-6">
        <ToastContainer />
    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-7xl">
      
        <div className="flex flex-col items-center justify-center bg-gray-900">
          
                         <motion.div
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className="p-6 rounded-lg bg-gradient-to-br from-[#0d1224] to-[#11182f] shadow-2xl w-full"
                                        >
                                            <h3 className="text-lg font-semibold text-gray-400 mb-3">Upload Report</h3>
                                            <form onSubmit={handleSubmit(handleUpload)} encType="multipart/form-data">
                                                <input
                                                    type="file"
                                                    accept=".txt"
                                                    {...register("uploadFile")}
                                                    className="block w-full text-sm text-gray-400 file:bg-blue-600 file:text-white file:border-none file:rounded-lg file:px-3 file:py-2 file:cursor-pointer"
                                                />
                                                {errors.uploadFile && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.uploadFile.message}</p>
                                                )}
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    type="submit"
                                                    className="w-full mt-3 !bg-blue-600 hover:bg-blue-700 transition-all p-3 rounded-lg font-semibold text-white shadow-lg"
                                                    disabled={uploadMutation.isLoading}
                                                >
                                                    {uploadMutation.isLoading ? "Uploading..." : "Upload"}
                                                </motion.button>
                                            </form>
                                        </motion.div>
          
          


                                                         <motion.div
                                                                        initial={{ opacity: 0, y: 20 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        transition={{ duration: 0.5 }}
                                                                        className="p-6 rounded-lg bg-gradient-to-br from-[#0d1224] to-[#11182f] shadow-2xl w-full"
                                                                    >
                                                                        <h3 className="text-lg font-semibold text-gray-400 mb-3">Scan Document</h3>
                                                                        <form onSubmit={handleSubmit(handleScan)}>
                                                                            <input
                                                                                type="file"
                                                                                accept=".txt"
                                                                                {...register("scanFile")}
                                                                                className="block w-full text-sm text-gray-400 file:bg-blue-600 file:text-white file:border-none file:rounded-lg file:px-3 file:py-2 file:cursor-pointer"
                                                                            />
                                                                            <motion.button
                                                                                whileHover={{ scale: 1.05 }}
                                                                                type="submit"
                                                                                className="w-full mt-3 !bg-blue-600 hover:bg-blue-700 transition-all p-3 rounded-lg font-semibold text-white shadow-lg"
                                                                                disabled={scanMutation.isLoading}
                                                                            >
                                                                                {scanMutation.isLoading ? "Scanning..." : "Scan"}
                                                                            </motion.button>
                                                                        </form>
                                                                    </motion.div>








          
          <CreditRequestButton />
        </div>

    
        <div className="bg-gradient-to-br from-[#0d1224] to-[#11182f] p-3 rounded-lg min-h-[200px] flex flex-col items-centerjustify-between bg-gray-800">
                     <h3 className="text-lg font-semibold text-white ">Similar Documents</h3>
          {scanResults && (
                          <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5 }}
                              className="w-full min-h-[200px] overflow-hidden max-w-5xl mt-6 p-6 bg-gradient-to-br from-[#0d1224] to-[#11182f] rounded-lg"
                          >
                              
                              <ul className="space-y-2">
                                  {scanResults.map((doc, index) => (
                                      <li key={index} className="p-3 bg-gradient-to-br from-[#0d1224] to-[#11182f] text-white">
                                          {doc.filename}
                                      </li>
                                  ))}
                              </ul>
                          </motion.div>
                      )}
        </div>

       
        <div className="bg-gray-900 p-4 rounded-lg flex flex-col items-center justify-center gap-4">
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="p-6 rounded-lg bg-gradient-to-br from-[#0d1224] to-[#11182f] shadow-2xl w-full min-h-[300px]"
  >
    <h3 className="text-lg font-semibold text-gray-400 mb-3">Last 5 Scanned Documents</h3>
    <div className="space-y-3">
      {(user?.scannedDocs ?? []).slice(-5).map((doc, index) => (
        <div key={index} className="p-3 bg-[#1a223a] rounded-lg shadow-lg">
          <p className="text-lg font-semibold text-white">
            {doc.name} - Created at: {new Date(doc.scannedAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>

 
    <button
      onClick={() => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.text("Scanned Documents History", 10, 10);

        (user?.scannedDocs ?? []).slice(-5).forEach((docData, i) => {
          doc.setFont("helvetica", "normal");
          doc.text(`${i + 1}. ${docData.name} - ${new Date(docData.scannedAt).toLocaleDateString()}`, 10, 20 + i * 10);
        });

        doc.save("scanned_documents_history.pdf");
      }}
      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-4"
    >
      Download as PDF
    </button>
  </motion.div>
</div>
      </div>

    
      <div className="flex justify-center w-full mt-100">
                <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => deleteMutation.mutate()}
            className="bg-red-600 hover:bg-red-700 transition-all px-4 py-2 md:px-6 md:py-3 font-semibold text-white shadow-lg flex items-center gap-2 rounded-md"
            >
            <span className="text-sm md:text-base">Delete User</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="w-5 h-5 md:w-6 md:h-6"
            >
                <path d="M3 6h18v2H3V6zm3 3h12v12H6V9zm5-6h2v2h-2V3z" />
            </svg>
            </motion.button>
      </div>
      
                  
    </section>
  );
};

export default GridComponent;
