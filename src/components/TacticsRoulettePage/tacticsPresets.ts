import type { RoulettePreset } from "../roulette/types";
import type { TacticName } from "./tacticsCase";

export const tacticsPresets: RoulettePreset<TacticName>[] = [
	{
		name: "Standard Rushes",
		items: [
			{ name: "RUSH A", weight: 1 },
			{ name: "RUSH B", weight: 1 },
			{ name: "RUSH MID", weight: 1 },
		],
	},
	{
		name: "Special Tactics",
		items: [{ name: "RELLU KOURAA", weight: 1 }],
	},
];
