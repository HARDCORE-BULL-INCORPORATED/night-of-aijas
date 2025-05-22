import type { Tactic } from "../tacticsCase";

export const officeCase = [
	{
		name: "PAPERI",
		image: "",
		rarity: "Mil-spec",
		weight: 1.2,
		map: "Office",
	},
	{
		name: "LONK",
		image: "RUSH LONG",
		rarity: "Restricted",
		weight: 1,
		map: "Office",
	},
	{
		name: "EKSTRA PITKÄ",
		image: "/tactics/vanha-käppänä.png",
		rarity: "Rare Special Item",
		weight: 0.8,
		map: "Office",
	},
] as const satisfies readonly Tactic[];
