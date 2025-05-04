
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'header' | 'footer';
}

const LogoComponent = ({ variant = 'header' }: LogoProps) => {
  const isHeader = variant === 'header';

  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="relative">
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="20" fill={isHeader ? "#047857" : "#ECFDF5"} />
          <path 
            d="M28 13.5C28 17.6421 24.6421 21 20.5 21C16.3579 21 13 17.6421 13 13.5C13 9.35786 16.3579 6 20.5 6C24.6421 6 28 9.35786 28 13.5Z" 
            fill={isHeader ? "#ECFDF5" : "#047857"} 
          />
          <path 
            d="M13 26.5C13 22.3579 16.3579 19 20.5 19C24.6421 19 28 22.3579 28 26.5C28 30.6421 24.6421 34 20.5 34C16.3579 34 13 30.6421 13 26.5Z" 
            fill={isHeader ? "#ECFDF5" : "#047857"} 
          />
        </svg>
      </div>
      <div className="font-bold text-xl">
        <span className={isHeader ? "text-emerald-700" : "text-white"}>The</span>
        <span className={isHeader ? "text-emerald-500" : "text-emerald-300"}>SabjiWala</span>
      </div>
    </Link>
  );
};

export default LogoComponent;
