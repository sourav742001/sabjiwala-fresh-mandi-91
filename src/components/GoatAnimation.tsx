
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GoatAnimation = () => {
  const [position, setPosition] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prevPosition => {
        // Reset position when it reaches the end
        if (prevPosition >= 95) {
          return -10;
        }
        
        // Move faster to complete in roughly 15 seconds
        // (105% total distance / speed increment per 50ms)
        return prevPosition + 0.35;
      });
    }, 50); // 50ms interval for smooth movement

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-16 overflow-hidden my-4">
      {/* Progress Bar */}
      <div className="absolute top-10 left-0 w-full h-3 bg-emerald-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
        />
      </div>
      
      {/* Goat */}
      <motion.div
        className="absolute bottom-2"
        style={{ left: `${position}%` }}
      >
        <div className="relative h-12 w-16">
          {/* Body */}
          <div className="absolute bottom-0 w-10 h-7 bg-gray-200 rounded-lg border border-gray-300"></div>
          
          {/* Head */}
          <div className="absolute bottom-3 right-1 w-6 h-6 bg-gray-200 rounded-lg border border-gray-400 transform rotate-12">
            {/* Eyes */}
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-black rounded-full"></div>
            
            {/* Beard */}
            <div className="absolute bottom-0 left-1 w-2 h-2 bg-white rounded-sm transform -rotate-15"></div>
            
            {/* Ears */}
            <div className="absolute top-0 right-4 w-2 h-3 bg-gray-300 rounded-md border border-gray-400 transform -rotate-45"></div>
            
            {/* Horns */}
            <div className="absolute top-0 left-1 w-1.5 h-3 bg-gray-500 rounded-full transform -rotate-12"></div>
            <div className="absolute top-0 left-3 w-1.5 h-2.5 bg-gray-500 rounded-full transform rotate-5"></div>
          </div>
          
          {/* Legs - with walking animation */}
          <motion.div 
            className="absolute bottom-0 left-1 w-1.5 h-3 bg-gray-400 rounded-b-sm"
            animate={{ rotate: [0, 15, 0, -15, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop" }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-0 left-3.5 w-1.5 h-3 bg-gray-400 rounded-b-sm"
            animate={{ rotate: [0, -15, 0, 15, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop", delay: 0.25 }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-0 left-6 w-1.5 h-3 bg-gray-400 rounded-b-sm"
            animate={{ rotate: [0, 15, 0, -15, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop" }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-0 left-8.5 w-1.5 h-3 bg-gray-400 rounded-b-sm"
            animate={{ rotate: [0, -15, 0, 15, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop", delay: 0.25 }}
          ></motion.div>
          
          {/* Tail */}
          <motion.div 
            className="absolute bottom-5 left-0 w-2 h-1.5 bg-white rounded-full border border-gray-300"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 1, repeat: Infinity }}
          ></motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default GoatAnimation;
