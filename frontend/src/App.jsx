import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import UploadSkill from './pages/UploadSkill';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import LeaderboardPage from './pages/LeaderboardPage';
import ChallengeMode from './pages/ChallengeMode';
import HallOfFame from './pages/HallOfFame';
import { AuthProvider, useAuth } from './lib/AuthContext';


// ProtectedRoute component using useAuth to check session
const ProtectedRoute = ({ children }) => {
    const { user, session, loading } = useAuth(); 
    console.log('ProtectedRoute - Auth state:', { 
      hasSession: !!session, 
      loading, 
      user: user || session?.user 
    });
  
    // Show loading state while checking auth
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    
    // If no session and not loading, redirect to sign-in
    if (!session) {
      console.log('No session found, redirecting to sign-in');
      return <Navigate to="/sign-in" state={{ from: window.location.pathname }} replace />;
    }
    
    // If we have a session, render the protected content
    console.log('Session found, rendering protected content');
    return children;
  };


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<ProtectedRoute><UploadSkill /></ProtectedRoute>} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
          <Route path="/challenge" element={<ProtectedRoute><ChallengeMode /></ProtectedRoute>} />
          <Route path="/hall-of-fame" element={<ProtectedRoute><HallOfFame /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};



export default App;
