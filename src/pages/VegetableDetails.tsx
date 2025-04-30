
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Leaf } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getVegetableById } from '@/data/vegetables';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const VegetableDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const vegetable = getVegetableById(id ? parseInt(id) : 0);
  
  useEffect(() => {
    if (!vegetable) {
      navigate('/shop');
    }
  }, [vegetable, navigate]);
  
  if (!vegetable) {
    return null;
  }
  
  const handleAddToCart = () => {
    addToCart(vegetable, quantity);
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        {/* Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-emerald-50 py-4"
        >
          <div className="container-custom">
            <button 
              onClick={() => navigate('/shop')}
              className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to Shop</span>
            </button>
          </div>
        </motion.div>
        
        {/* Product Details Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Main Image */}
                <motion.div 
                  className="w-full h-96 bg-emerald-50 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={vegetable.images[selectedImageIndex].url} 
                    alt={vegetable.images[selectedImageIndex].alt} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Image Thumbnails */}
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  {vegetable.images.map((image, index) => (
                    <motion.button
                      key={image.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-20 h-20 flex-shrink-0 overflow-hidden border-2 ${
                        selectedImageIndex === index ? 'border-emerald-700' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={image.url} 
                        alt={image.alt} 
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
              
              {/* Product Info */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {vegetable.isOrganic && (
                  <div className="flex items-center gap-2 mb-4">
                    <Leaf size={16} className="text-emerald-700" />
                    <span className="text-sm text-emerald-700 font-medium">Organic</span>
                  </div>
                )}
                
                <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">{vegetable.name}</h1>
                
                <div className="mb-6">
                  <span className="text-2xl font-medium text-emerald-700">
                    ₹{vegetable.price}/{vegetable.unit}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-8 leading-relaxed">
                  {vegetable.description}
                </p>
                
                {/* Quantity Selector */}
                <div className="mb-8">
                  <p className="text-sm text-gray-500 mb-2">Quantity</p>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="h-10 w-10"
                    >
                      -
                    </Button>
                    <span className="w-16 text-center text-lg">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="h-10 w-10"
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  className="w-full py-6 bg-emerald-700 hover:bg-emerald-800 text-white"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                
                {/* Product Details Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                  <Card className="p-6 border-emerald-100">
                    <h3 className="text-lg font-medium mb-3">Origin</h3>
                    <p className="text-gray-700">{vegetable.origin}</p>
                  </Card>
                  
                  <Card className="p-6 border-emerald-100">
                    <h3 className="text-lg font-medium mb-3">Nutritional Info</h3>
                    <p className="text-gray-700 text-sm">{vegetable.nutritionalInfo}</p>
                  </Card>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VegetableDetails;
