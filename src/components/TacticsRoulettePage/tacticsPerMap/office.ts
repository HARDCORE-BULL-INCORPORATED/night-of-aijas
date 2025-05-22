import type {
	CommonTactic,
	CounterterroristTactic,
	Tactic,
	TerroristTactic,
} from "../types";

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
		rarity: "Mil-spec",
		weight: 1,
		map: "Office",
		side: "CT",
	},
	{
		name: "EKSTRA PITKÄ",
		image: "EKSTRA PITKÄ",
		rarity: "Rare Special Item",
		weight: 0.5,
		map: "Office",
		side: "CT",
	},
] as const satisfies readonly CounterterroristTactic[];

export const terroristTactics = [
	{
		name: "PIHAPUSKU",
		image: "PIHAPUSKU",
		rarity: "Mil-spec",
		weight: 1,
		map: "Office",
		side: "T",
	},
] as const satisfies readonly TerroristTactic[];

export const commonTactics = [
	// {
	// 	name: "PIHAPUSKU",
	// 	image: "/tactics/vanha-käppänä.png",
	// 	rarity: "Mil-spec",
	// 	weight: 1,
	// 	map: "Office",
	// 	side: "Both",
	// },
] as const satisfies readonly CommonTactic[];

export const officeCase = [
	...ctTactics,
	...terroristTactics,
	...commonTactics,
] as const satisfies readonly Tactic[];
