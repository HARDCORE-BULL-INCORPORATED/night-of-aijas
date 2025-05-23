import type { Tactic } from "./types";

export const commonTactics = [
	{
		name: "RUSH A",
		rarity: "Mil-spec",
		weight: 1,
		map: "Defuse",
		side: "Both",
	},
	{
		name: "RUSH B",
		rarity: "Restricted",
		weight: 1,
		map: "Defuse",
		side: "Both",
	},
	{
		name: "RUSH MID",
		rarity: "Mil-spec",
		weight: 1,
		map: "Defuse",
		side: "Both",
	},
	{
		name: "RELLUT KOURAA",
		rarity: "Rare Special Item",
		weight: 0.4,
		image: "/tactics/vanha-käppänä.png",
		description: "Vitun paaso :D",
		map: "Shared",
		side: "Both",
	},
	{
		name: "SCOUTIT KAIKILLE",
		rarity: "Covert",
		weight: 0.5,
		description: "Scoutit läälää hei :D",
		map: "Shared",
		side: "Both",
	},
] as const satisfies readonly Tactic[];
