export interface CaseItem {
    id: string | number;
    name: string;
    image: string;
    rarity:
    | "Consumer"
    | "Industrial"
    | "Mil-spec"
    | "Restricted"
    | "Classified"
    | "Covert"
    | "Rare Special Item";
    color?: string; // Optional custom color
    weight: number; // Probability weight (higher = more likely)
}

export interface CSGOCaseRouletteProps {
    items: CaseItem[];
    onItemWon?: (item: CaseItem) => void;
    spinDuration?: number; // in seconds
    itemWidth?: number; // Width of each item in pixels
    itemsInView?: number; // Number of items visible in the viewport
    customClassName?: string;
    disabled?: boolean;
    showModal?: boolean; // Allow parent to control modal visibility
}

// Rarity colors mapping
export const RARITY_COLORS = {
    "Consumer": "#b0c3d9",
    "Industrial": "#5e98d9",
    "Mil-spec": "#4b69ff",
    "Restricted": "#8847ff",
    "Classified": "#d32ce6",
    "Covert": "#eb4b4b",
    "Rare Special Item": "#e4ae39",
};

// Get the color for an item based on its rarity
export const getItemColor = (item: CaseItem): string => {
    if (item.color) {
        return item.color;
    }

    return (
        RARITY_COLORS[item.rarity as keyof typeof RARITY_COLORS] ||
        RARITY_COLORS.Consumer
    );
};

// Select a weighted random item from the array
export const selectWeightedRandomItem = (items: CaseItem[]): CaseItem => {
    // Calculate total weight
    const totalWeight = items.reduce(
        (sum, item) => sum + (item.weight || 1),
        0,
    );

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
