
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Filter, ArrowRight, ArrowUpZA, ArrowDownZA, ArrowUpAZ, ArrowDownAZ } from 'lucide-react';
import { vegetables, getAllCategories, getMinMaxPrice } from '@/data/vegetables';
import { Button } from '@/components/ui/button';
import { Vegetable, SortOption, FilterOptions } from '@/types/vegetable';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import VegetableCard from '@/components/VegetableCard';

const Shop = () => {
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: [],
    organic: false,
    priceRange: getMinMaxPrice(),
    type: null
  });
  const [filteredItems, setFilteredItems] = useState<Vegetable[]>(vegetables);
  const [displayedItems, setDisplayedItems] = useState<Vegetable[]>([]);
  const categories = getAllCategories();
  const [priceRange, setPriceRange] = useState<[number, number]>(getMinMaxPrice());

  // Apply filters and sort
  useEffect(() => {
    // First apply filters
    let result = vegetables.filter((item) => {
      // Filter by type
      if (filterOptions.type && item.type !== filterOptions.type) return false;
      
      // Filter by category
      if (filterOptions.categories.length > 0 && !filterOptions.categories.includes(item.category)) return false;
      
      // Filter by organic
      if (filterOptions.organic && !item.isOrganic) return false;
      
      // Filter by price range
      if (item.price < filterOptions.priceRange[0] || item.price > filterOptions.priceRange[1]) return false;
      
      return true;
    });
    
    // Then apply sorting
    result = sortItems(result, sortOption);
    
    setFilteredItems(result);
  }, [filterOptions, sortOption]);
  
  // Update displayed items based on filtered items and visible count
  useEffect(() => {
    setDisplayedItems(filteredItems.slice(0, visibleCount));
  }, [filteredItems, visibleCount]);

  const sortItems = (items: Vegetable[], option: SortOption): Vegetable[] => {
    const sortedItems = [...items];
    
    switch (option) {
      case 'price-low-high':
        return sortedItems.sort((a, b) => a.price - b.price);
      case 'price-high-low':
        return sortedItems.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sortedItems.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sortedItems.sort((a, b) => b.name.localeCompare(a.name));
      default:
        // For featured, we'll use the original order
        return sortedItems;
    }
  };

  const handleCategoryChange = (category: string) => {
    setFilterOptions(prev => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return { ...prev, categories };
    });
  };

  const handleTypeChange = (type: string | null) => {
    setFilterOptions(prev => ({ ...prev, type }));
  };

  const handleOrganicChange = (checked: boolean) => {
    setFilterOptions(prev => ({ ...prev, organic: checked }));
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
    setFilterOptions(prev => ({ ...prev, priceRange: [value[0], value[1]] }));
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 12, filteredItems.length));
  };

  const handleSortChange = (value: string) => {
    setSortOption(value as SortOption);
  };

  const resetFilters = () => {
    setFilterOptions({
      categories: [],
      organic: false,
      priceRange: getMinMaxPrice(),
      type: null
    });
    setPriceRange(getMinMaxPrice());
    setSortOption('featured');
  };

  const hasMore = visibleCount < filteredItems.length;

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
                  Our <span className="text-emerald-700 font-medium">Collection</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 font-light">
                  Discover our carefully curated selection of premium fresh produce
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Shop Content */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filters sidebar */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full md:w-64 shrink-0"
              >
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Filter size={18} className="text-emerald-700" />
                        <h2 className="text-xl font-medium">Filters</h2>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={resetFilters}
                        className="text-xs text-emerald-700 hover:text-emerald-800"
                      >
                        Reset
                      </Button>
                    </div>
                    
                    {/* Product Type Filter */}
                    <div className="mb-6">
                      <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Product Type</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Checkbox 
                            id="type-all" 
                            checked={filterOptions.type === null}
                            onCheckedChange={() => handleTypeChange(null)}
                          />
                          <Label htmlFor="type-all" className="ml-2 text-gray-700">All Products</Label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox 
                            id="type-vegetable" 
                            checked={filterOptions.type === 'vegetable'}
                            onCheckedChange={() => handleTypeChange(filterOptions.type === 'vegetable' ? null : 'vegetable')}
                          />
                          <Label htmlFor="type-vegetable" className="ml-2 text-gray-700">Vegetables</Label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox 
                            id="type-fruit" 
                            checked={filterOptions.type === 'fruit'}
                            onCheckedChange={() => handleTypeChange(filterOptions.type === 'fruit' ? null : 'fruit')}
                          />
                          <Label htmlFor="type-fruit" className="ml-2 text-gray-700">Fruits</Label>
                        </div>
                      </div>
                    </div>
                    
                    {/* Categories Filter */}
                    <div className="mb-6">
                      <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Categories</h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                        {categories.map(category => (
                          <div key={category} className="flex items-center">
                            <Checkbox 
                              id={`category-${category}`}
                              checked={filterOptions.categories.includes(category)}
                              onCheckedChange={() => handleCategoryChange(category)}
                              className="accent-emerald-700"
                            />
                            <Label 
                              htmlFor={`category-${category}`} 
                              className="ml-2 text-gray-700 capitalize"
                            >
                              {category.replace('-', ' ')}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Organic Filter */}
                    <div className="mb-6">
                      <div className="flex items-center">
                        <Checkbox 
                          id="organic-only" 
                          checked={filterOptions.organic}
                          onCheckedChange={checked => handleOrganicChange(!!checked)}
                          className="accent-emerald-700"
                        />
                        <Label htmlFor="organic-only" className="ml-2 text-gray-700">Organic Only</Label>
                      </div>
                    </div>
                    
                    {/* Price Range Filter */}
                    <div>
                      <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Price Range</h3>
                      <Slider
                        defaultValue={[priceRange[0], priceRange[1]]}
                        value={[priceRange[0], priceRange[1]]}
                        min={getMinMaxPrice()[0]}
                        max={getMinMaxPrice()[1]}
                        step={10}
                        onValueChange={handlePriceChange}
                        className="mb-2"
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Products grid */}
              <div className="flex-1">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8"
                >
                  <div>
                    <h2 className="text-xl font-medium">
                      Products <span className="text-gray-500 text-sm">({filteredItems.length} items)</span>
                    </h2>
                    {filterOptions.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {filterOptions.categories.map(category => (
                          <Badge 
                            key={category} 
                            variant="outline"
                            className="bg-emerald-50 text-emerald-700 border-emerald-200 capitalize"
                          >
                            {category.replace('-', ' ')}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center w-full md:w-auto">
                    <Select value={sortOption} onValueChange={handleSortChange}>
                      <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">
                          <div className="flex items-center gap-2">
                            Featured
                          </div>
                        </SelectItem>
                        <SelectItem value="price-low-high">
                          <div className="flex items-center gap-2">
                            <ArrowUpAZ size={16} />
                            Price: Low to High
                          </div>
                        </SelectItem>
                        <SelectItem value="price-high-low">
                          <div className="flex items-center gap-2">
                            <ArrowDownAZ size={16} />
                            Price: High to Low
                          </div>
                        </SelectItem>
                        <SelectItem value="name-asc">
                          <div className="flex items-center gap-2">
                            <ArrowUpAZ size={16} />
                            Name: A to Z
                          </div>
                        </SelectItem>
                        <SelectItem value="name-desc">
                          <div className="flex items-center gap-2">
                            <ArrowDownAZ size={16} />
                            Name: Z to A
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
                
                {filteredItems.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-lg text-gray-500">No products matching your filters.</p>
                    <Button 
                      onClick={resetFilters}
                      variant="link" 
                      className="text-emerald-700 mt-2"
                    >
                      Reset filters
                    </Button>
                  </div>
                ) : (
                  <>
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      {displayedItems.map((vegetable) => (
                        <VegetableCard key={vegetable.id} vegetable={vegetable} />
                      ))}
                    </motion.div>
                    
                    {hasMore && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="mt-12 flex justify-center"
                      >
                        <Button
                          onClick={handleLoadMore}
                          variant="outline"
                          className="flex items-center gap-2 px-6 py-3 border border-emerald-700 text-emerald-700 hover:bg-emerald-50 transition-colors rounded-sm"
                        >
                          Load More <ArrowRight size={16} />
                        </Button>
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
