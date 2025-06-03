
import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Clock, Users, ChefHat, ArrowLeft, Printer, Share2, BookmarkPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Mock recipe data
const recipes = [
  {
    id: "palak-paneer",
    title: "Palak Paneer",
    image: "https://images.unsplash.com/photo-1604197784419-a1de22917761?w=800&auto=format",
    description: "A classic North Indian dish made with fresh spinach and paneer cheese, cooked with aromatic spices.",
    cookTime: "30 mins",
    prepTime: "15 mins",
    difficulty: "Medium",
    servings: 4,
    chef: "Amit Sharma",
    ingredients: [
      "500g fresh spinach, washed and chopped",
      "250g paneer, cubed",
      "2 medium onions, finely chopped",
      "2 medium tomatoes, pureed",
      "2 green chilies, finely chopped",
      "1 tbsp ginger-garlic paste",
      "1 tsp cumin seeds",
      "1 tsp turmeric powder",
      "1 tsp garam masala",
      "1/2 tsp red chili powder",
      "2 tbsp fresh cream",
      "2 tbsp butter or ghee",
      "Salt to taste"
    ],
    instructions: [
      "Blanch the spinach in boiling water for 3 minutes. Drain and blend into a smooth puree.",
      "Heat butter or ghee in a pan. Add cumin seeds and let them splutter.",
      "Add chopped onions and sauté until golden brown.",
      "Add ginger-garlic paste and green chilies. Cook for 2 minutes.",
      "Add tomato puree and cook until oil separates.",
      "Add turmeric, red chili powder, and garam masala. Cook for 2 minutes.",
      "Add spinach puree and cook for 5 minutes on low heat.",
      "Add paneer cubes and salt to taste. Simmer for 5 minutes.",
      "Finish with fresh cream and serve hot with naan or rice."
    ],
    nutritionalInfo: {
      calories: 325,
      protein: "18g",
      carbs: "12g",
      fats: "24g",
      fiber: "6g"
    },
    tags: ["North Indian", "Vegetarian", "High Protein", "Gluten-Free"]
  },
  {
    id: "vegetable-biryani",
    title: "Vegetable Biryani",
    image: "https://images.unsplash.com/photo-1594020931922-1dad43f1c87b?w=800&auto=format",
    description: "A fragrant rice dish cooked with mixed vegetables and aromatic spices, a perfect meal for special occasions.",
    cookTime: "45 mins",
    prepTime: "20 mins",
    difficulty: "Hard",
    servings: 6,
    chef: "Priya Patel",
    ingredients: [
      "2 cups basmati rice, soaked for 30 minutes",
      "2 cups mixed vegetables (carrots, peas, beans, potatoes), chopped",
      "2 large onions, thinly sliced",
      "2 tomatoes, chopped",
      "1/4 cup yogurt",
      "2 tbsp ginger-garlic paste",
      "2 green chilies, slit",
      "1/4 cup mint leaves, chopped",
      "1/4 cup coriander leaves, chopped",
      "1 tsp cumin seeds",
      "1 bay leaf",
      "4 cloves",
      "2 cardamom pods",
      "1-inch cinnamon stick",
      "1 tsp turmeric powder",
      "1 tsp red chili powder",
      "1 tsp garam masala",
      "1/4 cup ghee or oil",
      "Salt to taste",
      "Saffron strands soaked in 2 tbsp warm milk"
    ],
    instructions: [
      "Heat oil in a large pot. Add cumin seeds, bay leaf, cloves, cardamom, and cinnamon. Sauté for 30 seconds.",
      "Add sliced onions and fry until golden brown.",
      "Add ginger-garlic paste and green chilies. Cook for 2 minutes.",
      "Add chopped vegetables, turmeric, red chili powder, and salt. Cook for 5 minutes.",
      "Add tomatoes and cook until soft.",
      "Add yogurt, mint, and coriander leaves. Mix well.",
      "Drain the soaked rice and add it to the pot. Gently mix everything.",
      "Add 4 cups of water and bring to a boil.",
      "Reduce heat, cover, and cook for 15-20 minutes until the rice is done.",
      "Drizzle saffron milk on top and sprinkle garam masala.",
      "Cover again and let it sit for 5 minutes before serving."
    ],
    nutritionalInfo: {
      calories: 320,
      protein: "7g",
      carbs: "48g",
      fats: "12g",
      fiber: "5g"
    },
    tags: ["Indian", "Vegetarian", "Rice Dish", "Festival Food"]
  },
  {
    id: "mixed-vegetable-curry",
    title: "Mixed Vegetable Curry",
    image: "https://images.unsplash.com/photo-1605769927692-56221bc58a8e?w=800&auto=format",
    description: "A simple and nutritious curry made with seasonal vegetables in a flavorful tomato-based gravy.",
    cookTime: "25 mins",
    prepTime: "15 mins",
    difficulty: "Easy",
    servings: 4,
    chef: "Rajesh Kumar",
    ingredients: [
      "3 cups mixed vegetables (cauliflower, carrots, peas, beans)",
      "1 large onion, finely chopped",
      "2 tomatoes, pureed",
      "1 tbsp ginger-garlic paste",
      "2 green chilies, slit",
      "1/2 tsp turmeric powder",
      "1 tsp cumin powder",
      "1 tsp coriander powder",
      "1/2 tsp red chili powder",
      "1/2 tsp garam masala",
      "2 tbsp oil",
      "1/4 cup fresh coriander leaves, chopped",
      "Salt to taste"
    ],
    instructions: [
      "Heat oil in a pan. Add chopped onions and sauté until golden brown.",
      "Add ginger-garlic paste and green chilies. Cook for 2 minutes.",
      "Add turmeric, cumin, coriander, and red chili powder. Mix well.",
      "Add tomato puree and cook until oil separates.",
      "Add mixed vegetables and salt. Mix well to coat with the spices.",
      "Add 1/2 cup water, cover, and cook for 15 minutes until vegetables are tender.",
      "Sprinkle garam masala and garnish with fresh coriander leaves.",
      "Serve hot with rice or roti."
    ],
    nutritionalInfo: {
      calories: 180,
      protein: "4g",
      carbs: "20g",
      fats: "9g",
      fiber: "7g"
    },
    tags: ["Indian", "Vegetarian", "Easy", "Low Calorie"]
  }
];

const ViewRecipe = () => {
  const { id } = useParams<{ id: string }>();
  const recipe = recipes.find(recipe => recipe.id === id);

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Recipe Not Found</h1>
            <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
            <Link to="/recipes">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                View All Recipes
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[40vh] md:h-[50vh] bg-gray-900">
          <div className="absolute inset-0">
            <motion.img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover opacity-70"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2 }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
            <div>
              <Link to="/recipes" className="inline-flex items-center text-white mb-4 hover:text-emerald-400 transition-colors">
                <ArrowLeft size={18} className="mr-2" />
                <span>Back to Recipes</span>
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{recipe.title}</h1>
              <div className="flex items-center text-white text-sm space-x-4">
                <span className="flex items-center">
                  <Users size={16} className="mr-1" />
                  <span>Serves {recipe.servings}</span>
                </span>
                <span className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>Prep: {recipe.prepTime}</span>
                </span>
                <span className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>Cook: {recipe.cookTime}</span>
                </span>
                <span className="flex items-center">
                  <ChefHat size={16} className="mr-1" />
                  <span>Chef: {recipe.chef}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Main Content */}
            <div className="md:w-2/3">
              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-3">About This Recipe</h2>
                <p className="text-gray-700 leading-relaxed">{recipe.description}</p>
              </div>

              <Separator className="my-8" />

              {/* Ingredients */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 mt-2 mr-3 bg-emerald-600 rounded-full"></span>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator className="my-8" />

              {/* Instructions */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Cooking Instructions</h2>
                <ol className="space-y-6">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex">
                      <span className="inline-flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-emerald-100 text-emerald-700 font-semibold shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 pt-1">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <Separator className="my-8" />

              {/* Tags */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag, index) => (
                    <span key={index} className="inline-block px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:w-1/3">
              {/* Actions */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Recipe Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Printer size={18} className="mr-2" />
                    Print Recipe
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 size={18} className="mr-2" />
                    Share Recipe
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BookmarkPlus size={18} className="mr-2" />
                    Save Recipe
                  </Button>
                </div>
              </div>

              {/* Nutritional Information */}
              <div className="bg-emerald-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Nutritional Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-700">Calories:</span>
                    <span className="font-medium">{recipe.nutritionalInfo.calories} kcal</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-700">Protein:</span>
                    <span className="font-medium">{recipe.nutritionalInfo.protein}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-700">Carbs:</span>
                    <span className="font-medium">{recipe.nutritionalInfo.carbs}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-700">Fats:</span>
                    <span className="font-medium">{recipe.nutritionalInfo.fats}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Fiber:</span>
                    <span className="font-medium">{recipe.nutritionalInfo.fiber}</span>
                  </div>
                </div>
              </div>

              {/* Difficulty Level */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Difficulty Level</h3>
                <div className="flex items-center">
                  <div className={`h-2 flex-1 rounded-full ${
                    recipe.difficulty === "Easy" 
                      ? "bg-emerald-500" 
                      : recipe.difficulty === "Medium" 
                      ? "bg-yellow-500" 
                      : "bg-red-500"
                  }`}></div>
                  <span className="ml-3 font-medium">{recipe.difficulty}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ViewRecipe;
