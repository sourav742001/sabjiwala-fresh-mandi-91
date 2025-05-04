
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Vegetable } from '@/types/vegetable';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import ProductImageCarousel from './ProductImageCarousel';

interface VegetableCardProps {
  vegetable: Vegetable;
}

const VegetableCard: React.FC<VegetableCardProps> = ({ vegetable }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(vegetable, quantity);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(vegetable);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -10 }}
      className="border border-gray-100 rounded-lg group overflow-hidden"
    >
      <div className="relative">
        <Link to={`/vegetable/${vegetable.id}`} className="block">
          <ProductImageCarousel images={vegetable.images} />
        </Link>
        <button 
          onClick={handleToggleFavorite}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full ${
            isFavorite(vegetable.id) 
              ? 'bg-red-50 text-red-500' 
              : 'bg-white/70 text-gray-500 hover:text-red-500'
          }`}
        >
          <Heart 
            size={18} 
            fill={isFavorite(vegetable.id) ? "currentColor" : "none"} 
          />
        </button>
      </div>
      
      <Link to={`/vegetable/${vegetable.id}`} className="block">
        <div className="p-6 border-t border-gray-100">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-light text-gray-800">{vegetable.name}</h3>
            <div className="flex flex-col gap-1">
              {vegetable.isOrganic && (
                <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-full">Organic</span>
              )}
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full capitalize">
                {vegetable.type}
              </span>
            </div>
          </div>
          
          <div className="mb-4">
            <span className="text-lg font-medium text-emerald-700">
              ₹{vegetable.price}/{vegetable.unit}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center border border-gray-200 rounded-md">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 p-0"
              onClick={handleDecrement}
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 p-0"
              onClick={handleIncrement}
            >
              <Plus size={16} />
            </Button>
          </div>
          <Button 
            onClick={handleAddToCart}
            className="bg-emerald-700 text-white flex items-center justify-center gap-2 hover:bg-emerald-800 transition-colors rounded-md"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default VegetableCard;
