
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vegetable } from '@/types/vegetable';
import { useToast } from '@/hooks/use-toast';

type CartItem = {
  vegetable: Vegetable;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  addToCart: (vegetable: Vegetable, quantity: number) => void;
  removeFromCart: (vegetableId: number) => void;
  updateQuantity: (vegetableId: number, quantity: number) => void;
  clearCart: () => void;
  calculateTotalPrice: () => number;
  cartItems: CartItem[];
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  // Calculate total price for the cart
  const cartTotal = cart.reduce((total, item) => total + (item.vegetable.price * item.quantity), 0);

  const addToCart = (vegetable: Vegetable, quantity: number) => {
    setCart(prevCart => {
      // Check if the item is already in the cart
      const existingItemIndex = prevCart.findIndex(item => item.vegetable.id === vegetable.id);
      
      if (existingItemIndex !== -1) {
        // If the item exists, update the quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        
        toast({
          title: "Cart updated",
          description: `${vegetable.name} quantity updated in your cart`,
        });
        
        return updatedCart;
      } else {
        // Otherwise, add the new item
        toast({
          title: "Added to cart",
          description: `${vegetable.name} has been added to your cart`,
        });
        
        return [...prevCart, { vegetable, quantity }];
      }
    });
  };

  const removeFromCart = (vegetableId: number) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.find(item => item.vegetable.id === vegetableId);
      const updatedCart = prevCart.filter(item => item.vegetable.id !== vegetableId);
      
      if (itemToRemove) {
        toast({
          title: "Removed from cart",
          description: `${itemToRemove.vegetable.name} has been removed from your cart`,
        });
      }
      
      return updatedCart;
    });
  };

  const updateQuantity = (vegetableId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(vegetableId);
      return;
    }
    
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.vegetable.id === vegetableId);
      
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity = quantity;
        return updatedCart;
      }
      
      return prevCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };
  
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.vegetable.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      cartCount, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      calculateTotalPrice,
      cartItems: cart,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
