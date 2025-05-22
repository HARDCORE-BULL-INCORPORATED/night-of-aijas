import type { Component } from "solid-js";
import { createSignal, onMount } from "solid-js";
import CaseRoulette from "../roulette/CaseRoulette";
import type { CaseItem } from "../roulette/types";
import { tacticsCase as allPossibleTactics } from "./tacticsCase";
import { tacticsPresets } from "./tacticsPresets";
import TacticSelectionModal from "./modals/TacticSelectionModal/TacticSelectionModal";
import { mapCase } from "../MapRoulette/mapCase"; // Import mapCase for the modal

const TacticsRoulettePage: Component = () => {
	const [wonItems, setWonItems] = createSignal<CaseItem[]>([]);
	const [isTacticSelectionModalOpen, setIsTacticSelectionModalOpen] =
		createSignal(false);
	// const [activeTactics, setActiveTactics] = createSignal<string[]>(
	// 	allPossibleTactics.map((t) => t.name),
	// );
	const [activeMapNamesForTactics, setActiveMapNamesForTactics] = createSignal<
		string[]
	>(
		// mapCase.map((m) => m.name), // Initialize with all map names for tactic filtering
		[], // Initialize with no maps selected, modal will force selection
	);

	// Open modal on component mount
	onMount(() => {
		setIsTacticSelectionModalOpen(true);
	});

	const handleItemWon = (item: CaseItem): void => {
		setWonItems([item, ...wonItems()]);
		console.log(`Tactic selected: ${item.name} (${item.rarity})`);
	};

	const handleClearHistory = () => {
		setWonItems([]);
	};

	// const handleSaveTacticSelection = (selectedNames: string[]) => {
	// 	setActiveTactics(selectedNames);
	// 	console.log("Selected tactics updated:", selectedNames);
	// };

	const handleSaveMapSelectionForTactics = (selectedMapNames: string[]) => {
		setActiveMapNamesForTactics(selectedMapNames);
		console.log("Selected maps for tactics updated:", selectedMapNames);
	};

	// Filter tactics for the roulette based on activeMapNamesForTactics
	const currentTacticsForRoulette = () => {
		const selectedMaps = activeMapNamesForTactics();

		// If no specific map is selected (e.g., initial state or "Show All Tactics" clicked),
		// return all possible tactics.
		if (selectedMaps.length === 0) {
			return [...allPossibleTactics]; // Spread to create a mutable copy
		}

		// If a specific map is selected (current behavior after clicking a map button in the modal)
		const selectedMap = selectedMaps[0]; // Assuming the array will contain at most one map name
		return [
			...allPossibleTactics.filter((tactic) => {
				// Include tactic if its map context is 'Shared' or matches the selected map name.
				return tactic.map === "Shared" || tactic.map === selectedMap;
			}),
		]; // Spread to create a mutable copy
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
				isOpen={isTacticSelectionModalOpen()}
				onClose={() => setIsTacticSelectionModalOpen(false)}
				// allTactics={[...allPossibleTactics]}
				allMaps={[...mapCase]} // Pass mapCase to the modal
				// activeTacticNames={activeTactics()}
				activeMapNames={activeMapNamesForTactics()} // Pass active map names
				// onSave={handleSaveTacticSelection}
				onSave={handleSaveMapSelectionForTactics} // Use the new save handler
			/>
		</div>
	);
};

export default TacticsRoulettePage;
