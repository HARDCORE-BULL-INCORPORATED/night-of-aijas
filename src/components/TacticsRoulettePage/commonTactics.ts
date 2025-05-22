import type { Tactic } from "./types";

export const commonTactics = [
	{
		name: "RUSH A",
		image: "RUSH A",
		rarity: "Mil-spec",
		weight: 1,
		map: "Defuse",
		side: "Both",
	},
	{
		name: "RUSH B",
		image: "RUSH B",
		rarity: "Restricted",
		weight: 1,
		map: "Defuse",
		side: "Both",
	},
	{
		name: "RUSH MID",
		image: "RUSH MID",
		rarity: "Mil-spec",
		weight: 1,
		map: "Defuse",
		side: "Both",
	},
	{
		name: "RELLUT KOURAA",
		image: "/tactics/vanha-käppänä.png",
		rarity: "Rare Special Item",
		weight: 0.1,
		map: "Shared",
		side: "Both",
	},
	{
		name: "SCOUTIT KAIKILLE",
		image: "SCOUTIT KAIKILLE",
		rarity: "Covert",
		weight: 0.2,
		map: "Shared",
		side: "Both",
	},
] as const satisfies readonly Tactic[];
