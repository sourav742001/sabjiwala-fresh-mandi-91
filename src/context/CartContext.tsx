
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Vegetable } from '@/types/vegetable';
import { toast } from 'sonner';

interface CartItem extends Vegetable {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Vegetable, quantity: number) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Vegetable, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        toast.success(`Updated ${item.name} quantity in cart`);
        return prevItems.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      } else {
        toast.success(`Added ${item.name} to cart`);
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(i => i.id === itemId);
      if (itemToRemove) {
        toast.success(`Removed ${itemToRemove.name} from cart`);
      }
      return prevItems.filter(i => i.id !== itemId);
    });
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(i => 
        i.id === itemId ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartCount,
      cartTotal,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
