import React, { useState } from 'react';
const API_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

function JudgeDashboard({ token, onLogout }) {
  const [text, setText] = useState('');
  const [judgeVote, setJudgeVote] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSetStatement = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'setStatement', token, text, judgeVote }),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess('Statement set successfully');
        setError(null);
        setText('');
        setJudgeVote('');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    }
  };

  const handleGetResults = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getResults', token }),
      });
      const data = await response.json();
      if (data.success) {
        setResults(data.scores);
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
        <h2 className="text-2xl font-bold">Judge Dashboard</h2>
        <button onClick={onLogout} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Set New Statement</h3>
        <form onSubmit={handleSetStatement}>
          <div className="mb-4">
            <label className="block text-gray-700">Statement Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter statement"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Judge Vote</label>
            <select
              value={judgeVote}
              onChange={(e) => setJudgeVote(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select vote</option>
              <option value="agree">Agree</option>
              <option value="disagree">Disagree</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Set Statement
          </button>
        </form>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">View Results</h3>
        <button
          onClick={handleGetResults}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4"
        >
          Get Results
        </button>
        {results && (
          <div>
            <h4 className="text-lg font-semibold">Scores</h4>
            <ul className="list-disc pl-5">
              {results.map((result) => (
                <li key={result.userID}>
                  {result.username} (ID: {result.userID}): {result.score}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default JudgeDashboard;