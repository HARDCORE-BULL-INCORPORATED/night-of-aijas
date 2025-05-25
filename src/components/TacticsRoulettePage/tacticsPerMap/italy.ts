import type {
	CommonTactic,
	CounterterroristTactic,
	Tactic,
	TerroristTactic,
} from "../types";

export const ctTactics = [
	{
		name: "LONK",
		rarity: "Mil-spec",
		weight: 1,
		description: "LOOOOOOOOOOONK",
		map: "Italy",
		side: "CT",
	},
	{
		name: "TALO",
		rarity: "Mil-spec",
		weight: 1,
		map: "Italy",
		side: "CT",
	},
	{
		name: "MIDIRYYSI",
		rarity: "Mil-spec",
		weight: 1,
		map: "Italy",
		side: "CT",
	},
	{
		name: "RAKSILASSA KOLME KIERROSTA",
		rarity: "Covert",
		weight: 0.5,
		description: "MARKETEILLE LÄÄLÄÄ",
		map: "Italy",
		side: "CT",
	},
] as const satisfies readonly CounterterroristTactic[];

export const terroristTactics = [
	// {
	// 	name: "PIHAPUSKU",
	// 	rarity: "Mil-spec",
	// 	weight: 1,
	// 	description: "PIHALLE LÄÄLÄÄ HEI",
	// 	map: "Italy",
	// 	side: "T",
	// },
] as const satisfies readonly TerroristTactic[];

export const commonTactics = [
	{
		name: "RAKSILA",
		rarity: "Mil-spec",
		weight: 1,
		description: "MARKETEILLE",
		map: "Italy",
		side: "Both",
	},
	{
		name: "KUJA",
		rarity: "Mil-spec",
		weight: 1,
		description: "Iha kujal äiät :D",
		map: "Italy",
		side: "Both",
	},
] as const satisfies readonly CommonTactic[];

export const italyCase = [
	...ctTactics,
	...terroristTactics,
	...commonTactics,
] as const satisfies readonly Tactic[];
