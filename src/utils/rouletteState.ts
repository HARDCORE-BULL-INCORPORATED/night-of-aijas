import type { CaseItem } from "../components/roulette/types";

export interface RouletteState {
	activeMaps: string[]; // Map names
	mapWeights: Record<string, number>;
	showResultModal: boolean;
	filterOutRolledItems: boolean;
	spinDuration: number;
	wonItems: CaseItem[];
}

export interface RouletteStates {
	mapRoulette: RouletteState;
	tacticsRoulette: RouletteState;
	viinatRoulette: RouletteState;
}

const DEFAULT_STATE: RouletteState = {
	activeMaps: [],
	mapWeights: {},
	showResultModal: true,
	filterOutRolledItems: true,
	spinDuration: 8,
	wonItems: [],
};

class RouletteStateManager {
	private static instance: RouletteStateManager;

	static getInstance(): RouletteStateManager {
		if (!RouletteStateManager.instance) {
			RouletteStateManager.instance = new RouletteStateManager();
		}
		return RouletteStateManager.instance;
	}

	private getStorageKey(rouletteType: keyof RouletteStates): string {
		return `roulette_state_${rouletteType}`;
	}

	getState(rouletteType: keyof RouletteStates): RouletteState {
		try {
			const stored = sessionStorage.getItem(this.getStorageKey(rouletteType));
			if (stored) {
				return { ...DEFAULT_STATE, ...JSON.parse(stored) };
			}
		} catch (error) {
			console.warn(
				"Failed to load roulette state from session storage:",
				error,
			);
		}
		return { ...DEFAULT_STATE };
	}

	setState(
		rouletteType: keyof RouletteStates,
		state: Partial<RouletteState>,
	): void {
		try {
			const currentState = this.getState(rouletteType);
			const newState = { ...currentState, ...state };
			sessionStorage.setItem(
				this.getStorageKey(rouletteType),
				JSON.stringify(newState),
			);
		} catch (error) {
			console.warn("Failed to save roulette state to session storage:", error);
		}
	}

	updateActiveMaps(rouletteType: keyof RouletteStates, maps: string[]): void {
		this.setState(rouletteType, { activeMaps: maps });
	}

	updateMapWeights(
		rouletteType: keyof RouletteStates,
		weights: Record<string, number>,
	): void {
		this.setState(rouletteType, { mapWeights: weights });
	}

	addWonItem(rouletteType: keyof RouletteStates, item: CaseItem): void {
		const currentState = this.getState(rouletteType);
		const newWonItems = [item, ...currentState.wonItems];
		this.setState(rouletteType, { wonItems: newWonItems });
	}

	clearWonItems(rouletteType: keyof RouletteStates): void {
		this.setState(rouletteType, { wonItems: [] });
	}
}

export const rouletteStateManager = RouletteStateManager.getInstance();

// Export for testing purposes in development
if (typeof window !== "undefined" && import.meta.env.DEV) {
	// @ts-ignore - For testing purposes only
	window.rouletteStateManager = rouletteStateManager;
}
