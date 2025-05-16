export interface CSGOItem {
  id: string | number;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'mythical' | 'legendary' | 'ancient' | 'contraband' | string;
  color?: string; // Optional custom color
  weight?: number; // Probability weight (higher = more likely)
}

export interface CSGOCaseRouletteProps {
  items: CSGOItem[];
  onItemWon?: (item: CSGOItem) => void;
  spinDuration?: number; // in seconds
  itemWidth?: number; // Width of each item in pixels
  itemsInView?: number; // Number of items visible in the viewport
  customClassName?: string;
  disabled?: boolean;
}

// Rarity colors mapping
export const RARITY_COLORS = {
  common: '#b0c3d9',
  uncommon: '#5e98d9',
  rare: '#4b69ff',
  mythical: '#8847ff',
  legendary: '#d32ce6',
  ancient: '#eb4b4b',
  contraband: '#e4ae39'
};

// Get the color for an item based on its rarity
export const getItemColor = (item: CSGOItem): string => {
  if (item.color) {
    return item.color;
  }
  
  return RARITY_COLORS[item.rarity as keyof typeof RARITY_COLORS] || RARITY_COLORS.common;
};

// Select a weighted random item from the array
export const selectWeightedRandomItem = (items: CSGOItem[]): CSGOItem => {
  // Calculate total weight
  const totalWeight = items.reduce((sum, item) => sum + (item.weight || 1), 0);
  
  // Get a random value
  const randomValue = Math.random() * totalWeight;
  
  // Find the item based on weights
  let weightSum = 0;
  for (const item of items) {
    weightSum += item.weight || 1;
    if (randomValue <= weightSum) {
      return item;
    }
  }
  
  // Fallback to first item (should never happen with positive weights)
  return items[0];
};