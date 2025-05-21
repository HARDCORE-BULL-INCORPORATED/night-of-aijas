import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import CaseRoulette from "../roulette/CaseRoulette";
import type { CaseItem } from "../roulette/types";
import { tacticsCase as allPossibleTactics } from "./tacticsCase";
import { tacticsPresets } from "./tacticsPresets"; // Import presets

const TacticsRoulettePage: Component = () => {
	const [wonItems, setWonItems] = createSignal<CaseItem[]>([]);

	const handleItemWon = (item: CaseItem): void => {
		setWonItems([item, ...wonItems()]);
		console.log(`Tactic selected: ${item.name} (${item.rarity})`);
	};

	return (
		<div class="container">
			<h1>TACTICS ROULETTE</h1>
			<p>SPIN THE WHEEL AND LET FATE DECIDE YOUR NEXT STRATEGY!</p>

			<CaseRoulette
				items={[...allPossibleTactics]} // Provide initial items
				allMaps={[...allPossibleTactics]} // For item selection modal if enabled
				initialActiveMaps={[...allPossibleTactics]} // Start with all tactics active if management enabled
				onItemWon={handleItemWon}
				// showModal can be used to force hide if needed, e.g. showModal={false}
				enableMapManagement={true} // Set to true to enable item selection/weighting
				enableSpinDurationSlider={true} // Set to true to enable spin duration slider
				initialSpinDuration={8} // Set initial spin duration for the slider
				presets={tacticsPresets} // Pass the presets here
				showWonItemsHistory={true} // New prop to show history
				wonItems={wonItems()} // Pass won items to CaseRoulette
				historyTitle="Tactic History" // Pass history title
				// showResultModalToggle and onShowResultModalToggleChange are removed
			/>
		</div>
	);
};

export default TacticsRoulettePage;
