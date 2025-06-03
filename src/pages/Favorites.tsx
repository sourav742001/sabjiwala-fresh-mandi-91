
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useFavorites } from '@/context/FavoritesContext';
import VegetableCard from '@/components/VegetableCard';

const Favorites = () => {
  const { favorites } = useFavorites();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        {/* Hero Banner */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative bg-emerald-50"
        >
          <div className="container-custom py-20">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="w-16 h-1 bg-emerald-700 mb-6"></div>
                <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                  My <span className="text-emerald-700 font-medium">Favorites</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 font-light">
                  Keep track of your favorite products for easy access
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Favorites Content */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            {favorites.length === 0 ? (
              <div className="py-20 text-center">
                <div className="flex justify-center mb-6">
                  <Heart size={60} className="text-gray-300" />
                </div>
                <h2 className="text-2xl font-medium text-gray-700 mb-4">Your favorites list is empty</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  Add items to your favorites by clicking the heart icon on any product.
                </p>
                <Button 
                  asChild
                  className="bg-emerald-700 hover:bg-emerald-800"
                >
                  <Link to="/shop">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Browse Products
                  </Link>
                </Button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-medium">
                    Favorites <span className="text-gray-500 text-sm">({favorites.length} items)</span>
                  </h2>
                  <Button asChild variant="outline">
                    <Link to="/shop">Continue Shopping</Link>
                  </Button>
                </div>
                
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {favorites.map((vegetable) => (
                    <VegetableCard 
                      key={vegetable.id} 
                      vegetable={vegetable} 
                    />
                  ))}
                </motion.div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
