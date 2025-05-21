import type { CaseItem } from "../roulette/types";

export const tacticsCase: CaseItem[] = [
	{
		id: 1,
		name: "RELLU KOURAA",
		image: "/tactics/vanha-käppänä.png",
		rarity: "Rare Special Item",
		weight: 1,
	},
	{
		id: 2,
		name: "RUSH A",
		image: "/tactics/bruhpepe.jpg",
		rarity: "Mil-spec",
		weight: 1,
	},
	{
		id: 3,
		name: "RUSH B",
		image: "/tactics/trollface.png",
		rarity: "Restricted",
		weight: 1,
	},
	{
		id: 4,
		name: "RUSH MID",
		image: "",
		rarity: "Mil-spec",
		weight: 1,
	},
] as const;

export type TacticName = (typeof tacticsCase)[number]["name"];
