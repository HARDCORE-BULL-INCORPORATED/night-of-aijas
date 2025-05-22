import type { Tactic } from "../tacticsCase";

export const ancientCase = [
	{
		name: "Default Ancient Tactic",
		image: "",
		rarity: "Mil-spec",
		weight: 1,
		map: "Ancient",
		side: "T",
	},
] as const satisfies readonly Tactic[];
