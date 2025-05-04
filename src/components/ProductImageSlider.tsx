
import React from 'react';
import { Image } from '@/types/vegetable';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { motion } from 'framer-motion';

interface ProductImageSliderProps {
  images: Image[];
  className?: string;
}

const ProductImageSlider = ({ images, className = "" }: ProductImageSliderProps) => {
  if (!images || images.length === 0) {
    return (
      <div className={`w-full h-64 bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500">No image available</span>
      </div>
    );
  }

  return (
    <Carousel className={`w-full ${className}`}>
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.id}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="h-64 w-full bg-emerald-50 overflow-hidden"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 1 && (
        <>
          <CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-white/80 hover:bg-white" />
          <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-white/80 hover:bg-white" />
        </>
      )}
    </Carousel>
  );
};

export default ProductImageSlider;
