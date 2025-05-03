
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GoatAnimation = () => {
  const [position, setPosition] = useState(0);
  const [isEating, setIsEating] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prevPosition => {
        // Reset position when it reaches the end
        if (prevPosition >= 95) {
          return -10;
        }
        // 40% chance of stopping to eat grass
        if (Math.random() < 0.4 && !isEating) {
          setIsEating(true);
          setTimeout(() => setIsEating(false), 2000);
          return prevPosition;
        }
        // Continue moving if not eating
        return isEating ? prevPosition : prevPosition + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isEating]);

  return (
    <div className="relative w-full h-10 overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-6 left-0 w-full h-2 bg-emerald-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        />
      </div>
      
      {/* Grass patches */}
      {[10, 25, 40, 55, 70, 85].map((pos, index) => (
        <div 
          key={index}
          className="absolute top-2 h-4 w-8"
          style={{ left: `${pos}%` }}
        >
          <div className="flex space-x-0.5">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="w-1 h-3 bg-emerald-500 rounded-t-full"
                style={{
                  height: `${Math.random() * 8 + 4}px`,
                  transform: `rotate(${Math.random() * 10 - 5}deg)`,
                }}
              />
            ))}
          </div>
        </div>
      ))}
      
      {/* Goat */}
      <motion.div
        className="absolute bottom-2"
        style={{ left: `${position}%` }}
        animate={{
          y: isEating ? [-0, -5, 0] : 0
        }}
        transition={{
          y: { duration: 0.5, repeat: isEating ? 3 : 0 }
        }}
      >
        <div className="relative h-10 w-12">
          {/* Body */}
          <div className="absolute bottom-0 w-8 h-6 bg-white rounded-lg border border-gray-300"></div>
          
          {/* Head */}
          <div className="absolute bottom-2 right-1 w-5 h-5 bg-white rounded-lg border border-gray-300 transform rotate-12">
            {/* Eye */}
            <div className="absolute top-1 right-1 w-1 h-1 bg-black rounded-full"></div>
            
            {/* Ear */}
            <div className="absolute top-0 right-4 w-2 h-3 bg-white rounded-md border border-gray-300 transform -rotate-45"></div>
            
            {/* Horn */}
            <div className="absolute top-0 left-1 w-1 h-2 bg-gray-400 rounded-full transform -rotate-12"></div>
          </div>
          
          {/* Legs */}
          <div className="absolute bottom-0 left-1 w-1 h-2 bg-gray-400 rounded-b-sm"></div>
          <div className="absolute bottom-0 left-3 w-1 h-2.5 bg-gray-400 rounded-b-sm"></div>
          <div className="absolute bottom-0 left-5 w-1 h-2 bg-gray-400 rounded-b-sm"></div>
          <div className="absolute bottom-0 left-7 w-1 h-2.5 bg-gray-400 rounded-b-sm"></div>
          
          {/* Tail */}
          <div className="absolute bottom-4 left-0 w-2 h-1 bg-white rounded-full border border-gray-300"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default GoatAnimation;
