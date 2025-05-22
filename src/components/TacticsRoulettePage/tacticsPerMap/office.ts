import type { Tactic } from "../tacticsCase";

export const officeCase = [
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
