
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, X, Filter, ShoppingCart } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { vegetables } from '@/data/vegetables';
import { useCart } from '@/context/CartContext';
import { Vegetable } from '@/types/vegetable';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Vegetable[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { addToCart } = useCart();

  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 500],
    organic: false,
    inStock: true,
  });

  // Search function
  useEffect(() => {
    const searchVegetables = () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      // Filter vegetables based on search query and filters
      const filtered = vegetables.filter((veg) => {
        const matchesQuery = veg.name.toLowerCase().includes(query.toLowerCase()) ||
                            veg.description.toLowerCase().includes(query.toLowerCase()) ||
                            veg.category.toLowerCase().includes(query.toLowerCase());
                            
        const matchesCategory = !filters.category || veg.category === filters.category;
        const matchesPrice = veg.price >= filters.priceRange[0] && veg.price <= filters.priceRange[1];
        const matchesOrganic = !filters.organic || veg.isOrganic === filters.organic;
        const matchesStock = !filters.inStock || veg.inStock === filters.inStock;
        
        return matchesQuery && matchesCategory && matchesPrice && matchesOrganic && matchesStock;
      });
      
      setResults(filtered);
    };

    searchVegetables();
  }, [query, filters]);
  
  // Update URL when query changes
  useEffect(() => {
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  }, [query, setSearchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setSearchParams({});
  };

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-emerald-50 py-10"
        >
          <div className="container-custom">
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for vegetables, fruits, or groceries..."
                  className="pl-12 pr-10 py-4 w-full border-0 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={clearSearch}
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                )}
              </div>
              <button type="submit" className="hidden">Search</button>
            </form>
          </div>
        </motion.div>
        
        {/* Search Results */}
        <section className="py-16">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filters sidebar */}
              <div className="md:w-64 shrink-0">
                <div className="flex justify-between items-center mb-4 md:hidden">
                  <h2 className="text-xl font-medium">Filters</h2>
                  <Button 
                    variant="ghost" 
                    className="p-2 flex items-center"
                    onClick={() => setFiltersOpen(!filtersOpen)}
                  >
                    <Filter className="h-5 w-5 mr-2" />
                    {filtersOpen ? 'Hide Filters' : 'Show Filters'}
                  </Button>
                </div>
                
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ 
                    height: filtersOpen || window.innerWidth >= 768 ? 'auto' : 0,
                    opacity: filtersOpen || window.innerWidth >= 768 ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden md:h-auto md:opacity-100"
                >
                  <div className="p-6 border border-emerald-100 rounded-md">
                    <div className="mb-6">
                      <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Categories</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="category-all" 
                            name="category" 
                            className="mr-2 accent-emerald-700"
                            checked={filters.category === ''}
                            onChange={() => handleFilterChange('category', '')}
                          />
                          <label htmlFor="category-all" className="text-gray-700">All Categories</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="category-vegetables" 
                            name="category" 
                            className="mr-2 accent-emerald-700"
                            checked={filters.category === 'Vegetables'}
                            onChange={() => handleFilterChange('category', 'Vegetables')}
                          />
                          <label htmlFor="category-vegetables" className="text-gray-700">Vegetables</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="category-fruits" 
                            name="category" 
                            className="mr-2 accent-emerald-700"
                            checked={filters.category === 'Fruits'}
                            onChange={() => handleFilterChange('category', 'Fruits')}
                          />
                          <label htmlFor="category-fruits" className="text-gray-700">Fruits</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="category-herbs" 
                            name="category" 
                            className="mr-2 accent-emerald-700"
                            checked={filters.category === 'Herbs'}
                            onChange={() => handleFilterChange('category', 'Herbs')}
                          />
                          <label htmlFor="category-herbs" className="text-gray-700">Herbs</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Price Range</h3>
                      <input 
                        type="range" 
                        min="0" 
                        max="500" 
                        className="w-full accent-emerald-700"
                        value={filters.priceRange[1]}
                        onChange={(e) => handleFilterChange('priceRange', [0, Number(e.target.value)])}
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>₹0</span>
                        <span>₹{filters.priceRange[1]}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="organic" 
                          className="mr-2 accent-emerald-700"
                          checked={filters.organic}
                          onChange={(e) => handleFilterChange('organic', e.target.checked)}
                        />
                        <label htmlFor="organic" className="text-gray-700">Organic Only</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="in-stock" 
                          className="mr-2 accent-emerald-700"
                          checked={filters.inStock}
                          onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                        />
                        <label htmlFor="in-stock" className="text-gray-700">In Stock</label>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Results grid */}
              <div className="flex-1">
                {query ? (
                  <>
                    <div className="mb-8">
                      <h2 className="text-xl font-medium">
                        {results.length > 0 
                          ? `Found ${results.length} results for "${query}"` 
                          : `No results found for "${query}"`}
                      </h2>
                    </div>
                    
                    {results.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map((vegetable) => (
                          <SearchResultCard 
                            key={vegetable.id} 
                            vegetable={vegetable} 
                            addToCart={addToCart}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-8xl mb-4">🔍</div>
                        <h3 className="text-2xl font-medium mb-2">No results found</h3>
                        <p className="text-gray-600 mb-8">
                          Try using different keywords or browse our categories
                        </p>
                        <Button 
                          onClick={() => navigate('/shop')} 
                          className="bg-emerald-700 hover:bg-emerald-800"
                        >
                          Browse All Products
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-8xl mb-4">🔍</div>
                    <h3 className="text-2xl font-medium mb-2">Search for products</h3>
                    <p className="text-gray-600">
                      Type keywords to find your favorite vegetables and fruits
                    </p>
                  </div>
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

// Search Result Card Component
const SearchResultCard = ({ 
  vegetable, 
  addToCart 
}: { 
  vegetable: Vegetable; 
  addToCart: (item: Vegetable, quantity: number) => void;
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(vegetable, quantity);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border border-gray-100 rounded-lg overflow-hidden group"
    >
      <Link to={`/vegetable/${vegetable.id}`} className="block">
        <div className="w-full h-48 overflow-hidden bg-emerald-50">
          <motion.img 
            src={vegetable.images[0].url}
            alt={vegetable.images[0].alt}
            className="w-full h-full object-cover transition-transform"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <div className="p-4 border-t border-gray-100">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-light text-gray-800">{vegetable.name}</h3>
            {vegetable.isOrganic && (
              <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-full">Organic</span>
            )}
          </div>
          
          <div className="mb-2">
            <span className="text-lg font-medium text-emerald-700">
              ₹{vegetable.price}/{vegetable.unit}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {vegetable.description}
          </p>
        </div>
      </Link>
      
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center border border-gray-200 rounded-md">
            <button 
              onClick={handleDecrement}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50"
            >
              -
            </button>
            <span className="w-10 text-center">{quantity}</span>
            <button 
              onClick={handleIncrement}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50"
            >
              +
            </button>
          </div>
          <Button 
            onClick={handleAddToCart}
            className="flex-1 ml-4 py-2 bg-emerald-700 text-white hover:bg-emerald-800 transition-colors rounded-md"
          >
            <ShoppingCart size={16} className="mr-2" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Search;
