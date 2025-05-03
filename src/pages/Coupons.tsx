
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Scissors, Tag, Copy, Calendar, Percent, ArrowRight } from 'lucide-react';

const coupons = [
  {
    id: 1,
    code: "FIRSTORDER",
    discount: "20% off",
    description: "Get 20% off on your first order",
    validUntil: "31 Dec 2025",
    minOrder: 300,
    maxDiscount: 200,
    backgroundColor: "#f0fdf4",
    borderColor: "#bbf7d0",
    category: "new-user"
  },
  {
    id: 2,
    code: "SUMMER10",
    discount: "10% off",
    description: "Summer special discount on all seasonal fruits",
    validUntil: "30 Sep 2025",
    minOrder: 500,
    maxDiscount: 150,
    backgroundColor: "#fef3c7",
    borderColor: "#fde68a",
    category: "seasonal"
  },
  {
    id: 3,
    code: "FREESHIP",
    discount: "Free Shipping",
    description: "Free shipping on orders above ₹500",
    validUntil: "31 Dec 2025",
    minOrder: 500,
    maxDiscount: 50,
    backgroundColor: "#e0f2fe",
    borderColor: "#bae6fd",
    category: "shipping"
  },
  {
    id: 4,
    code: "ORGANIC25",
    discount: "25% off",
    description: "Get 25% off on all organic vegetables",
    validUntil: "15 Oct 2025",
    minOrder: 600,
    maxDiscount: 300,
    backgroundColor: "#dcfce7",
    borderColor: "#86efac",
    category: "category-specific"
  },
  {
    id: 5,
    code: "WEEKEND15",
    discount: "15% off",
    description: "Weekend special discount on all products",
    validUntil: "31 Dec 2025",
    minOrder: 400,
    maxDiscount: 200,
    backgroundColor: "#fae8ff",
    borderColor: "#f5d0fe",
    category: "limited-time"
  },
  {
    id: 6,
    code: "BUNDLE30",
    discount: "30% off",
    description: "Save 30% when you buy a vegetable bundle",
    validUntil: "20 Nov 2025",
    minOrder: 800,
    maxDiscount: 500,
    backgroundColor: "#ffedd5",
    borderColor: "#fed7aa",
    category: "bundle"
  }
];

const Coupons = () => {
  const { toast } = useToast();

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied",
      description: `${code} has been copied to clipboard`,
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
            <div className="inline-flex items-center justify-center p-2 bg-emerald-100 rounded-full mb-4">
              <Scissors size={24} className="text-emerald-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Coupons & Offers</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Save more on your grocery shopping with exclusive coupons and special offers
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coupons.map((coupon, index) => (
              <motion.div
                key={coupon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-2"
                  style={{ borderColor: coupon.borderColor, backgroundColor: coupon.backgroundColor }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Tag size={18} className="text-emerald-600" />
                          <span className="bg-white px-3 py-1 rounded-full text-sm font-medium border border-dashed border-gray-300">
                            {coupon.category === "new-user" ? "New Users" : 
                             coupon.category === "seasonal" ? "Seasonal" :
                             coupon.category === "shipping" ? "Shipping" :
                             coupon.category === "category-specific" ? "Category" :
                             coupon.category === "limited-time" ? "Limited Time" : "Bundle"}
                          </span>
                        </div>
                        <h3 className="font-bold text-xl mb-2">{coupon.discount}</h3>
                        <p className="text-gray-700 mb-3">{coupon.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            Valid till: {coupon.validUntil}
                          </span>
                          <span className="flex items-center gap-1">
                            <Percent size={14} />
                            Min order: ₹{coupon.minOrder}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center md:items-end gap-3">
                        <div className="bg-white p-3 rounded-lg border border-dashed border-gray-300">
                          <div className="font-mono font-bold text-lg">{coupon.code}</div>
                        </div>
                        <Button 
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleCopyCode(coupon.code)}
                        >
                          <Copy size={14} />
                          Copy Code
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-4">How to Apply Coupons</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <span className="text-emerald-600 font-bold">1</span>
                </div>
                <h3 className="font-medium mb-2">Copy the coupon code</h3>
                <p className="text-gray-600 text-sm">Click on 'Copy Code' button next to the coupon you want to use</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <span className="text-emerald-600 font-bold">2</span>
                </div>
                <h3 className="font-medium mb-2">Add items to your cart</h3>
                <p className="text-gray-600 text-sm">Browse products and add them to your cart</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <span className="text-emerald-600 font-bold">3</span>
                </div>
                <h3 className="font-medium mb-2">Apply coupon at checkout</h3>
                <p className="text-gray-600 text-sm">Paste the code in the coupon field during checkout</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Coupons;
