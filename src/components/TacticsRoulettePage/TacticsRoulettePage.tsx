import type { Component } from "solid-js";
import { createSignal, onMount, createMemo } from "solid-js";
import CaseRoulette from "../roulette/CaseRoulette";
import type { CaseItem } from "../roulette/types";
import { tacticsCase, getCachedTacticsForMap } from "./tacticsCase";
import { tacticsPresets } from "./tacticsPresets";
import TacticSelectionModal from "./modals/TacticSelectionModal/TacticSelectionModal";
import SideSelectionModal from "./modals/SideSelectionModal/SideSelectionModal";
import { mapCase } from "../MapRoulette/mapCase";
import type { Side } from "./types";
import type { MapName } from "../MapRoulette/mapCase";
const TacticsRoulettePage: Component = () => {
	const [wonItems, setWonItems] = createSignal<CaseItem[]>([]);
	const [isMapSelectionModalOpen, setIsMapSelectionModalOpen] =
		createSignal(false);
	const [isSideSelectionModalOpen, setIsSideSelectionModalOpen] =
		createSignal(false);
	const [activeMapNamesForTactics, setActiveMapNamesForTactics] = createSignal<
		string[]
	>(
		[], // Initialize with no maps selected
	);
	const [selectedSide, setSelectedSide] = createSignal<Side | null>(null); // State for selected side

	onMount(() => {
		setIsMapSelectionModalOpen(true); // Open map selection modal first
	});

	const handleItemWon = (item: CaseItem): void => {
		setWonItems([item, ...wonItems()]);
		console.log("Won item:", item);
	};

	const handleClearHistory = () => {
		setWonItems([]);
	};

	const handleSaveMapSelectionForTactics = (selectedMapNames: string[]) => {
		setActiveMapNamesForTactics(selectedMapNames);
		console.log("Selected maps for tactics updated:", selectedMapNames);
		setIsMapSelectionModalOpen(false); // Close map modal

		// Reset side selection before opening the side modal to ensure a fresh choice
		// or a default of 'all sides' if the side modal is cancelled.
		setSelectedSide(null);

		// Always open side selection modal after a choice is made in the map modal.
		setIsSideSelectionModalOpen(true);
	};

	const handleSideSelected = (side: Side) => {
		setSelectedSide(side);
		console.log("Selected side:", side);
		setIsSideSelectionModalOpen(false); // Close side modal
	};

	// Filter tactics for the roulette based on activeMapNamesForTactics
	const currentTacticsForRoulette = createMemo(() => {
		const selectedMaps = activeMapNamesForTactics();
		const currentSide = selectedSide();
		console.log(
			"[currentTacticsForRoulette] Memo re-evaluated. Selected Maps:",
			selectedMaps,
			"Current Side:",
			currentSide,
		);

		let filteredTactics = [...tacticsCase];
		console.log(
			"[currentTacticsForRoulette] Initial tactics count:",
			filteredTactics.length,
		);

		if (selectedMaps.length > 0) {
			const selectedMap = selectedMaps[0] as MapName; // Assuming one map selected
			// Use the new map validation function that properly handles "Defuse" and "Hostage" contexts
			const validTactics = getCachedTacticsForMap(selectedMap);
			filteredTactics = filteredTactics.filter((tactic) =>
				validTactics.some((validTactic) => validTactic.name === tactic.name),
			);
			console.log(
				`[currentTacticsForRoulette] Tactics count after map filter with validation ('${selectedMap}'):`,
				filteredTactics.length,
			);
		}

		// Filter by side
		if (currentSide && currentSide !== "Both") {
			console.log(
				`[currentTacticsForRoulette] Applying side filter for: ${currentSide}`,
			);
			const tacticsBeforeSideFilter = [...filteredTactics];
			filteredTactics = filteredTactics.filter(
				(tactic) => tactic.side === currentSide || tactic.side === "Both",
			);
			console.log(
				`[currentTacticsForRoulette] Tactics count after side filter ('${currentSide}'):`,
				filteredTactics.length,
			);
			if (tacticsBeforeSideFilter.length !== filteredTactics.length) {
				const removed = tacticsBeforeSideFilter.filter(
					(t) => !filteredTactics.some((ft) => ft.name === t.name), // Simple check by name for logging
				);
				console.log(
					"[currentTacticsForRoulette] Tactics removed by side filter (example):",
					removed.map((t) => ({ name: t.name, side: t.side, map: t.map })),
				);
			}
		} else if (currentSide === "Both") {
			console.log(
				"[currentTacticsForRoulette] Side is 'Both', no specific side filtering applied to map-filtered tactics.",
			);
		} else {
			console.log(
				"[currentTacticsForRoulette] No side selected (null) or 'Both', so no specific (CT/T) side filtering applied.",
			);
		}

		console.log(
			"[currentTacticsForRoulette] Final tactics for roulette (names, sides, maps):",
			filteredTactics.map((t) => ({ name: t.name, side: t.side, map: t.map })),
		);
		return filteredTactics;
	});

	return (
		<div class="container">
			<h1>TACTICS ROULETTE</h1>
			<p>SPIN THE WHEEL AND LET FATE DECIDE YOUR NEXT STRATEGY!</p>

			<CaseRoulette
				items={currentTacticsForRoulette()} // Use filtered tactics
				allMaps={[...tacticsCase]} // Pass all for modal/management, spread to make mutable
				initialActiveMaps={currentTacticsForRoulette()} // All items in the current pool are initially active
				onItemWon={handleItemWon}
				enableMapManagement={true} // Keep this true for now, assuming it might control other features
				enableSpinDurationSlider={true}
				initialSpinDuration={8}
				presets={tacticsPresets}
				showWonItemsHistory={true}
				wonItems={wonItems()}
				onClearWonItemsHistory={handleClearHistory}
				historyTitle="Tactic History"
				selectItemsButtonText="Select Tactics" // This button's action is part of CaseRoulette.
				// If it needs to open TacticSelectionModal, CaseRoulette may need modification or a new prop.
				itemWeightsButtonText="Tactic Weights"
			/>

			<TacticSelectionModal
				isOpen={isMapSelectionModalOpen()} // Use renamed state
				onClose={() => {
					setIsMapSelectionModalOpen(false);
					// If map modal is closed without saving (e.g. backdrop click, cancel), decide if side modal should open
					// For now, it won't. It only opens on successful map save.
				}}
				allMaps={[...mapCase]}
				activeMapNames={activeMapNamesForTactics()}
				onSave={handleSaveMapSelectionForTactics}
			/>

			<SideSelectionModal
				isOpen={isSideSelectionModalOpen()}
				onClose={() => setIsSideSelectionModalOpen(false)}
				onSelectSide={handleSideSelected}
			/>
		</div>
	);
};

export default TacticsRoulettePage;
