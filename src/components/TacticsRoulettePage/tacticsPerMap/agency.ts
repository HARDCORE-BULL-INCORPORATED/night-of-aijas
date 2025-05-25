import type {
	CommonTactic,
	CounterterroristTactic,
	Tactic,
	TerroristTactic,
} from "../types";

export const ctTactics = [
	{
		name: "PLACEHOLDER CT TACTIC 1",
		rarity: "Mil-spec",
		weight: 1,
		map: "Agency",
		side: "CT",
	},
	{
		name: "PLACEHOLDER CT TACTIC 2",
		rarity: "Mil-spec",
		weight: 1,
		map: "Agency",
		side: "CT",
	},
] as const satisfies readonly CounterterroristTactic[];

export const terroristTactics = [
	{
		name: "PLACEHOLDER T TACTIC 1",
		rarity: "Mil-spec",
		weight: 1,
		map: "Agency",
		side: "T",
	},
	{
		name: "PLACEHOLDER T TACTIC 2",
		rarity: "Mil-spec",
		weight: 1,
		map: "Agency",
		side: "T",
	},
] as const satisfies readonly TerroristTactic[];

export const commonTactics = [
	// {
	// 	name: "PLACEHOLDER COMMON TACTIC",
	// 	rarity: "Mil-spec",
	// 	weight: 1,
	// 	map: "Agency",
	// 	side: "Both",
	// },
] as const satisfies readonly CommonTactic[];

export const agencyCase = [
	...ctTactics,
	...terroristTactics,
	...commonTactics,
] as const satisfies readonly Tactic[];
