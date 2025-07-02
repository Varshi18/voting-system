import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RippleContainer = ({ children }) => {
  const [ripples, setRipples] = useState([]);
  const containerRef = useRef(null);

  const lastMouseMoveRippleTime = useRef(0);
  const mouseMoveThrottleDelay = 5;

  const getRelativePosition = useCallback((e) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    
    const rect = containerRef.current.getBoundingClientRect();
    
    // Get the actual client coordinates
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
    
    // Calculate relative position
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    return { x, y };
  }, []);

  const createRipple = useCallback((x, y, isMouseMove = false) => {
    const now = Date.now();

    if (isMouseMove) {
      if (now - lastMouseMoveRippleTime.current < mouseMoveThrottleDelay) {
        return;
      }
      lastMouseMoveRippleTime.current = now;
    }

    const newRipple = { id: now + Math.random(), x: x, y: y };
    setRipples((prevRipples) => [...prevRipples, newRipple]); 

    const rippleDuration = 1200;

    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.filter((r) => r.id !== newRipple.id));
    }, rippleDuration);
  }, []);

  const handleClick = (e) => {
    const { x, y } = getRelativePosition(e);
    createRipple(x, y, false);
  };

  const handleMouseMove = (e) => {
    const { x, y } = getRelativePosition(e);
    createRipple(x, y, true);
  };

  const handleTouchStart = (e) => {
    const { x, y } = getRelativePosition(e);
    createRipple(x, y, false);
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full h-full"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      style={{
        position: 'relative',
        isolation: 'isolate'
      }}
    >
      {children}
      
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute pointer-events-none z-50"
            style={{
                left: ripple.x,
                top: ripple.y,
                width: '4px',
                height: '4px',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(119, 73, 222, 0.1) 0%, rgba(119, 73, 222, 0.03) 50%, rgba(119, 73, 222, 0) 100%)',
                borderRadius: '50%',
            }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 64 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.1, 0.8, 0.2, 1] }}
            />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default RippleContainer;