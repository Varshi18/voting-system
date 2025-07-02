import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ theme, toggleTheme }) => {
  const sunPath = "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z";
  const moonPath = "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z";

  return (
    <motion.nav
      className="navbar fixed top-0 left-0 right-0 z-50 p-4 sm:flex sm:items-center sm:justify-between"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 15, stiffness: 100 }}
    >
      <div className="flex items-center space-x-3">
        <img src="/favicon.ico" alt="Favicon" className="h-8 w-8" />
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[var(--text-heading)]">Boardroom Battles Voting System</h1>
          <p className="text-sm text-[var(--text-secondary)]">IIT Dharwad</p>
        </div>
      </div>
      <motion.button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-[var(--button-bg)] text-white hover:bg-[var(--button-hover)] transition liquid-hover"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          <motion.svg
            key={theme}
            className="theme-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <motion.path
              d={theme === 'dark' ? sunPath : moonPath}
              initial={{ d: theme === 'dark' ? moonPath : sunPath }}
              animate={{ d: theme === 'dark' ? sunPath : moonPath }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </motion.svg>
        </AnimatePresence>
      </motion.button>
    </motion.nav>
  );
};

export default Navbar;