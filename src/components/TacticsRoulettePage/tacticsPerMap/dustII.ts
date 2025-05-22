import type { Tactic } from "../tacticsCase";

export const dustIICase = [
	{
		name: "Default Dust II Tactic",
		image: "",
		rarity: "Mil-spec",
		weight: 1,
		map: "Dust II",
		side: "T",
	},
] as const satisfies readonly Tactic[];
