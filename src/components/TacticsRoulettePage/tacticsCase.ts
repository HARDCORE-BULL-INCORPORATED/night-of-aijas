import type { MapName } from "../MapRoulette/mapCase";
import type { CaseItem } from "../roulette/types";
import { agencyCase } from "./tacticsPerMap/agency";
import { ancientCase } from "./tacticsPerMap/ancient";
import { anubisCase } from "./tacticsPerMap/anubis";
import { dustCase } from "./tacticsPerMap/dust";
import { grailCase } from "./tacticsPerMap/grail";
import { infernoCase } from "./tacticsPerMap/inferno";
import { italyCase } from "./tacticsPerMap/italy";
import { juraCase } from "./tacticsPerMap/jura";
import { mirageCase } from "./tacticsPerMap/mirage";
import { nukeCase } from "./tacticsPerMap/nuke";
import { officeCase } from "./tacticsPerMap/office";
import { overpassCase } from "./tacticsPerMap/overpass";
import { trainCase } from "./tacticsPerMap/train";
import { vertigoCase } from "./tacticsPerMap/vertigo";

export type TacticMapContext = MapName | "Defuse" | "Hostage" | "Shared";
export type Side = "CT" | "T" | "Both";

export interface Tactic extends CaseItem {
	map: TacticMapContext;
	side: Side;
}

export const tacticsCase = [
	{
		name: "RELLU KOURAA",
		image: "/tactics/vanha-käppänä.png",
		rarity: "Rare Special Item",
		weight: 1,
		map: "Shared",
		side: "Both",
	},
	{
		name: "RUSH A",
		image: "/tactics/bruhpepe.jpg",
		rarity: "Mil-spec",
		weight: 1,
		map: "Defuse",
		side: "T",
	},
	{
		name: "RUSH B",
		image: "/tactics/trollface.png",
		rarity: "Restricted",
		weight: 1,
		map: "Defuse",
		side: "T",
	},
	{
		name: "RUSH MID",
		image: "123",
		rarity: "Mil-spec",
		weight: 1,
		map: "Defuse",
		side: "T",
	},
	...officeCase,
	...agencyCase,
	...ancientCase,
	...anubisCase,
	...dustCase,
	...grailCase,
	...infernoCase,
	...italyCase,
	...juraCase,
	...mirageCase,
	...nukeCase,
	...overpassCase,
	...trainCase,
	...vertigoCase,
] as const satisfies readonly Tactic[];

export type TacticName = (typeof tacticsCase)[number]["name"];
