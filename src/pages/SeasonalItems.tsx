
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Leaf, Star, ArrowRight } from 'lucide-react';

const seasonalItems = [
  {
    id: 101,
    name: "Fresh Strawberries",
    image: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=500&auto=format",
    price: 149,
    unit: "kg",
    discount: "25% off",
    description: "Sweet and juicy strawberries that are perfect for snacking, desserts, or adding to smoothies.",
    origin: "Mahabaleshwar farms"
  },
  {
    id: 102,
    name: "Green Peas",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&auto=format",
    price: 89,
    unit: "kg",
    discount: "15% off",
    description: "Fresh green peas with a sweet flavor and tender texture. Great for curries, pulao, or as a side dish.",
    origin: "Punjab farms"
  },
  {
    id: 103,
    name: "Watermelon",
    image: "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=500&auto=format",
    price: 29,
    unit: "kg",
    discount: "20% off",
    description: "Sweet and refreshing watermelons perfect for hot summer days. High in water content and nutrients.",
    origin: "Karnataka farms"
  },
  {
    id: 104,
    name: "Mangoes",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format",
    price: 249,
    unit: "kg",
    discount: "10% off",
    description: "The king of fruits! Sweet, juicy mangoes with a rich flavor. Perfect for eating fresh or making desserts.",
    origin: "Ratnagiri farms"
  },
  {
    id: 105,
    name: "Litchi",
    image: "https://images.unsplash.com/photo-1588671842198-a7358ffe690a?w=500&auto=format",
    price: 199,
    unit: "kg",
    discount: "15% off",
    description: "Sweet and juicy litchis with a floral aroma. A refreshing summer fruit rich in vitamin C.",
    origin: "Bihar farms"
  },
  {
    id: 106,
    name: "Green Beans",
    image: "https://images.unsplash.com/photo-1650462648135-ebb660affcfe?w=500&auto=format",
    price: 69,
    unit: "kg",
    discount: "10% off",
    description: "Crisp and tender green beans. Can be steamed, stir-fried, or added to casseroles.",
    origin: "Maharashtra farms"
  },
  {
    id: 107,
    name: "Cherry Tomatoes",
    image: "https://images.unsplash.com/photo-1562040506-a9b32cb51b94?w=500&auto=format",
    price: 119,
    unit: "kg",
    discount: "20% off",
    description: "Sweet and bite-sized tomatoes perfect for salads, roasting, or eating as a healthy snack.",
    origin: "Organic farms in Himachal"
  },
  {
    id: 108,
    name: "Baby Corn",
    image: "https://images.unsplash.com/photo-1511993807578-701168605ad3?w=500&auto=format",
    price: 129,
    unit: "kg",
    discount: "10% off",
    description: "Tender and crunchy baby corn. Great for stir-fries, soups, and salads.",
    origin: "Assam farms"
  }
];

const SeasonalItems = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (item: any) => {
    // Create a vegetable object with proper structure that matches the Vegetable type
    const vegetableItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      // Use images array structure instead of single image property
      images: [
        {
          id: 1,
          url: item.image,
          alt: item.name
        }
      ],
      // Add other required properties from Vegetable type
      description: item.description || "",
      nutritionalInfo: "",
      origin: item.origin || "",
      isOrganic: false,
      inStock: true,
      category: "seasonal",
      unit: item.unit || "kg"
    };
    
    // Pass the vegetable object and quantity as separate parameters
    addToCart(vegetableItem, 1);
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-emerald-800">Seasonal Special Items</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enjoy the freshest produce of the season, picked at the peak of ripeness and delivered directly from farms to your doorstep.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonalItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 h-full flex flex-col">
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-52 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {item.discount}
                    </div>
                    {index < 3 && (
                      <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Star size={12} /> Top Seller
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 flex flex-col flex-grow">
                    <h3 className="font-medium text-lg mb-1">{item.name}</h3>
                    <p className="text-emerald-600 font-bold mb-2">₹{item.price}/{item.unit}</p>
                    <div className="text-sm text-gray-600 mb-2">
                      <p className="flex items-center gap-1">
                        <Leaf size={14} className="text-emerald-500" /> 
                        {item.origin}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mb-4 flex-grow">{item.description}</p>
                    <Button 
                      variant="default" 
                      className="w-full mt-auto bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-2"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                      <ArrowRight size={16} />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SeasonalItems;
