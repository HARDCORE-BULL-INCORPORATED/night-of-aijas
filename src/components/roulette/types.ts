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

export interface RoulettePreset {
	name: string;
	itemNames: string[];
}
