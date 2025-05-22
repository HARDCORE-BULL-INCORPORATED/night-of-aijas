import type { Tactic } from "../tacticsCase";

export const ctTactics = [
	{
		name: "PAPERI",
		image: "RUSH PAPER",
		rarity: "Mil-spec",
		weight: 1,
		map: "Office",
		side: "CT",
	},
	{
		name: "LONK",
		image: "RUSH LONG",
		rarity: "Restricted",
		weight: 1,
		map: "Office",
		side: "CT",
	},
	{
		name: "EKSTRA PITKÄ",
		image: "/tactics/vanha-käppänä.png",
		rarity: "Rare Special Item",
		weight: 0.5,
		map: "Office",
		side: "CT",
	},
] as const satisfies readonly Tactic[];

export const terroristTactics = [] as const satisfies readonly Tactic[];

export const sharedTactics = [] as const satisfies readonly Tactic[];

export const officeCase = [
	...ctTactics,
	...terroristTactics,
	...sharedTactics,
] as const satisfies readonly Tactic[];
