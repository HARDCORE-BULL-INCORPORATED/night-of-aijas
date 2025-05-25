import type {
	CommonTactic,
	CounterterroristTactic,
	Tactic,
	TerroristTactic,
} from "../types";

export const ctTactics = [
	// {
	// 	name: "PLACEHOLDER CT TACTIC 1",
	// 	rarity: "Mil-spec",
	// 	weight: 1,
	// 	map: "Train",
	// 	side: "CT",
	// },
] as const satisfies readonly CounterterroristTactic[];

export const terroristTactics = [
	// {
	// 	name: "PLACEHOLDER T TACTIC 1",
	// 	rarity: "Mil-spec",
	// 	weight: 1,
	// 	map: "Train",
	// 	side: "T",
	// },
] as const satisfies readonly TerroristTactic[];

export const commonTactics = [
	// {
	// 	name: "PLACEHOLDER COMMON TACTIC",
	// 	rarity: "Mil-spec",
	// 	weight: 1,
	// 	map: "Train",
	// 	side: "Both",
	// },
] as const satisfies readonly CommonTactic[];

export const trainCase = [
	...ctTactics,
	...terroristTactics,
	...commonTactics,
] as const satisfies readonly Tactic[];
