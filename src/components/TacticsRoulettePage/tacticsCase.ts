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
