
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const recipes = [
  {
    title: "Palak Paneer",
    image: "https://images.unsplash.com/photo-1604197784419-a1de22917761?w=500&auto=format",
    cookTime: "30 mins",
    difficulty: "Medium",
    ingredients: 6
  },
  {
    title: "Vegetable Biryani",
    image: "https://images.unsplash.com/photo-1594020931922-1dad43f1c87b?w=500&auto=format",
    cookTime: "45 mins",
    difficulty: "Hard",
    ingredients: 12
  },
  {
    title: "Mixed Vegetable Curry",
    image: "https://images.unsplash.com/photo-1605769927692-56221bc58a8e?w=500&auto=format",
    cookTime: "25 mins",
    difficulty: "Easy",
    ingredients: 8
  }
];

const RecipesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800">Delicious Recipes</h2>
            <p className="text-gray-600 mt-2">Explore mouth-watering recipes using our fresh vegetables</p>
          </motion.div>
          
          <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
            View All Recipes
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full border-0 shadow-md">
                <div className="relative h-48">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-xl mb-3">{recipe.title}</h3>
                  <div className="flex justify-between items-center mb-3 text-sm">
                    <span className="text-gray-600">Cook Time: {recipe.cookTime}</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      recipe.difficulty === "Easy" 
                        ? "bg-emerald-100 text-emerald-700" 
                        : recipe.difficulty === "Medium" 
                        ? "bg-yellow-100 text-yellow-700" 
                        : "bg-red-100 text-red-700"
                    }`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">Ingredients: {recipe.ingredients} items</p>
                  <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700 w-full">
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipesSection;
