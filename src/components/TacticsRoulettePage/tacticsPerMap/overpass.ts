import type { Tactic } from "../tacticsCase";

export const overpassCase = [
	{
		name: "Default Overpass Tactic",
		image: "",
		rarity: "Mil-spec",
		weight: 1,
		map: "Overpass",
		side: "T",
	},
] as const satisfies readonly Tactic[];
