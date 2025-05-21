export interface CaseItem {
	id: string | number;
	name: string;
	image: string;
	rarity: keyof typeof RARITY_COLORS;
	weight: number;
}

export const RARITY_COLORS = {
	Consumer: "#b0c3d9",
	Industrial: "#5e98d9",
	"Mil-spec": "#4b69ff",
	Restricted: "#8847ff",
	Classified: "#d32ce6",
	Covert: "#eb4b4b",
	"Rare Special Item": "#e4ae39",
} as const;

// Get the color for an item based on its rarity
export const getItemColor = (item: CaseItem): string => {
	return RARITY_COLORS[item.rarity] || RARITY_COLORS.Consumer;
};

// Select a weighted random item from the array
export const selectWeightedRandomItem = (items: CaseItem[]): CaseItem => {
	// Calculate total weight
	const totalWeight = items.reduce((sum, item) => sum + (item.weight || 1), 0);

	const randomValue = Math.random() * totalWeight;

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

export interface RoulettePreset {
	name: string;
	itemNames: string[];
}
