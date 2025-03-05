import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App.jsx';
import { AppContextProvider } from "./context/AuthContext.jsx";

 
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,  
    },
  },
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
 
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
