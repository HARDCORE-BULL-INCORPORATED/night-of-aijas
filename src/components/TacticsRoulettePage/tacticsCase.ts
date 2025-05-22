import type { MapName } from "../MapRoulette/mapCase";
import type { CaseItem } from "../roulette/types";
import { officeCase } from "./tacticsPerMap/office";

export type TacticMapContext = MapName | "Defuse" | "Hostage" | "Shared";

export interface Tactic extends CaseItem {
	map: TacticMapContext;
}

// Shared tactics (these will get IDs 0, 1, 2...)
export const tacticsCase: Tactic[] = [
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
];

export type TacticName = (typeof tacticsCase)[number]["name"];
