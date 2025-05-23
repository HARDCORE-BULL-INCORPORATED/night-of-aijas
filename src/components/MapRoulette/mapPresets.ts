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
	{
		name: "ÄIJIEN ILTA",
		items: [
			{ name: "Dust II", weight: 1 },
			{ name: "Mirage", weight: 1 },
			{ name: "Inferno", weight: 1 },
			{ name: "Vertigo", weight: 1 },
			{ name: "Train", weight: 1 },
			{ name: "Anubis", weight: 1 },
			{ name: "Ancient", weight: 1 },
			{ name: "Overpass", weight: 1 },
			{ name: "Nuke", weight: 1 },
			{ name: "Jura", weight: 1 },
			{ name: "Grail", weight: 1 },
			{ name: "Agency", weight: 1 },
			{ name: "Office", weight: 1 },
			{ name: "Italy", weight: 1 },
		],
	},
];
