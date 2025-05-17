
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImage {
  id: number;
  url: string;
  alt: string;
}

interface ProductImageCarouselProps {
  images?: ProductImage[];
  className?: string;
}

const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({ images = [], className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (images.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };
  
  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (images.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className={`w-full h-64 bg-gray-100 ${className} flex items-center justify-center`}>
        <span className="text-gray-400">No image available</span>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-64 overflow-hidden bg-emerald-50 ${className}`}>
      <motion.img
        key={currentIndex}
        src={images[currentIndex]?.url || '/placeholder.svg'}
        alt={images[currentIndex]?.alt || 'Product image'}
        className="w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {images.length > 1 && (
        <>
          {/* Navigation arrows */}
          <button 
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1 hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1 hover:bg-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          
          {/* Dots indicator */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
            {images.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-emerald-700' : 'bg-white/70'}`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductImageCarousel;
