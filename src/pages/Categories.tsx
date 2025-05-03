import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { vegetables } from '@/data/vegetables';
import { Vegetable } from '@/types/vegetable';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, LeafyGreen, Carrot, Zucchini } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const { addToCart } = useCart();

  const categories = [
    { value: 'vegetable', label: 'Vegetables' },
    { value: 'fruit', label: 'Fruits' },
    { value: 'leafy-green', label: 'Leafy Greens' },
    { value: 'root', label: 'Root Vegetables' },
    { value: 'exotic', label: 'Exotic' },
  ];

  const filters = [
    { value: 'organic', label: 'Organic Only', icon: LeafyGreen },
    { value: 'indian', label: 'Indian Grown', icon: null },
    { value: 'seasonal', label: 'Seasonal', icon: null },
    { value: 'root', label: 'Root Vegetables', icon: Carrot },
    { value: 'exotic', label: 'Exotic', icon: Zucchini },
  ];

  // Filter vegetables based on selected category and filters
  const filteredVegetables = vegetables.filter((vegetable) => {
    // Category filter
    if (selectedCategory && vegetable.category !== selectedCategory) {
      return false;
    }
    
    // Other filters
    if (selectedFilters.includes('organic') && !vegetable.isOrganic) {
      return false;
    }
    
    if (selectedFilters.includes('indian') && !vegetable.origin.toLowerCase().includes('india')) {
      return false;
    }
    
    if (selectedFilters.includes('root') && vegetable.category !== 'root') {
      return false;
    }
    
    if (selectedFilters.includes('exotic') && vegetable.category !== 'exotic') {
      return false;
    }
    
    return true;
  });

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === selectedCategory ? null : value);
  };

  const handleFilterChange = (values: string[]) => {
    setSelectedFilters(values);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
                  Product <span className="text-emerald-700 font-medium">Categories</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 font-light">
                  Browse our products by category and filters
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Categories and Filters */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="mb-8">
              <h2 className="text-2xl font-medium mb-6">Categories</h2>
              <div className="flex flex-wrap gap-4">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    onClick={() => handleCategoryChange(category.value)}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    className={selectedCategory === category.value ? "bg-emerald-700 hover:bg-emerald-800" : ""}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-medium mb-6">Filters</h2>
              <ToggleGroup 
                type="multiple" 
                className="flex flex-wrap gap-4"
                value={selectedFilters}
                onValueChange={handleFilterChange}
              >
                {filters.map((filter) => (
                  <ToggleGroupItem 
                    key={filter.value} 
                    value={filter.value}
                    className="data-[state=on]:bg-emerald-700 data-[state=on]:text-white"
                  >
                    {filter.icon && <filter.icon className="mr-2 h-4 w-4" />}
                    {filter.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            {/* Special Offers Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium mb-6">Special Offers & Combo Packs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="border border-emerald-100 p-6 bg-emerald-50 rounded-md"
                >
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-emerald-700 text-white text-sm rounded-full mb-2">
                      Limited Offer
                    </span>
                    <h3 className="text-xl font-medium">Fresh Veg Basket</h3>
                    <p className="text-lg text-emerald-700 font-medium">₹99</p>
                  </div>
                  <p className="text-gray-600 mb-4">
                    A curated selection of fresh vegetables - perfect for everyday cooking.
                    Contains 5 essential vegetables at a special price.
                  </p>
                  <Button className="w-full bg-emerald-700 hover:bg-emerald-800">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="border border-emerald-100 p-6 bg-emerald-50 rounded-md"
                >
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-emerald-700 text-white text-sm rounded-full mb-2">
                      Best Value
                    </span>
                    <h3 className="text-xl font-medium">Salad Lovers Pack</h3>
                    <p className="text-lg text-emerald-700 font-medium">₹149</p>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Perfect for fresh salads and healthy eating. Includes lettuce, cucumber, 
                    tomatoes, carrots, and bell peppers.
                  </p>
                  <Button className="w-full bg-emerald-700 hover:bg-emerald-800">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="border border-emerald-100 p-6 bg-emerald-50 rounded-md"
                >
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-emerald-700 text-white text-sm rounded-full mb-2">
                      Family Pack
                    </span>
                    <h3 className="text-xl font-medium">Weekly Essentials</h3>
                    <p className="text-lg text-emerald-700 font-medium">₹299</p>
                  </div>
                  <p className="text-gray-600 mb-4">
                    A complete pack of vegetables for your weekly kitchen needs. 
                    Save 20% compared to individual purchases.
                  </p>
                  <Button className="w-full bg-emerald-700 hover:bg-emerald-800">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </motion.div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="mt-12">
              <h2 className="text-2xl font-medium mb-6">Products ({filteredVegetables.length})</h2>

              {filteredVegetables.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-500">No products found with the selected filters.</p>
                </div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredVegetables.map((vegetable) => (
                    <VegetableCard 
                      key={vegetable.id} 
                      vegetable={vegetable} 
                      addToCart={addToCart}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Vegetable Card component
const VegetableCard = ({ 
  vegetable, 
  addToCart 
}: { 
  vegetable: Vegetable; 
  addToCart: (item: Vegetable, quantity: number) => void;
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -10 }}
      className="border border-gray-100 group"
    >
      <Link to={`/vegetable/${vegetable.id}`} className="block">
        <div className="w-full h-64 overflow-hidden bg-emerald-50">
          <motion.img 
            src={vegetable.images[0].url}
            alt={vegetable.images[0].alt}
            className="w-full h-full object-cover transition-transform"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <div className="p-6 border-t border-gray-100">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-light text-gray-800">{vegetable.name}</h3>
            {vegetable.isOrganic && (
              <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-sm">Organic</span>
            )}
          </div>
          
          <div className="mb-4">
            <span className="text-lg font-medium text-emerald-700">
              ₹{vegetable.price}/{vegetable.unit}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="px-6 pb-6">
        <Button 
          onClick={() => addToCart(vegetable, 1)}
          className="w-full py-2 bg-emerald-700 text-white flex items-center justify-center gap-2 hover:bg-emerald-800 transition-colors rounded-sm"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
};

export default Categories;
