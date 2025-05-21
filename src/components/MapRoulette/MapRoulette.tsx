import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import CaseRoulette from "../roulette/CaseRoulette";
import type { CaseItem, RoulettePreset } from "../roulette/types"; // Added RoulettePreset
import { mapCase as allPossibleMapsData } from "./mapCase";

const MapRoulette: Component = () => {
	const [wonItems, setWonItems] = createSignal<CaseItem[]>([]);

	const handleItemWon = (item: CaseItem): void => {
		setWonItems([item, ...wonItems()]);
		console.log(`Map selected: ${item.name} (${item.rarity})`);
	};

	const mapPresets: RoulettePreset[] = [
		{
			name: "Hostage Maps",
			itemNames: ["Agency", "Office", "Italy"],
		},
		// Add more presets here if needed
	];

	return (
		<div class="container">
			<h1>CS:GO MAP ROULETTE</h1>
			<p>SPIN THE WHEEL AND LET THE GAME DECIDE YOUR NEXT MAP!</p>

			<CaseRoulette
				items={allPossibleMapsData} // Provide initial items, CSGOCaseRoulette will manage activeMaps from this if enabled
				allMaps={allPossibleMapsData}
				initialActiveMaps={allPossibleMapsData} // Start with all maps active
				onItemWon={handleItemWon}
				// showModal can be used to force hide if needed, e.g. showModal={false}
				enableMapManagement={true} // Enable map selection and weight modals
				enableSpinDurationSlider={true} // Enable the internal spin duration slider
				initialSpinDuration={8} // Set initial spin duration for the slider
				presets={mapPresets} // Pass the presets here
				showWonItemsHistory={true} // New prop to show history
				wonItems={wonItems()} // Pass won items to CaseRoulette
				historyTitle="Map History" // Pass history title
				// showResultModalToggle and onShowResultModalToggleChange are removed
			/>

			{/* WonItemsHistory component is now rendered inside CaseRoulette */}
			{/* <WonItemsHistory items={wonItems()} title="Map History" /> */}
		</div>
	);
};

export default MapRoulette;
