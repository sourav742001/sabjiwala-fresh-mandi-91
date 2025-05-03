
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Search, Filter, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Mock recipe data - same as in ViewRecipe
const allRecipes = [
  {
    id: "palak-paneer",
    title: "Palak Paneer",
    image: "https://images.unsplash.com/photo-1604197784419-a1de22917761?w=500&auto=format",
    cookTime: "30 mins",
    difficulty: "Medium",
    category: "Main Course",
    tags: ["North Indian", "Vegetarian", "High Protein", "Gluten-Free"],
    description: "A classic North Indian dish made with fresh spinach and paneer cheese, cooked with aromatic spices."
  },
  {
    id: "vegetable-biryani",
    title: "Vegetable Biryani",
    image: "https://images.unsplash.com/photo-1594020931922-1dad43f1c87b?w=500&auto=format",
    cookTime: "45 mins",
    difficulty: "Hard",
    category: "Main Course",
    tags: ["Indian", "Vegetarian", "Rice Dish", "Festival Food"],
    description: "A fragrant rice dish cooked with mixed vegetables and aromatic spices, a perfect meal for special occasions."
  },
  {
    id: "mixed-vegetable-curry",
    title: "Mixed Vegetable Curry",
    image: "https://images.unsplash.com/photo-1605769927692-56221bc58a8e?w=500&auto=format",
    cookTime: "25 mins",
    difficulty: "Easy",
    category: "Main Course",
    tags: ["Indian", "Vegetarian", "Easy", "Low Calorie"],
    description: "A simple and nutritious curry made with seasonal vegetables in a flavorful tomato-based gravy."
  },
  {
    id: "chana-masala",
    title: "Chana Masala",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format",
    cookTime: "35 mins",
    difficulty: "Medium",
    category: "Main Course",
    tags: ["North Indian", "Vegetarian", "High Protein", "Spicy"],
    description: "Chickpeas cooked in a spicy tomato gravy with traditional Indian spices."
  },
  {
    id: "mango-lassi",
    title: "Mango Lassi",
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&auto=format",
    cookTime: "10 mins",
    difficulty: "Easy",
    category: "Beverages",
    tags: ["Indian", "Yogurt", "Sweet", "Refreshing"],
    description: "A refreshing yogurt-based drink with sweet mango pulp and a hint of cardamom."
  },
  {
    id: "aloo-paratha",
    title: "Aloo Paratha",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format",
    cookTime: "40 mins",
    difficulty: "Medium",
    category: "Breakfast",
    tags: ["North Indian", "Vegetarian", "Breakfast", "Potato"],
    description: "Whole wheat flatbread stuffed with spiced potato filling, served with yogurt and pickle."
  },
  {
    id: "masala-chai",
    title: "Masala Chai",
    image: "https://images.unsplash.com/photo-1569923956843-0b5d83465df2?w=500&auto=format",
    cookTime: "15 mins",
    difficulty: "Easy",
    category: "Beverages",
    tags: ["Indian", "Tea", "Spiced", "Hot Drink"],
    description: "A comforting spiced tea with milk, ginger, cardamom, cinnamon, and cloves."
  },
  {
    id: "vegetable-pakora",
    title: "Vegetable Pakora",
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&auto=format",
    cookTime: "20 mins",
    difficulty: "Easy",
    category: "Appetizers",
    tags: ["Indian", "Vegetarian", "Snack", "Fried"],
    description: "Crispy fritters made with mixed vegetables and chickpea flour batter."
  },
  {
    id: "dal-tadka",
    title: "Dal Tadka",
    image: "https://images.unsplash.com/photo-1644364935906-dca59c8bf815?w=500&auto=format",
    cookTime: "30 mins",
    difficulty: "Easy",
    category: "Main Course",
    tags: ["Indian", "Vegetarian", "Lentils", "Comfort Food"],
    description: "Yellow lentils tempered with cumin, garlic, and spices, garnished with fresh coriander."
  },
  {
    id: "gulab-jamun",
    title: "Gulab Jamun",
    image: "https://images.unsplash.com/photo-1601303516361-811d111e108b?w=500&auto=format",
    cookTime: "45 mins",
    difficulty: "Medium",
    category: "Desserts",
    tags: ["Indian", "Sweet", "Dessert", "Festival"],
    description: "Soft milk solids dumplings soaked in rose and cardamom flavored sugar syrup."
  },
  {
    id: "saag-aloo",
    title: "Saag Aloo",
    image: "https://images.unsplash.com/photo-1616166358812-6755ca91e63a?w=500&auto=format",
    cookTime: "35 mins",
    difficulty: "Medium",
    category: "Side Dish",
    tags: ["Indian", "Vegetarian", "Spinach", "Potato"],
    description: "A comforting dish of potatoes cooked with spiced spinach puree."
  },
  {
    id: "onion-bhaji",
    title: "Onion Bhaji",
    image: "https://images.unsplash.com/photo-1625938144859-4284ffcf31d1?w=500&auto=format",
    cookTime: "25 mins",
    difficulty: "Easy",
    category: "Appetizers",
    tags: ["Indian", "Vegetarian", "Snack", "Fried"],
    description: "Crispy onion fritters made with chickpea flour and spices, perfect as a starter or snack."
  }
];

const categories = ["All", "Main Course", "Side Dish", "Appetizers", "Desserts", "Breakfast", "Beverages"];
const difficulties = ["All", "Easy", "Medium", "Hard"];

const Recipes = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Filter recipes based on search and filters
  const filteredRecipes = allRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || recipe.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.div 
          className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white py-16 md:py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Explore Our Recipes
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-emerald-100"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Discover delicious Indian recipes using our fresh vegetables and ingredients
            </motion.p>

            {/* Search Bar */}
            <motion.div 
              className="max-w-xl mx-auto relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                type="text"
                placeholder="Search for recipes..."
                className="pl-10 py-6 bg-white text-gray-800 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Filters Section */}
        <div className="bg-emerald-50 py-4 border-b border-emerald-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <Button 
                  variant="ghost" 
                  className="text-emerald-700 flex items-center"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={16} className="mr-2" />
                  Filters
                  <ChevronDown size={16} className={`ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
                
                {searchTerm && (
                  <div className="ml-4 flex items-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                    <span className="text-sm">"{searchTerm}"</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5 ml-1 p-0 text-emerald-800 hover:bg-transparent"
                      onClick={() => setSearchTerm("")}
                    >
                      <X size={12} />
                    </Button>
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-500">
                Showing {filteredRecipes.length} recipes
              </div>
            </div>
            
            {showFilters && (
              <motion.div 
                className="mt-4 pb-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2 text-gray-700">Filter by category</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Button 
                          key={category} 
                          variant={selectedCategory === category ? "default" : "outline"}
                          className={selectedCategory === category ? 
                            "bg-emerald-600 hover:bg-emerald-700" : 
                            "text-gray-700 hover:text-emerald-700"
                          }
                          onClick={() => setSelectedCategory(category)}
                          size="sm"
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2 text-gray-700">Filter by difficulty</h3>
                    <div className="flex flex-wrap gap-2">
                      {difficulties.map((difficulty) => (
                        <Button 
                          key={difficulty} 
                          variant={selectedDifficulty === difficulty ? "default" : "outline"}
                          className={selectedDifficulty === difficulty ? 
                            "bg-emerald-600 hover:bg-emerald-700" : 
                            "text-gray-700 hover:text-emerald-700"
                          }
                          onClick={() => setSelectedDifficulty(difficulty)}
                          size="sm"
                        >
                          {difficulty}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="grid">
            <div className="flex justify-end mb-6">
              <TabsList>
                <TabsTrigger value="grid" className="text-sm">Grid View</TabsTrigger>
                <TabsTrigger value="list" className="text-sm">List View</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid">
              {filteredRecipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRecipes.map((recipe) => (
                    <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
                      <motion.div
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="overflow-hidden h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                          <div className="relative h-48">
                            <img 
                              src={recipe.image} 
                              alt={recipe.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4">
                              <span className={`inline-block px-3 py-1 text-xs rounded-full ${
                                recipe.difficulty === 'Easy' ? 'bg-emerald-500 text-white' : 
                                recipe.difficulty === 'Medium' ? 'bg-yellow-500 text-white' : 
                                'bg-red-500 text-white'
                              }`}>
                                {recipe.difficulty}
                              </span>
                            </div>
                          </div>
                          <CardContent className="p-5">
                            <div className="flex items-center mb-2">
                              <Clock size={16} className="text-emerald-600 mr-2" />
                              <span className="text-sm text-gray-500">{recipe.cookTime}</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
                            <p className="text-gray-600 text-sm line-clamp-2">{recipe.description}</p>
                            
                            <div className="mt-4 flex flex-wrap gap-2">
                              {recipe.tags.slice(0, 2).map((tag, index) => (
                                <span key={index} className="inline-block px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700">
                                  {tag}
                                </span>
                              ))}
                              {recipe.tags.length > 2 && (
                                <span className="inline-block px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                                  +{recipe.tags.length - 2}
                                </span>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-semibold mb-4">No recipes found</h3>
                  <p className="text-gray-600 mb-8">Try changing your search or filters</p>
                  <Button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                      setSelectedDifficulty('All');
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="list">
              {filteredRecipes.length > 0 ? (
                <div className="space-y-6">
                  {filteredRecipes.map((recipe) => (
                    <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 h-48 md:h-auto">
                              <img 
                                src={recipe.image} 
                                alt={recipe.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <CardContent className="p-6 md:w-3/4">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-semibold">{recipe.title}</h3>
                                <span className={`inline-block px-3 py-1 text-xs rounded-full ${
                                  recipe.difficulty === 'Easy' ? 'bg-emerald-500 text-white' : 
                                  recipe.difficulty === 'Medium' ? 'bg-yellow-500 text-white' : 
                                  'bg-red-500 text-white'
                                }`}>
                                  {recipe.difficulty}
                                </span>
                              </div>
                              <div className="flex items-center mb-4">
                                <Clock size={16} className="text-emerald-600 mr-2" />
                                <span className="text-sm text-gray-500">{recipe.cookTime}</span>
                                <span className="mx-2 text-gray-400">•</span>
                                <span className="text-sm text-gray-500">{recipe.category}</span>
                              </div>
                              <p className="text-gray-600 mb-4">{recipe.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {recipe.tags.map((tag, index) => (
                                  <span key={index} className="inline-block px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-semibold mb-4">No recipes found</h3>
                  <p className="text-gray-600 mb-8">Try changing your search or filters</p>
                  <Button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                      setSelectedDifficulty('All');
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Recipes;
