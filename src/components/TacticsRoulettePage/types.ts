import type { MapName } from "../MapRoulette/mapCase";
import type { CaseItem } from "../roulette/types";

export type TacticMapContext = MapName | "Defuse" | "Hostage" | "Shared";
export type Side = "CT" | "T" | "Both";

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
