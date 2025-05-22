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
		mapCase.map((m) => m.name), // Initialize with all map names for tactic filtering
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
		// Here you would typically filter allPossibleTactics based on the selected maps
		// For example: setCurrentTacticsForRoulette(allPossibleTactics.filter(tactic => selectedMapNames.includes(tactic.mapContext))) // or similar logic
	};

	// Filter tactics for the roulette based on activeMapNamesForTactics
	// This logic needs to be adjusted based on how tactics are associated with maps.
	// Assuming tactics have a 'map' or 'mapContext' property matching names in mapCase.
	const currentTacticsForRoulette = () =>
		allPossibleTactics.filter((tactic) => {
			// Adjust this condition based on your Tactic type structure
			// This is a placeholder: you might need to check tactic.map, tactic.mapName, etc.
			// And ensure that activeMapNamesForTactics() contains that map identifier.
			// For now, let's assume a Tactic has a `map: string` property that should match a name in activeMapNamesForTactics
			// This will likely need adjustment based on the actual structure of your Tactic objects in tacticsCase.ts
			if (tactic.map) {
				// Check if tactic has a map property
				return activeMapNamesForTactics().includes(tactic.map as string);
			}
			return false; // Or true if tactics without a map should always be included
		});

	return (
		<div class="container">
			<h1>TACTICS ROULETTE</h1>
			<p>SPIN THE WHEEL AND LET FATE DECIDE YOUR NEXT STRATEGY!</p>

			<CaseRoulette
				items={currentTacticsForRoulette()} // Use filtered tactics
				allMaps={[...allPossibleTactics]} // Pass all for modal/management, spread to make mutable
				initialActiveMaps={[
					...allPossibleTactics.filter((tactic) =>
						activeMapNamesForTactics().includes(tactic.name),
					),
				]} // Pass filtered active tactics, spread
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
