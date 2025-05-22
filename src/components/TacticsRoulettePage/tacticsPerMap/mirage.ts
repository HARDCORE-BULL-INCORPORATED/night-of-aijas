import type { Tactic } from "../tacticsCase";

export const mirageCase = [
	{
		name: "Default Mirage Tactic",
		image: "",
		rarity: "Mil-spec",
		weight: 1,
		map: "Mirage",
		side: "T",
	},
] as const satisfies readonly Tactic[];
