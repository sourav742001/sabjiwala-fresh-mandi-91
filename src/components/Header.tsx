
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-sabjiwala-green">TheSabji<span className="text-sabjiwala-orange">Wala</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-sabjiwala-green transition-colors">Home</Link>
            <Link to="/shop" className="font-medium hover:text-sabjiwala-green transition-colors">Shop</Link>
            <Link to="/categories" className="font-medium hover:text-sabjiwala-green transition-colors">Categories</Link>
            <Link to="/offers" className="font-medium hover:text-sabjiwala-green transition-colors">Offers</Link>
            <Link to="/about" className="font-medium hover:text-sabjiwala-green transition-colors">About</Link>
          </nav>
          
          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Search">
              <Search size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Account">
              <User size={20} />
            </button>
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-sabjiwala-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t mt-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="font-medium hover:text-sabjiwala-green transition-colors">Home</Link>
              <Link to="/shop" className="font-medium hover:text-sabjiwala-green transition-colors">Shop</Link>
              <Link to="/categories" className="font-medium hover:text-sabjiwala-green transition-colors">Categories</Link>
              <Link to="/offers" className="font-medium hover:text-sabjiwala-green transition-colors">Offers</Link>
              <Link to="/about" className="font-medium hover:text-sabjiwala-green transition-colors">About</Link>
            </nav>
            <div className="flex items-center space-x-6 mt-6">
              <button className="flex items-center space-x-1">
                <Search size={18} />
                <span>Search</span>
              </button>
              <button className="flex items-center space-x-1">
                <User size={18} />
                <span>Account</span>
              </button>
              <Link to="/cart" className="flex items-center space-x-1">
                <div className="relative">
                  <ShoppingCart size={18} />
                  <span className="absolute -top-1 -right-1 bg-sabjiwala-orange text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    0
                  </span>
                </div>
                <span>Cart</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
