
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
  ];
  
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white border-b border-gray-100 sticky top-0 z-50"
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-light text-emerald-700"
            >
              The<span className="font-medium">SabjiWala</span>
            </motion.span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className={`font-light text-sm tracking-wide transition-colors relative ${
                  location.pathname === link.path ? 'text-emerald-700' : 'text-gray-700 hover:text-emerald-700'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-[-4px] h-[2px] bg-emerald-700" 
                  />
                )}
              </Link>
            ))}
          </nav>
          
          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-emerald-50 rounded-full transition-colors" 
              aria-label="Search"
            >
              <Search size={18} className="text-gray-600" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-emerald-50 rounded-full transition-colors" 
              aria-label="Account"
            >
              <User size={18} className="text-gray-600" />
            </motion.button>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link to="/cart" className="p-2 hover:bg-emerald-50 rounded-full transition-colors relative">
                <ShoppingCart size={18} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-emerald-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>
            </motion.div>
          </div>
          
          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 hover:bg-emerald-50 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden py-4 border-t mt-4"
          >
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path} 
                  className={`font-light transition-colors ${
                    location.pathname === link.path ? 'text-emerald-700' : 'text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-6 mt-6">
              <button className="flex items-center space-x-1">
                <Search size={16} className="text-gray-600" />
                <span className="text-sm">Search</span>
              </button>
              <button className="flex items-center space-x-1">
                <User size={16} className="text-gray-600" />
                <span className="text-sm">Account</span>
              </button>
              <Link to="/cart" className="flex items-center space-x-1">
                <div className="relative">
                  <ShoppingCart size={16} className="text-gray-600" />
                  <span className="absolute -top-1 -right-1 bg-emerald-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    0
                  </span>
                </div>
                <span className="text-sm">Cart</span>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
