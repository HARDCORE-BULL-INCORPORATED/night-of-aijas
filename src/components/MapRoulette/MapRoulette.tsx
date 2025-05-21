import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import CaseRoulette from "../roulette/CaseRoulette";
import type { CaseItem } from "../roulette/types";
import { mapCase as allPossibleMapsData } from "./mapCase";
import { mapPresets } from "./mapPresets"; // Import presets from the new file

const MapRoulette: Component = () => {
	const [wonItems, setWonItems] = createSignal<CaseItem[]>([]);

	const handleItemWon = (item: CaseItem): void => {
		setWonItems([item, ...wonItems()]);
		console.log(`Map selected: ${item.name} (${item.rarity})`);
	};

	return (
		<div class="container">
			<h1>CS:GO MAP ROULETTE</h1>
			<p>SPIN THE WHEEL AND LET THE GAME DECIDE YOUR NEXT MAP!</p>

			<CaseRoulette
				items={[...allPossibleMapsData]} // Provide initial items, CSGOCaseRoulette will manage activeMaps from this if enabled
				allMaps={[...allPossibleMapsData]}
				initialActiveMaps={[...allPossibleMapsData]} // Start with all maps active
				onItemWon={handleItemWon}
				enableMapManagement={true} // Enable map selection and weight modals
				enableSpinDurationSlider={true} // Enable the internal spin duration slider
				initialSpinDuration={8} // Set initial spin duration for the slider
				presets={mapPresets} // Pass the presets here
				showWonItemsHistory={true} // New prop to show history
				wonItems={wonItems()} // Pass won items to CaseRoulette
				historyTitle="Map History"
			/>
		</div>
	);
};

export default MapRoulette;
