
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import LogoComponent from './LogoComponent';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const links = [
    { name: 'Home', to: '/' },
    { name: 'Shop', to: '/shop' },
    { name: 'Categories', to: '/categories' },
    { name: 'Recipes', to: '/recipes' },
    { name: 'About', to: '/about' },
    { name: 'Contact', to: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen 
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <LogoComponent variant="header" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.to 
                    ? 'text-emerald-700 border-b-2 border-emerald-500'
                    : isScrolled 
                      ? 'text-gray-800 hover:text-emerald-700'
                      : 'text-gray-800 hover:text-emerald-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Link to="/search" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Search className="h-5 w-5 text-gray-700" />
            </Link>
            
            <Link to="/favorites" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Heart className="h-5 w-5 text-gray-700" />
            </Link>
            
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 text-xs font-medium flex items-center justify-center bg-emerald-600 text-white rounded-full">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>
            
            <div className="hidden md:block">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-emerald-700 mr-1">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-emerald-700 hover:bg-emerald-800">
                  Sign Up
                </Button>
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-100 md:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-800" />
              ) : (
                <Menu className="h-6 w-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 border-t border-gray-200"
          >
            <nav className="flex flex-col py-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className={`py-2 px-4 ${
                    location.pathname === link.to 
                      ? 'text-emerald-700 bg-emerald-50 font-medium'
                      : 'text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="py-3 px-4 border-t border-gray-200 mt-2 flex gap-2">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" className="flex-1">
                  <Button size="sm" className="w-full bg-emerald-700 hover:bg-emerald-800">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
