import type { MapName } from "../MapRoulette/mapCase";
import type { CaseItem } from "../roulette/types";
import { commonTactics } from "./commonTactics";
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
	...commonTactics,
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
