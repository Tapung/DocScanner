import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import ProtectedRoute from "./protectRoute/ProtectedRoute.jsx";
import ScanUpload from './pages/Scanupload.jsx';
import Admin from './components/admin.jsx';

function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Layout><Home /></Layout>} />

      
        <Route element={<ProtectedRoute />}>
          <Route path="/scanUpload" element={<Layout><ScanUpload /></Layout>} />
          <Route path="/adminPage" element={<Layout><Admin/></Layout>} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
