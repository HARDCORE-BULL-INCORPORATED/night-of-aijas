import type { Component } from "solid-js";
import { createSignal, onMount } from "solid-js";
import CaseRoulette from "../roulette/CaseRoulette";
import type { CaseItem } from "../roulette/types";
import { tacticsCase as allPossibleTactics } from "./tacticsCase";
import { tacticsPresets } from "./tacticsPresets";
import TacticSelectionModal from "./modals/TacticSelectionModal/TacticSelectionModal";
import SideSelectionModal from "./modals/SideSelectionModal/SideSelectionModal"; // Import SideSelectionModal
import { mapCase } from "../MapRoulette/mapCase";
import type { Side } from "./types"; // Import Side type

const TacticsRoulettePage: Component = () => {
	const [wonItems, setWonItems] = createSignal<CaseItem[]>([]);
	const [isMapSelectionModalOpen, setIsMapSelectionModalOpen] = // Renamed for clarity
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
		console.log(`Tactic selected: ${item.name} (${item.rarity})`);
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
	const currentTacticsForRoulette = () => {
		const selectedMaps = activeMapNamesForTactics();
		const currentSide = selectedSide();

		let filteredTactics = [...allPossibleTactics];

		// Filter by map if a specific map is selected
		if (selectedMaps.length > 0) {
			const selectedMap = selectedMaps[0]; // Assuming one map or "Show All" (empty array)
			filteredTactics = filteredTactics.filter(
				(tactic) => tactic.map === "Shared" || tactic.map === selectedMap,
			);
		}

		// Filter by side if a side is selected
		if (currentSide) {
			filteredTactics = filteredTactics.filter(
				(tactic) => tactic.side === "Both" || tactic.side === currentSide,
			);
		}

		return filteredTactics;
	};

	return (
		<div class="container">
			<h1>TACTICS ROULETTE</h1>
			<p>SPIN THE WHEEL AND LET FATE DECIDE YOUR NEXT STRATEGY!</p>

			<CaseRoulette
				items={currentTacticsForRoulette()} // Use filtered tactics
				allMaps={[...allPossibleTactics]} // Pass all for modal/management, spread to make mutable
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
