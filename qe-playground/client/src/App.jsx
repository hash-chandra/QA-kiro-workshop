import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';
import ToastContainer from './components/Toast';
import { getMe } from './api/client';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    getMe().then(data => {
      if (data?.user) setUser(data.user);
      setChecking(false);
    });
  }, []);

  if (checking) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={() => setUser(null)} />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LoginPage onLogin={setUser} />} />
        <Route path="/dashboard" element={user ? <DashboardPage user={user} /> : <Navigate to="/" />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
