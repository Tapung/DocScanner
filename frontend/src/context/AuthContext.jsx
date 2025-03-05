import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { validateToken } from "../Api_clients.jsx";  
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const { data, isError, isLoading, refetch } = useQuery({
        queryKey: ["validateToken"],
        queryFn: validateToken,
        retry: false, 
        
    });

    const checkVal = 0;

    return (
        <AppContext.Provider
            value={{
                checkVal:checkVal,
                isLoggedIn: !isError && data?.user,  
                user: data?.user || null,  
                isLoading, 
                refetchUser: refetch,  
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
