import type { MapName } from "../MapRoulette/mapCase";
import type { CaseItem } from "../roulette/types";
import { officeCase } from "./tacticsPerMap/office";

export type TacticMapContext = MapName | "Defuse" | "Hostage" | "Shared";
export type Side = "CT" | "T" | "Shared";

export interface Tactic extends CaseItem {
	map: TacticMapContext;
}

export const tacticsCase = [
	{
		name: "RELLU KOURAA",
		image: "/tactics/vanha-käppänä.png",
		rarity: "Rare Special Item",
		weight: 1,
		map: "Shared",
	},
	{
		name: "RUSH A",
		image: "/tactics/bruhpepe.jpg",
		rarity: "Mil-spec",
		weight: 1,
		map: "Defuse",
	},
	{
		name: "RUSH B",
		image: "/tactics/trollface.png",
		rarity: "Restricted",
		weight: 1,
		map: "Defuse",
	},
	{
		name: "RUSH MID",
		image: "123",
		rarity: "Mil-spec",
		weight: 1,
		map: "Defuse",
	},
	...officeCase,
] as const satisfies readonly Tactic[];

export type TacticName = (typeof tacticsCase)[number]["name"];
