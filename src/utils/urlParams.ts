import type { RouletteState } from "./rouletteState";

export interface UrlParams {
	maps?: string;
	duration?: string;
	modal?: string;
	filter?: string;
}

export function encodeStateToUrl(state: Partial<RouletteState>): UrlParams {
	const params: UrlParams = {};

	if (state.activeMaps && state.activeMaps.length > 0) {
		params.maps = state.activeMaps.join(",");
	}

	if (state.spinDuration !== undefined && state.spinDuration !== 8) {
		params.duration = state.spinDuration.toString();
	}

	if (state.showResultModal === false) {
		params.modal = "false";
	}

	if (state.filterOutRolledItems === false) {
		params.filter = "false";
	}

	return params;
}

export function decodeStateFromUrl(searchParams: {
	get: (key: string) => string | null;
}): Partial<RouletteState> {
	const state: Partial<RouletteState> = {};

	const maps = searchParams.get("maps");
	if (maps) {
		state.activeMaps = maps.split(",").filter(Boolean);
	}

	const duration = searchParams.get("duration");
	if (duration) {
		const parsed = Number.parseFloat(duration);
		if (!Number.isNaN(parsed) && parsed > 0) {
			state.spinDuration = parsed;
		}
	}

	const modal = searchParams.get("modal");
	if (modal === "false") {
		state.showResultModal = false;
	}

	const filter = searchParams.get("filter");
	if (filter === "false") {
		state.filterOutRolledItems = false;
	}

	return state;
}

export function updateUrlParams(params: UrlParams, replace = true): void {
	const url = new URL(window.location.href);

	// Clear existing roulette-related params
	for (const key of ["maps", "duration", "modal", "filter"]) {
		url.searchParams.delete(key);
	}

	// Add new params
	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined) {
			url.searchParams.set(key, value);
		}
	}

	const method = replace ? "replaceState" : "pushState";
	window.history[method]({}, "", url.toString());
}

// Export for testing purposes in development
if (typeof window !== "undefined" && import.meta.env.DEV) {
	// @ts-ignore - For testing purposes only
	window.encodeStateToUrl = encodeStateToUrl;
	// @ts-ignore - For testing purposes only
	window.decodeStateFromUrl = decodeStateFromUrl;
	// @ts-ignore - For testing purposes only
	window.updateUrlParams = updateUrlParams;
}
