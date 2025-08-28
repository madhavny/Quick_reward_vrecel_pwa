import React, { useState, useEffect, use } from "react";
import useAuth from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";
import DashbaordPage from "./pages/DashbaordPage";
import { Toaster } from "sonner";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration";
import { Navigate } from "react-router-dom";
import HistoryList from "./components/HistoryList/History";
import PaymentProcess from "./pages/PaymentProcess";
const App = () => {
  const { user, login, logout, loading } = useAuth();

  const handleLogin = (userData) => {
    login(userData);
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
     <Toaster richColors position="top-center" />
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />

        <Route
          path="/dashboard"
          element={ user ? (
              <DashbaordPage user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/historyList" element={<HistoryList  />} />
        <Route path="/paymentProcess" element={<PaymentProcess  />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/registration" element={<Registration  onLogin={handleLogin}/> } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
