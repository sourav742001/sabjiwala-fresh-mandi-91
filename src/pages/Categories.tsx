import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { vegetables } from '@/data/vegetables';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, LeafyGreen, Carrot } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import VegetableCard from '@/components/VegetableCard';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

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
    { value: 'exotic', label: 'Exotic', icon: null },
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

export default Categories;
