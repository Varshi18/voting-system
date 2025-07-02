import React, { useState } from 'react';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

function Login({ onLogin, setIsLoading }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading({ active: true, message: 'Logging In' });
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username, password }),
      });
      const data = await response.json();
      if (data.success) {
        onLogin(data.token, data.role);
        setError(null);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setIsLoading({ active: false, message: '' });
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } }
  };

  return (
    <motion.div
      className="glass-card p-6 sm:p-8 rounded-lg w-full max-w-md"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-[var(--text-heading)] text-center">Login</h2>
      {error && (
        <motion.p
          className="text-[var(--error)] mb-4 font-medium text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-3 liquid-input rounded-lg"
          whileFocus={{ scale: 1.02 }}
        />
        <motion.input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 liquid-input rounded-lg"
          whileFocus={{ scale: 1.02 }}
        />
        <motion.button
          type="submit"
          className="w-full bg-[var(--button-bg)] text-white p-3 rounded-lg hover:bg-[var(--button-hover)] transition font-medium liquid-hover"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </form>
    </motion.div>
  );
}

export default Login;