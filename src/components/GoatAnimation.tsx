
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GoatAnimation = () => {
  const [position, setPosition] = useState(0);
  const [isEating, setIsEating] = useState(false);
  const [grassPatches, setGrassPatches] = useState([10, 25, 40, 55, 70, 85]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prevPosition => {
        // Reset position when it reaches the end
        if (prevPosition >= 95) {
          return -10;
        }

        // Check if near a grass patch
        const nearGrass = grassPatches.some(patch => 
          Math.abs(prevPosition - patch) < 2 && !isEating
        );
        
        // Stop to eat grass if near a patch
        if (nearGrass) {
          setIsEating(true);
          // Remove the eaten grass patch after a delay
          setTimeout(() => {
            setGrassPatches(prev => prev.filter(p => Math.abs(p - prevPosition) >= 2));
            setIsEating(false);
          }, 2000);
          return prevPosition;
        }
        
        // Continue moving if not eating
        return isEating ? prevPosition : prevPosition + 1.5; // Faster movement
      });
    }, 50); // Lower interval for smoother movement

    return () => clearInterval(interval);
  }, [isEating, grassPatches]);

  return (
    <div className="relative w-full h-16 overflow-hidden my-4">
      {/* Progress Bar */}
      <div className="absolute top-10 left-0 w-full h-3 bg-emerald-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        />
      </div>
      
      {/* Grass patches - more realistic */}
      {grassPatches.map((pos, index) => (
        <div 
          key={index}
          className="absolute top-6 h-4 w-10"
          style={{ left: `${pos}%` }}
        >
          <div className="flex space-x-0.5">
            {[...Array(7)].map((_, i) => (
              <div 
                key={i}
                className={`w-1.5 bg-emerald-500 rounded-t-full`}
                style={{
                  height: `${Math.random() * 10 + 6}px`,
                  transform: `rotate(${Math.random() * 10 - 5}deg)`,
                  filter: `brightness(${100 - Math.random() * 15}%)`,
                  marginLeft: `${i * 0.5}px`
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
          y: isEating ? [0, -3, 0] : 0
        }}
        transition={{
          y: { duration: 0.3, repeat: isEating ? 5 : 0 }
        }}
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
            animate={{ rotate: isEating ? 0 : [0, 15, 0, -15, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop" }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-0 left-3.5 w-1.5 h-3 bg-gray-400 rounded-b-sm"
            animate={{ rotate: isEating ? 0 : [0, -15, 0, 15, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop", delay: 0.25 }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-0 left-6 w-1.5 h-3 bg-gray-400 rounded-b-sm"
            animate={{ rotate: isEating ? 0 : [0, 15, 0, -15, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop" }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-0 left-8.5 w-1.5 h-3 bg-gray-400 rounded-b-sm"
            animate={{ rotate: isEating ? 0 : [0, -15, 0, 15, 0] }}
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
