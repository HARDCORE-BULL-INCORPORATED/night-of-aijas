import type { RoulettePreset } from "../roulette/types";
import type { MapName } from "./mapCase";

export const mapPresets: RoulettePreset<MapName>[] = [
	{
		name: "Hostage Maps",
		items: [
			{ name: "Agency", weight: 1 },
			{ name: "Office", weight: 1 },
			{ name: "Italy", weight: 1 },
		],
	},
	{
		name: "Premier Que",
		items: [
			{ name: "Dust II", weight: 1 },
			{ name: "Mirage", weight: 1 },
		],
	},
];
