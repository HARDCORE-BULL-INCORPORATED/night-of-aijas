import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import CaseRoulette from "../roulette/CaseRoulette";
import type { CaseItem } from "../roulette/types";
import { tacticsCase as allPossibleTactics } from "./tacticsCase";

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
				items={allPossibleTactics} // Provide initial items
				allMaps={allPossibleTactics} // For item selection modal if enabled
				initialActiveMaps={allPossibleTactics} // Start with all tactics active if management enabled
				onItemWon={handleItemWon}
				// spinDuration is now managed internally by CSGOCaseRoulette via enableSpinDurationSlider
				// To enable item management and spin duration slider:
				enableMapManagement={true} // Set to true to enable item selection/weighting
				enableSpinDurationSlider={true} // Set to true to enable spin duration slider
				initialSpinDuration={8} // Set initial spin duration for the slider
				// showModal can be controlled similarly if a result modal toggle is added
			/>
		</div>
	);
};

export default TacticsRoulettePage;
