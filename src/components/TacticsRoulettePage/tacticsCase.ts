import type { MapName } from "../MapRoulette/mapCase";
import type { CaseItem } from "../roulette/types";

export type TacticMapContext = MapName | "Shared";

export interface Tactic extends CaseItem {
	map: TacticMapContext;
}

export const tacticsCase: readonly Tactic[] = [
	{
		id: 1,
		name: "RELLU KOURAA",
		image: "/tactics/vanha-käppänä.png",
		rarity: "Rare Special Item",
		weight: 1,
		map: "Shared",
	},
	{
		id: 2,
		name: "RUSH A",
		image: "/tactics/bruhpepe.jpg",
		rarity: "Mil-spec",
		weight: 1,
		map: "Shared",
	},
	{
		id: 3,
		name: "RUSH B",
		image: "/tactics/trollface.png",
		rarity: "Restricted",
		weight: 1,
		map: "Shared",
	},
	{
		id: 4,
		name: "RUSH MID",
		image: "123",
		rarity: "Mil-spec",
		weight: 1,
		map: "Shared",
	},
];

export type TacticName = (typeof tacticsCase)[number]["name"];
