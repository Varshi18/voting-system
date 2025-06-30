import React, { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

function ParticipantDashboard({ token, onLogout }) {
  const [statement, setStatement] = useState(null);
  const [vote, setVote] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchStatement = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'getStatement' }),
        });
        const data = await response.json();
        if (data.success) {
          setStatement(data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Network error: ' + err.message);
      }
    };
    fetchStatement();
  }, []);

  const handleVote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'vote', token, statementID: statement.statementID, vote }),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess('Vote submitted successfully');
        setError(null);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Participant Dashboard</h2>
        <button onClick={onLogout} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      {statement ? (
        <div>
          <h3 className="text-xl font-semibold mb-2">Active Statement</h3>
          <p className="mb-4">{statement.text} (ID: {statement.statementID})</p>
          <form onSubmit={handleVote}>
            <div className="mb-4">
              <label className="block text-gray-700">Your Vote</label>
              <select
                value={vote}
                onChange={(e) => setVote(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select vote</option>
                <option value="agree">Agree</option>
                <option value="disagree">Disagree</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Submit Vote
            </button>
          </form>
        </div>
      ) : (
        <p>No active statement available</p>
      )}
    </div>
  );
}

export default ParticipantDashboard;