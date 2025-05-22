import type { Tactic } from "../tacticsCase";

export const agencyCase = [
	{
		name: "Default Agency Tactic",
		image: "",
		rarity: "Mil-spec",
		weight: 1,
		map: "Agency",
		side: "Both",
	},
] as const satisfies readonly Tactic[];
