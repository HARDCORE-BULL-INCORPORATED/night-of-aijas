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
		rarity: "Rare Special Item",
		weight: 0.5,
		map: "Italy",
		side: "CT",
	},
	{
		name: "KESKIPITKÄ",
		rarity: "Rare Special Item",
		weight: 0.5,
		map: "Italy",
		side: "CT",
	},
] as const satisfies readonly CounterterroristTactic[];

export const terroristTactics = [
	{
		name: "PIHAPUSKU",
		rarity: "Mil-spec",
		weight: 1,
		description: "PIHALLE LÄÄLÄÄ HEI",
		map: "Italy",
		side: "T",
	},
] as const satisfies readonly TerroristTactic[];

export const commonTactics = [
	{
		name: "RAKSILA",
		rarity: "Mil-spec",
		weight: 1,
		map: "Italy",
		side: "Both",
	},
] as const satisfies readonly CommonTactic[];

export const italyCase = [
	...ctTactics,
	...terroristTactics,
	...commonTactics,
] as const satisfies readonly Tactic[];
