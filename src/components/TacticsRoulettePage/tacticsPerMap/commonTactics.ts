import type { CounterterroristTactic, Tactic, TerroristTactic } from "../types";

export const ctTactics = [
	// {
	// 	name: "PLACEHOLDER CT TACTIC 1",
	// 	rarity: "Mil-spec",
	// 	weight: 1,
	// 	map: "Anubis",
	// 	side: "CT",
	// },
] as const satisfies readonly CounterterroristTactic[];

export const terroristTactics = [
	// {
	// 	name: "PLACEHOLDER T TACTIC 1",
	// 	rarity: "Mil-spec",
	// 	weight: 1,
	// 	map: "Anubis",
	// 	side: "T",
	// },
] as const satisfies readonly TerroristTactic[];

export const commonTactics = [
	{
		name: "RUSH A",
		rarity: "Mil-spec",
		weight: 1,
		map: "Defuse",
		side: "Both",
	},
	{
		name: "RUSH B",
		rarity: "Restricted",
		weight: 1,
		map: "Defuse",
		side: "Both",
	},
	{
		name: "RUSH MID",
		rarity: "Mil-spec",
		weight: 1,
		map: "Defuse",
		side: "Both",
	},
	{
		name: "HOSTAGE RESCUE",
		rarity: "Mil-spec",
		weight: 1,
		map: "Hostage",
		side: "Both",
	},
	{
		name: "PROTECT HOSTAGES",
		rarity: "Restricted",
		weight: 1,
		map: "Hostage",
		side: "Both",
	},
	{
		name: "KYMMENEN KYYKKYÄ SPAWNISSA",
		rarity: "Industrial",
		weight: 0.7,
		map: "Shared",
		side: "Both",
	},
	{
		name: "TAPETAAN OMA",
		image: "/tactics/trollface.png",
		rarity: "Industrial",
		weight: 0.1,
		map: "Shared",
		side: "Both",
	},
	{
		name: "RELLUT KOURAA",
		rarity: "Rare Special Item",
		weight: 0.4,
		image: "/tactics/vanha-käppänä.png",
		description: "Vitun paaso :D",
		map: "Shared",
		side: "Both",
	},
	{
		name: "SCOUTIT KAIKILLE",
		rarity: "Covert",
		weight: 0.5,
		description: "Scoutit läälää hei :D",
		map: "Shared",
		side: "Both",
	},
] as const satisfies readonly Tactic[];

export const commonTacticsCase = [
	...ctTactics,
	...terroristTactics,
	...commonTactics,
] as const satisfies readonly Tactic[];
