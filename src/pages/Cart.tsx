
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

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
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow py-16">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link 
              to="/shop" 
              className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Continue Shopping</span>
            </Link>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl md:text-4xl font-light text-gray-900 mb-8"
          >
            Your Cart
          </motion.h1>
          
          {cartItems.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="flex justify-center mb-4">
                <ShoppingBag size={64} className="text-emerald-700 opacity-50" />
              </div>
              <h2 className="text-2xl font-light text-gray-700 mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
              <Button asChild>
                <Link to="/shop" className="bg-emerald-700 hover:bg-emerald-800">
                  Browse Products
                </Link>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="border-b border-gray-200 pb-2 mb-4">
                    <h2 className="text-lg font-medium">Items ({cartItems.length})</h2>
                  </div>
                  
                  {cartItems.map((item) => (
                    <motion.div 
                      key={item.id}
                      variants={itemVariants}
                      className="flex items-center gap-4 py-6 border-b border-gray-200"
                    >
                      <Link to={`/vegetable/${item.id}`} className="shrink-0 w-24 h-24 bg-emerald-50">
                        <img 
                          src={item.images[0].url} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <Link to={`/vegetable/${item.id}`} className="text-lg font-medium text-gray-800 hover:text-emerald-700">
                            {item.name}
                          </Link>
                          <span className="text-emerald-700 font-medium">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-500 mb-4">₹{item.price}/{item.unit}</p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 text-sm"
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 text-sm"
                            >
                              +
                            </Button>
                          </div>
                          
                          <Button 
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 size={16} className="mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  variants={itemVariants}
                  className="bg-gray-50 p-6 rounded-md h-fit"
                >
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{cartTotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery</span>
                      <span>{cartTotal >= 200 ? 'Free' : '₹40'}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 mb-6">
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span className="text-emerald-700">
                        ₹{cartTotal >= 200 ? cartTotal : cartTotal + 40}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {cartTotal >= 200 ? 
                        'Your order qualifies for free delivery!' : 
                        `Add ₹${200 - cartTotal} more to get free delivery`}
                    </p>
                  </div>
                  
                  <Button 
                    asChild 
                    className="w-full bg-emerald-700 hover:bg-emerald-800"
                  >
                    <Link to="/checkout" className="flex items-center justify-center">
                      Checkout
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                  
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      asChild 
                      className="w-full border-emerald-700 text-emerald-700 hover:bg-emerald-50"
                    >
                      <Link to="/shop">
                        Continue Shopping
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
