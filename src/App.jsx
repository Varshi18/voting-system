import React, { useState } from 'react';
import Login from './components/Login';
import ParticipantDashboard from './components/ParticipantDashboard';
import JudgeDashboard from './components/JudgeDashboard';

const API_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username, password }),
      });
      console.log('Response Status:', response.status);
      console.log('Response Headers:', JSON.stringify([...response.headers]));
      const responseText = await response.text();
      console.log('Response Text:', responseText);
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (err) {
        throw new Error('Invalid JSON response: ' + responseText);
      }
      if (data.success) {
        setUser({ token: data.token, role: data.role });
        setError(null);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
      console.error('Login Error:', err);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6">Voting System</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : user.role === 'judge' ? (
        <JudgeDashboard token={user.token} onLogout={handleLogout} />
      ) : (
        <ParticipantDashboard token={user.token} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;