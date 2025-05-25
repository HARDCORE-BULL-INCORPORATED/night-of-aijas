import { agencyCase } from "./tacticsPerMap/agency";
import { ancientCase } from "./tacticsPerMap/ancient";
import { anubisCase } from "./tacticsPerMap/anubis";
import { commonTacticsCase } from "./tacticsPerMap/commonTactics";
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
import type { Tactic } from "./types";
import { filterTacticsForMap } from "./types";
import type { MapName } from "../MapRoulette/mapCase";

export const tacticsCase = [
	...commonTacticsCase,
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

// Function to get tactics valid for a specific map
export function getTacticsForMap(selectedMap: MapName): readonly Tactic[] {
	return filterTacticsForMap(tacticsCase, selectedMap);
}

// Function to get tactics by map with caching for performance
const tacticsCache = new Map<MapName, readonly Tactic[]>();

export function getCachedTacticsForMap(
	selectedMap: MapName,
): readonly Tactic[] {
	if (!tacticsCache.has(selectedMap)) {
		tacticsCache.set(selectedMap, getTacticsForMap(selectedMap));
	}
	const cached = tacticsCache.get(selectedMap);
	return cached !== undefined ? cached : [];
}
