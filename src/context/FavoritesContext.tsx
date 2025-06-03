
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vegetable } from '@/types/vegetable';
import { useToast } from '@/hooks/use-toast';

type FavoritesContextType = {
  favorites: Vegetable[];
  addToFavorites: (vegetable: Vegetable) => void;
  removeFromFavorites: (vegetableId: number) => void;
  isFavorite: (vegetableId: number) => boolean;
  toggleFavorite: (vegetable: Vegetable) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Vegetable[]>([]);
  const { toast } = useToast();

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Update localStorage when favorites change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (vegetable: Vegetable) => {
    setFavorites(prev => [...prev, vegetable]);
    toast({
      title: "Added to Favorites",
      description: `${vegetable.name} has been added to your favorites`,
    });
  };

  const removeFromFavorites = (vegetableId: number) => {
    const vegetable = favorites.find(v => v.id === vegetableId);
    setFavorites(prev => prev.filter(item => item.id !== vegetableId));
    if (vegetable) {
      toast({
        title: "Removed from Favorites",
        description: `${vegetable.name} has been removed from your favorites`,
      });
    }
  };

  const isFavorite = (vegetableId: number) => {
    return favorites.some(item => item.id === vegetableId);
  };

  const toggleFavorite = (vegetable: Vegetable) => {
    if (isFavorite(vegetable.id)) {
      removeFromFavorites(vegetable.id);
    } else {
      addToFavorites(vegetable);
    }
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      addToFavorites, 
      removeFromFavorites, 
      isFavorite,
      toggleFavorite 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
