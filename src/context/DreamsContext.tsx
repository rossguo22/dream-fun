import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Dream } from '../types';
import { mockDreams as initialDreams, mockUser } from '../data/mockData';

interface DreamsContextType {
  dreams: Dream[];
  favoriteDreams: Set<string>;
  addDream: (dream: Omit<Dream, 'id' | 'createdAt' | 'status' | 'currentAmount' | 'participants'>) => void;
  toggleFavorite: (dreamId: string) => void;
  isFavorite: (dreamId: string) => boolean;
}

const DreamsContext = createContext<DreamsContextType | undefined>(undefined);

export function DreamsProvider({ children }: { children: ReactNode }) {
  const [dreams, setDreams] = useState<Dream[]>(initialDreams);
  const [favoriteDreams, setFavoriteDreams] = useState<Set<string>>(new Set());

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('favoriteDreams');
    if (saved) {
      try {
        setFavoriteDreams(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error('Failed to load favorites', e);
      }
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favoriteDreams', JSON.stringify(Array.from(favoriteDreams)));
  }, [favoriteDreams]);

  const addDream = (dreamData: Omit<Dream, 'id' | 'createdAt' | 'status' | 'currentAmount' | 'participants'>) => {
    const newDream: Dream = {
      ...dreamData,
      id: `dream-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
      currentAmount: 0,
      participants: 0,
    };
    setDreams(prev => [newDream, ...prev]);
    
    // Update user's created dreams
    if (!mockUser.createdDreams.includes(newDream.id)) {
      mockUser.createdDreams.push(newDream.id);
    }
  };

  const toggleFavorite = (dreamId: string) => {
    setFavoriteDreams(prev => {
      const newSet = new Set(prev);
      if (newSet.has(dreamId)) {
        newSet.delete(dreamId);
      } else {
        newSet.add(dreamId);
      }
      return newSet;
    });
  };

  const isFavorite = (dreamId: string) => {
    return favoriteDreams.has(dreamId);
  };

  return (
    <DreamsContext.Provider value={{ dreams, favoriteDreams, addDream, toggleFavorite, isFavorite }}>
      {children}
    </DreamsContext.Provider>
  );
}

export function useDreams() {
  const context = useContext(DreamsContext);
  if (context === undefined) {
    throw new Error('useDreams must be used within a DreamsProvider');
  }
  return context;
}

