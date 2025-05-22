import type { Component } from "solid-js";
import { createSignal, onMount } from "solid-js"; // Added onMount
import CaseRoulette from "../roulette/CaseRoulette";
import type { CaseItem } from "../roulette/types";
import { tacticsCase as allPossibleTactics } from "./tacticsCase";
import { tacticsPresets } from "./tacticsPresets"; // Import presets
import TacticSelectionModal from "./modals/TacticSelectionModal/TacticSelectionModal"; // Import the new modal

const TacticsRoulettePage: Component = () => {
	const [wonItems, setWonItems] = createSignal<CaseItem[]>([]);
	const [isTacticSelectionModalOpen, setIsTacticSelectionModalOpen] =
		createSignal(false); // State for the modal
	const [activeTactics, setActiveTactics] = createSignal<string[]>(
		allPossibleTactics.map((t) => t.name),
	); // Initialize with all tactic names

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

	const handleSaveTacticSelection = (selectedNames: string[]) => {
		setActiveTactics(selectedNames);
		// The CaseRoulette items will update reactively due to currentTacticsForRoulette
		console.log("Selected tactics updated:", selectedNames);
	};

	// Filter tactics for the roulette based on activeTactics
	const currentTacticsForRoulette = () =>
		allPossibleTactics.filter((tactic) =>
			activeTactics().includes(tactic.name),
		);

	return (
		<div class="container">
			<h1>TACTICS ROULETTE</h1>
			<p>SPIN THE WHEEL AND LET FATE DECIDE YOUR NEXT STRATEGY!</p>

			<CaseRoulette
				items={currentTacticsForRoulette()} // Use filtered tactics
				allMaps={[...allPossibleTactics]} // Pass all for modal/management, spread to make mutable
				initialActiveMaps={[
					...allPossibleTactics.filter((tactic) =>
						activeTactics().includes(tactic.name),
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
				allTactics={[...allPossibleTactics]}
				activeTacticNames={activeTactics()}
				onSave={handleSaveTacticSelection}
			/>
		</div>
	);
};

export default TacticsRoulettePage;
