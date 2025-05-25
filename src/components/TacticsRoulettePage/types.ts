import type { MapName } from "../MapRoulette/mapCase";
import type { CaseItem } from "../roulette/types";

export type TacticMapContext = MapName | "Defuse" | "Hostage" | "Shared";
export type Side = "CT" | "T" | "Both";
export type MapType = "Defuse" | "Hostage";

// Define hostage and defuse maps
export const hostageMaps: readonly MapName[] = [
	"Office",
	"Italy",
	"Agency",
] as const;
export const defuseMaps: readonly MapName[] = [
	"Dust II",
	"Mirage",
	"Inferno",
	"Vertigo",
	"Train",
	"Anubis",
	"Ancient",
	"Overpass",
	"Nuke",
	"Jura",
	"Grail",
] as const;

// Helper function to get map type
export function getMapType(mapName: MapName): MapType {
	return hostageMaps.includes(mapName) ? "Hostage" : "Defuse";
}

// Helper function to check if a tactic is valid for a given map
export function isTacticValidForMap(
	tacticMapContext: TacticMapContext,
	targetMap: MapName,
): boolean {
	// If tactic is for a specific map, it must match exactly
	if (
		hostageMaps.includes(tacticMapContext as MapName) ||
		defuseMaps.includes(tacticMapContext as MapName)
	) {
		return tacticMapContext === targetMap;
	}

	// If tactic is for "Shared", it's valid for all maps
	if (tacticMapContext === "Shared") {
		return true;
	}

	// If tactic is for "Defuse", it's only valid for defuse maps
	if (tacticMapContext === "Defuse") {
		return getMapType(targetMap) === "Defuse";
	}

	// If tactic is for "Hostage", it's only valid for hostage maps
	if (tacticMapContext === "Hostage") {
		return getMapType(targetMap) === "Hostage";
	}

	return false;
}

// Helper function to get valid maps for a tactic
export function getValidMapsForTactic(
	tacticMapContext: TacticMapContext,
): readonly MapName[] {
	// If tactic is for a specific map
	if (
		hostageMaps.includes(tacticMapContext as MapName) ||
		defuseMaps.includes(tacticMapContext as MapName)
	) {
		return [tacticMapContext as MapName];
	}

	// If tactic is for "Shared", it's valid for all maps
	if (tacticMapContext === "Shared") {
		return [...defuseMaps, ...hostageMaps];
	}

	// If tactic is for "Defuse", return only defuse maps
	if (tacticMapContext === "Defuse") {
		return defuseMaps;
	}

	// If tactic is for "Hostage", return only hostage maps
	if (tacticMapContext === "Hostage") {
		return hostageMaps;
	}

	return [];
}

// Helper function to filter tactics based on selected map
export function filterTacticsForMap<T extends Tactic>(
	tactics: readonly T[],
	selectedMap: MapName,
): readonly T[] {
	return tactics.filter((tactic) =>
		isTacticValidForMap(tactic.map, selectedMap),
	);
}

export interface Tactic extends CaseItem {
	map: TacticMapContext;
	side: Side;
}

export interface TerroristTactic extends Tactic {
	side: "T";
}

export interface CounterterroristTactic extends Tactic {
	side: "CT";
}

export interface CommonTactic extends Tactic {
	side: "Both";
}
