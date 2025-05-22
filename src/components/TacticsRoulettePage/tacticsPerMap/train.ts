import type { Tactic } from "../tacticsCase";

export const trainCase = [
	{
		name: "Default Train Tactic",
		image: "",
		rarity: "Mil-spec",
		weight: 1,
		map: "Train",
	},
] as const satisfies readonly Tactic[];
