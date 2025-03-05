import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { loginUser, registerUser } from "../Api_clients.jsx";
import { useNavigate } from "react-router-dom";


const AuthModal = ({ isOpen, onClose, role }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    console.log(role);
    

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const toggleMode = () => {
        reset();
        setIsRegistering(!isRegistering);
    };

    const mutation = useMutation({
        mutationFn: async (formData) => {
            if (isRegistering) {
                console.log(role)
                return registerUser(formData.username, formData.email, formData.password, role); 
            } else {
                return loginUser(formData.email, formData.password, role); 
            }
        },
        onSuccess: async(data) => {

            await queryClient.invalidateQueries("validateToken");
            onClose();
            if(data.user.role === "admin"){
                navigate("/adminPage");
            }else{
                navigate("/scanUpload");
            }
           
        },
        onError: (error) => {
            console.error(`${isRegistering ? "Registration" : "Login"} Error:`, error);
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    <motion.div className="bg-gray-100 p-6 rounded-lg shadow-lg w-96 relative"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}>
                        
                       
                        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg">✖</button>

                        <h2 className="text-xl font-bold text-center mb-4">
                            {isRegistering ? "Register" : "Login"}
                        </h2>

                       
                        {mutation.isError && <p className="text-red-500 text-center">{mutation.error.message}</p>}

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            
                            {isRegistering && (
                                <>
                                    <input type="text" placeholder="Username" className="bg-white p-2 rounded border !text-black"
                                        {...register("username", { required: "Username is required" })} />
                                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                                </>
                            )}

                            <input type="email" placeholder="Email" className="bg-white p-2 rounded border !text-black"
                                {...register("email", { required: "Email is required" })} />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                            <input type="password" placeholder="Password" className="bg-white p-2 rounded border !text-black"
                                {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 chars" }})} />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                            <button type="submit" className="!bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                                disabled={mutation.isLoading}>
                                {mutation.isLoading 
                                    ? (isRegistering ? "Registering..." : "Logging in...") 
                                    : isRegistering ? "Register" : "Login"}
                            </button>

                            <p className="text-center text-gray-600">
                                {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
                                <button type="button" onClick={toggleMode} className="text-blue-500 underline">
                                    {isRegistering ? "Login" : "Register"}
                                </button>
                            </p>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
