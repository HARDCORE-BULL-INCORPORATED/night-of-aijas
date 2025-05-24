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
		map: "Office",
		side: "CT",
	},
	{
		name: "TALO",
		rarity: "Rare Special Item",
		weight: 0.5,
		map: "Office",
		side: "CT",
	},
	{
		name: "KESKIPITKÄ",
		rarity: "Rare Special Item",
		weight: 0.5,
		map: "Office",
		side: "CT",
	},
] as const satisfies readonly CounterterroristTactic[];

export const terroristTactics = [
	{
		name: "PIHAPUSKU",
		rarity: "Mil-spec",
		weight: 1,
		description: "PIHALLE LÄÄLÄÄ HEI",
		map: "Office",
		side: "T",
	},
] as const satisfies readonly TerroristTactic[];

export const commonTactics = [
	{
		name: "RAKSILA",
		rarity: "Mil-spec",
		weight: 1,
		map: "Office",
		side: "Both",
	},
] as const satisfies readonly CommonTactic[];

export const italyCase = [
	...ctTactics,
	...terroristTactics,
	...commonTactics,
] as const satisfies readonly Tactic[];
