
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };
  
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
              className="text-2xl font-bold"
            >
              <span className="text-emerald-700">The</span>
              <span className="text-sabjiwala-orange">SabjiWala</span>
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
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={18} className="text-gray-600" />
            </motion.button>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link to="/profile" className="p-2 hover:bg-emerald-50 rounded-full transition-colors">
                <User size={18} className="text-gray-600" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link to="/cart" className="p-2 hover:bg-emerald-50 rounded-full transition-colors relative">
                <ShoppingCart size={18} className="text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
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
        
        {/* Search Bar (Desktop) */}
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden md:block pt-4 border-t mt-4"
          >
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for vegetables, fruits, or groceries..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                className="ml-2 px-4 py-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-800 transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                className="ml-2 p-2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsSearchOpen(false)}
              >
                <X size={20} />
              </button>
            </form>
          </motion.div>
        )}
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden py-4 border-t mt-4"
          >
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex items-center">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button 
                  type="submit" 
                  className="ml-2 px-4 py-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-800 transition-colors"
                >
                  Go
                </button>
              </div>
            </form>
            
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
              <Link to="/profile" className="flex items-center space-x-1" onClick={() => setIsMenuOpen(false)}>
                <User size={16} className="text-gray-600" />
                <span className="text-sm">Profile</span>
              </Link>
              <Link to="/cart" className="flex items-center space-x-1" onClick={() => setIsMenuOpen(false)}>
                <div className="relative">
                  <ShoppingCart size={16} className="text-gray-600" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-sm">Cart ({cartCount})</span>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
