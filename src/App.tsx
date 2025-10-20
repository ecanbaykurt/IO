import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import PromptWorkspace from './pages/PromptWorkspace';
import MyApps from './pages/MyApps';
import AppRunner from './pages/AppRunner';
import Profile from './pages/Profile';
import InnovationHub from './pages/InnovationHub';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gradient-from to-gradient-to">
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/workspace" element={<PromptWorkspace />} />
          <Route path="/my-apps" element={<MyApps />} />
          <Route path="/runner/:appId" element={<AppRunner />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore" element={<InnovationHub />} />
        </Routes>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
