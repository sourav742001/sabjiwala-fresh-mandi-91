
import React from 'react';
import { motion } from 'framer-motion';

const images = [
  {
    src: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1000",
    alt: "Fresh vegetables at market"
  },
  {
    src: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?q=80&w=1000",
    alt: "Mandi scene with vendors"
  },
  {
    src: "https://images.unsplash.com/photo-1467453678174-768ec283a940?q=80&w=1000",
    alt: "Close-up of fresh vegetables"
  },
  {
    src: "https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=1000",
    alt: "Vegetable market activity"
  },
  {
    src: "https://images.unsplash.com/photo-1506617564039-2f3b650b7010?q=80&w=1000",
    alt: "Organic farm vegetables"
  },
  {
    src: "https://images.unsplash.com/photo-1557844351-10a1d3d66e61?q=80&w=1000",
    alt: "Busy vegetable market"
  }
];

const ImageGallery = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-lg shadow-md hover-scale"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-72 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
            <p className="text-white text-sm">{image.alt}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ImageGallery;
