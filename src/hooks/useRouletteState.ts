import { createSignal, createEffect, onMount } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import type { CaseItem } from "../components/roulette/types";
import {
	rouletteStateManager,
	type RouletteState,
} from "../utils/rouletteState";
import {
	decodeStateFromUrl,
	encodeStateToUrl,
	updateUrlParams,
} from "../utils/urlParams";

export function useRouletteState(
	rouletteType: "mapRoulette" | "tacticsRoulette",
	allMaps: CaseItem[],
) {
	const [searchParams] = useSearchParams();

	// Initialize signals with default values
	const [activeMaps, setActiveMaps] = createSignal<CaseItem[]>([]);
	const [showResultModal, setShowResultModal] = createSignal(true);
	const [filterOutRolledItems, setFilterOutRolledItems] = createSignal(true);
	const [spinDuration, setSpinDuration] = createSignal(8);
	const [wonItems, setWonItems] = createSignal<CaseItem[]>([]);

	// Load initial state on mount
	onMount(() => {
		// Create a wrapper that provides the get method for SolidJS searchParams
		const searchParamsWrapper = {
			get: (key: string) => searchParams[key] as string | null,
		};

		// First, try to load from URL params
		const urlState = decodeStateFromUrl(searchParamsWrapper);

		// Then, merge with session storage (URL takes precedence)
		const sessionState = rouletteStateManager.getState(rouletteType);
		const mergedState = { ...sessionState, ...urlState };

		// Apply the merged state
		applyState(mergedState);

		// Update URL to reflect current state (in case some came from session)
		const urlParams = encodeStateToUrl(getCurrentState());
		updateUrlParams(urlParams, true);
	});

	// Watch for URL changes
	createEffect(() => {
		// Create a wrapper that provides the get method for SolidJS searchParams
		const searchParamsWrapper = {
			get: (key: string) => searchParams[key] as string | null,
		};

		const urlState = decodeStateFromUrl(searchParamsWrapper);
		if (Object.keys(urlState).length > 0) {
			applyState(urlState);
		}
	});

	const getCurrentState = (): Partial<RouletteState> => ({
		activeMaps: activeMaps().map((m) => m.name),
		showResultModal: showResultModal(),
		filterOutRolledItems: filterOutRolledItems(),
		spinDuration: spinDuration(),
		wonItems: wonItems(),
	});

	const applyState = (state: Partial<RouletteState>) => {
		if (state.activeMaps) {
			const maps = allMaps.filter((map) =>
				state.activeMaps?.includes(map.name),
			);
			setActiveMaps(maps);
		}

		if (state.showResultModal !== undefined)
			setShowResultModal(state.showResultModal);
		if (state.filterOutRolledItems !== undefined)
			setFilterOutRolledItems(state.filterOutRolledItems);
		if (state.spinDuration !== undefined) setSpinDuration(state.spinDuration);
		if (state.wonItems !== undefined) setWonItems(state.wonItems);
	};

	const persistState = () => {
		const currentState = getCurrentState();
		rouletteStateManager.setState(rouletteType, currentState);

		const urlParams = encodeStateToUrl(currentState);
		updateUrlParams(urlParams, true);
	};

	// Auto-persist on state changes
	createEffect(() => {
		persistState();
	});

	return {
		// State
		activeMaps,
		showResultModal,
		filterOutRolledItems,
		spinDuration,
		wonItems,

		// Setters
		setActiveMaps: (maps: CaseItem[]) => {
			setActiveMaps(maps);
			persistState();
		},
		setShowResultModal: (show: boolean) => {
			setShowResultModal(show);
			persistState();
		},
		setFilterOutRolledItems: (filter: boolean) => {
			setFilterOutRolledItems(filter);
			persistState();
		},
		setSpinDuration: (duration: number) => {
			setSpinDuration(duration);
			persistState();
		},
		addWonItem: (item: CaseItem) => {
			setWonItems((prev) => [item, ...prev]);
			rouletteStateManager.addWonItem(rouletteType, item);
		},
		clearWonItems: () => {
			setWonItems([]);
			rouletteStateManager.clearWonItems(rouletteType);
		},
	};
}
