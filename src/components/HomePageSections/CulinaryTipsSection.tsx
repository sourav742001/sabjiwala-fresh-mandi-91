
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, ArrowRight, Star, Bookmark, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const categories = [
  "All Tips",
  "Storage",
  "Preparation",
  "Cooking",
  "Nutrition"
];

const tips = [
  {
    id: 1,
    title: "Store Leafy Greens Properly",
    description: "Keep spinach and other leafy greens wrapped in a damp paper towel inside an airtight container in the fridge.",
    icon: "🥬",
    category: "Storage",
    liked: false,
    saved: false,
    rating: 4.8
  },
  {
    id: 2,
    title: "Revive Wilted Vegetables",
    description: "Soak wilted vegetables in ice water for 5-10 minutes to restore their crispness.",
    icon: "🥕",
    category: "Storage",
    liked: false,
    saved: false,
    rating: 4.5
  },
  {
    id: 3,
    title: "Don't Wash Before Storage",
    description: "Only wash vegetables right before using them, as moisture can promote bacterial growth during storage.",
    icon: "💧",
    category: "Storage",
    liked: false,
    saved: false,
    rating: 4.7
  },
  {
    id: 4,
    title: "Perfect Roasted Vegetables",
    description: "Cut vegetables in similar sizes for even roasting, and don't overcrowd the pan.",
    icon: "🔥",
    category: "Cooking",
    liked: false,
    saved: false,
    rating: 4.9
  },
  {
    id: 5,
    title: "Lock in Nutrients",
    description: "Steam vegetables instead of boiling to retain more nutrients. If boiling, use minimal water.",
    icon: "🥦",
    category: "Cooking",
    liked: false,
    saved: false,
    rating: 4.6
  },
  {
    id: 6,
    title: "Blanch for Color",
    description: "Quickly boil green vegetables then plunge in ice water to preserve their bright color for salads.",
    icon: "❄️",
    category: "Preparation",
    liked: false,
    saved: false,
    rating: 4.5
  },
  {
    id: 7,
    title: "Prevent Browning",
    description: "Brush cut apples or avocados with lemon juice to prevent browning from oxidation.",
    icon: "🍋",
    category: "Preparation",
    liked: false,
    saved: false,
    rating: 4.4
  },
  {
    id: 8,
    title: "Enhance Absorption",
    description: "Pair vitamin-rich vegetables with healthy fats (like olive oil) to increase absorption of fat-soluble vitamins.",
    icon: "🫒",
    category: "Nutrition",
    liked: false,
    saved: false,
    rating: 4.8
  }
];

const CulinaryTipsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Tips");
  const [tipsList, setTipsList] = useState(tips);
  const { toast } = useToast();

  const handleLikeTip = (id: number) => {
    setTipsList(prev => prev.map(tip => 
      tip.id === id ? { ...tip, liked: !tip.liked } : tip
    ));
    
    const tip = tipsList.find(tip => tip.id === id);
    if (tip) {
      toast({
        title: tip.liked ? "Removed from favorites" : "Added to favorites",
        description: tip.liked ? "Tip removed from your favorites" : `"${tip.title}" added to your favorites`,
      });
    }
  };

  const handleSaveTip = (id: number) => {
    setTipsList(prev => prev.map(tip => 
      tip.id === id ? { ...tip, saved: !tip.saved } : tip
    ));
    
    const tip = tipsList.find(tip => tip.id === id);
    if (tip) {
      toast({
        title: tip.saved ? "Removed from saved" : "Saved for later",
        description: tip.saved ? "Tip removed from your saved items" : `"${tip.title}" saved for later reference`,
      });
    }
  };

  const handleShareTip = (tip: any) => {
    // In a real app, this would be a sharing API
    toast({
      title: "Share feature",
      description: `Sharing "${tip.title}" with friends`,
    });
  };

  const filteredTips = selectedCategory === "All Tips" 
    ? tipsList 
    : tipsList.filter(tip => tip.category === selectedCategory);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center p-2 bg-emerald-100 rounded-full mb-4">
            <ChefHat size={24} className="text-emerald-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Culinary Tips & Tricks</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Professional advice to help you make the most of your fresh produce
          </p>
        </motion.div>

        <div className="mb-8">
          <Tabs defaultValue="All Tips" className="w-full">
            <TabsList className="flex justify-center mb-6 h-auto p-1 bg-gray-100 overflow-x-auto">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onClick={() => setSelectedCategory(category)}
                  className="px-4 py-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-md"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {filteredTips.map((tip, index) => (
                  <motion.div 
                    key={tip.id}
                    className="h-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="bg-gray-50 rounded-lg h-full border border-gray-100 hover:border-emerald-200 transition-colors shadow-sm">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                          <div className="text-4xl mb-4">{tip.icon}</div>
                          <div className="flex items-center gap-1">
                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium">{tip.rating}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{tip.title}</h3>
                        <p className="text-gray-600 flex-grow">{tip.description}</p>
                        
                        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
                          <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                            {tip.category}
                          </span>
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className={`h-8 w-8 ${tip.saved ? 'text-emerald-600' : 'text-gray-500'}`}
                              onClick={() => handleSaveTip(tip.id)}
                            >
                              <Bookmark size={16} className={tip.saved ? 'fill-emerald-600' : ''} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-gray-500"
                              onClick={() => handleShareTip(tip)}
                            >
                              <Share2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 group"
            size="lg"
          >
            <span>View All Cooking Tips</span>
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CulinaryTipsSection;
